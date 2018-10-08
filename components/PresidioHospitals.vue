<template>
    <div class="scaling-svg-container">
        <svg :viewBox="'0 0 '+width+' '+height" class="scaling-svg">
            <svg :width="width" :height="height">
                <path class="river" :d="river" />
                <path class="route" v-for="path in routeA" :d="path" />
                <path class="route" v-for="path in routeO" :d="path" />
                <circle class="city" v-for="city in processedCoords" :cx="city.projected[0]" :cy="city.projected[1]" r="6" />
                <text class="cityLabel" v-for="city in processedCoords" :x="city.city == 'Ojinaga' ? city.projected[0]-108 : city.projected[0]+8" :y="city.city == 'Ojinaga' ? city.projected[1]+25 : city.projected[1]-8">{{city.city}}</text>
                <text class="riverLabel" x="350" y="720">Rio Grande</text>
                <text class="riverLabel" x="350" y="750">(U.S.-Mexico border)</text>
                <text class="routeLabel" x="285" y="220">87 miles</text>
                <text class="routeLabel" x="110" y="633">4 miles</text>
                <!--<line x1="175" y1="550" x2="195" y2="635" stroke="black" stroke-dasharray="9"/>-->
            </svg>
        </svg>
        <div class="credit">Graphic by Rosie Cima</div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import rioGrande from '~/assets/presidio_thematic/rio_grande.json';
import routes from '~/assets/presidio_thematic/to.json';
import cities from '~/assets/presidio_thematic/cities.json';
import extent from '~/assets/presidio_thematic/extent.json';
import coordCsv from '~/assets/presidio_thematic/cities.csv';

export default {

    data() {
        let width = 800;
        let height = 800;
        // console.log(coordCsv);

        let coords = d3.csvParse(coordCsv);
        // console.log(coords)

        let rioGrandePath = topojson.feature(rioGrande, rioGrande.objects.rio_grande);
        let toAlpine = topojson.feature(routes, routes.objects.to_alpine);
        let toOjinaga = topojson.feature(routes, routes.objects.to_ojinaga);
        let cityShapes = topojson.feature(cities, cities.objects.cities);
        let extentShape = topojson.feature(extent, extent.objects.extent);
//        console.log(toAlpine)

        let projection = d3.geoConicConformal()
            .parallels([26 + 10 / 60, 27 + 50 / 60])
            .rotate([98 + 30 / 60, 0])
            .fitSize([width-100,height+100],extentShape);

        let path = d3.geoPath()
            .projection(projection);

        let river = path(rioGrandePath.features[0]);
        let routeA = toAlpine.features.map(path);
        let routeO = toOjinaga.features.map(path);

        function processCoords(coord) {
            coord.projected = projection([+coord.long,+coord.lat]);
            return coord
        }

        let processedCoords = coords.map(processCoords);

        return {
            width,
            height,
            river,
            routeA,
            routeO,
            processedCoords
        }
    }
};

</script>

<style scoped>
.scaling-svg-container {
 position: relative; 
 height: 0; 
 width: 100%; 
 padding: 0;
 padding-bottom: 100%; 
 /* override this inline for aspect ratio other than square */
}
.scaling-svg {
 position: absolute; 
 height: 100%; 
 width: 100%; 
 left: 0; 
 top: 0;
}
.river {
    fill: none;
    stroke: rgb(195,195,195);
    opacity: .7;
    stroke-width: 5px;
}

.route {
    fill: none;
    stroke: rgb(90,90,90);
    stroke-width:2.5px;
}

.city {
    fill: #E74C3C;
    stroke: white;
    stroke-width:2.5px;  
    opacity: 1;
}

.cityLabel {
    font-size: 32px;
    font-weight: 400;
    font-family: "nimbus-sans",sans-serif;
}

.riverLabel {
    font-size: 28px;
    font-family: "nimbus-sans",sans-serif;
    fill: rgb(170,170,170);
    font-style: oblique;
}

.routeLabel {
    font-size: 26px;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}

.credit {
    font-size: 15px;
    color: rgb(170,170,170);
    text-align: right;
    padding-bottom: 8px;
    font-family: "nimbus-sans",sans-serif;
}

</style>