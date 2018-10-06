<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <svg :width="width" :height="height">
            <path class="river" :d="river" />
            <path class="route" v-for="path in routeA" :d="path" />
            <path class="route" v-for="path in routeO" :d="path" />
            <circle class="city" v-for="city in processedCoords" :cx="city.projected[0]" :cy="city.projected[1]" r="5" />
            <text class="cityLabel" v-for="city in processedCoords" :x="city.city == 'Ojinaga' ? city.projected[0]-65 : city.projected[0]+8" :y="city.city == 'Ojinaga' ? city.projected[1]+18 : city.projected[1]-8">{{city.city}}</text>
            <text class="riverLabel" x="350" y="730">Rio Grande</text>
            <text class="riverLabel" x="350" y="750">(U.S.-Mexico border)</text>
            <text class="routeLabel" x="328" y="220">87 miles</text>
            <text class="routeLabel" x="143" y="635">4 miles</text>
            <!--<line x1="175" y1="550" x2="195" y2="635" stroke="black" stroke-dasharray="9"/>-->
        </svg>
    </svg>
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
        console.log(coordCsv);

        let coords = d3.csvParse(coordCsv);
        console.log(coords)

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

.river {
    fill: none;
    stroke: rgb(195,195,195);
    opacity: .7;
    stroke-width: 5px;
}

.route {
    fill: none;
    stroke: rgb(90,90,90);
    stroke-width:2px;
}

.city {
    fill: white;
    stroke: red;
    stroke-width:2.5px;  
    opacity: 1;
}

.cityLabel {
    font-size: 17px;
    font-weight: 400;
    font-family: "nimbus-sans",sans-serif;
}

.riverLabel {
    font-size: 16px;
    font-family: "nimbus-sans",sans-serif;
    fill: rgb(170,170,170);
    font-style: oblique;
}

.routeLabel {
    font-size: 14px;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}

</style>