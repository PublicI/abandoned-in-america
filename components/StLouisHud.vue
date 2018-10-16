<template>
    <div class="bigger stLouisHud">
        <div class="scaling-svg-container">
            <svg class="scaling-svg">
                <g class="legendLinear"></g>
                <svg style="width: 100%;height: 100%" :viewBox="'0 0 '+width+' '+height">
                    <g class="map">
                        <path :class="obj.percentSubsidized > 0 ? 'dataTract' : 'tract'" v-for="obj in processed" :d="obj.feature" :stroke="(obj.percentSubsidized > 0 || obj.percentSubsidized) ? colorScale(obj.percentSubsidized) : 'grey'" :fill="(obj.percentSubsidized > 0 || obj.percentSubsidized) ? colorScale(obj.percentSubsidized) : 'grey'" />
                        <path class="river" v-for="r in projRivers" :d="r" />
                        <path class="miss" v-for="d in projMiss" :d="d" />
                        <path class="cityOutline" :d="projCity" />
                        <path class="city" :d="projCity" />

                        <!--
                        <circle class="siteShroud" v-for="site in processedCoords" :cx="site.projected[0]" :cy="site.projected[1]" r="6" />
                        -->
                        <circle class="site" v-for="site in processedCoords" :cx="site.projected[0]" :cy="site.projected[1]" r="5" />

                        <text class="siteLabel" v-for="site in processedCoords" :x="site.projected[0]+10" :y="site.projected[1]+5">{{site.order}}</text>

                        <!--
                        <path :d="residencePath" stroke="black" fill="none" />
                        -->

                        <g transform="translate(-19,15)">
                            <circle class="site" cx="56" cy="150" r="4.4" />
                            <text class="noData" x="75" y="155">January Harris' residences</text>
                            <rect class="tract" x="40" y="120" height="15" width="30" />
                            <text class="noData" x="75" y="132">Insufficient data</text>
                        </g>
                        <text class="riverLabel" x="100" y="220">Missouri River</text>
                        <text class="riverLabel" x="470" y="520">Mississippi River</text>
                        <text class="riverLabel" x="470" y="533">(border with Illinois)</text>
                        <text class="cityLabel" x="470" y="330">City of St. Louis</text>
                    </g>
                </svg>
            </svg>
        </div>
        <div class="credit">Graphic by Rosie Cima</div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import rivers from '~/assets/stlouis_thematic/rivers_area.json';
import ms from '~/assets/stlouis_thematic/mississippi.json';
import city from '~/assets/stlouis_thematic/city_limits.json';
import stlouis from '~/assets/stlouis_thematic/stlouis_tract_data.json';
import * as d3Chromatic from 'd3-scale-chromatic';
import { legendColor } from 'd3-svg-legend';
import housingCoords from '~/assets/stlouis_thematic/housing_history.csv';


// Data is for all HUD programs and comes from this portal https://www.huduser.gov/portal/datasets/assthsg.html

// All of the following missing data codes are supressed in the graphic:

//    NA – Not Applicable
//    -1 – Missing
//    -4 – less than 11 reported households
//    -5 – less than 50% reporting
//


export default {

    data() {
        let width = 670;
        let height = 700;

        let stlouisShapes = topojson.feature(stlouis, stlouis.objects.stlouis_tract_data);
        let cityLimits = topojson.feature(city, city.objects.city_limits);
        let riversArea = topojson.feature(rivers,rivers.objects.rivers_area);
        let missPath = topojson.feature(ms,ms.objects.mississippi);

        let coords = d3.csvParse(housingCoords);


        let projection = d3.geoTransverseMercator()
            .rotate([90 + 30 / 60, -35 - 50 / 60])
            .translate([0,100])
            .fitSize([width,height],riversArea);

        let path = d3.geoPath()
            .projection(projection);

        let colorScale = this.scale();

        let projRivers = riversArea.features.map(path);
        // console.log(projRivers)

        let projMiss = missPath.features.map(path);

        let projCity = path(cityLimits.features[0]);

        let processed = stlouisShapes.features.map(feature => {
            return {
                feature: path(feature),
                numSubsidized: feature.properties.stlouis__4,
                percentSubsidized: feature.properties.stlouis__6
            };
        });

        function processCoords(coord) {
            coord.projected = projection([+coord.long,+coord.lat]);
            return coord
        }

        let processedCoords = coords.map(processCoords);

        let residencePath = d3.path();

        let initial = true;

        processedCoords.forEach((coord) => {
            if (initial) {
                residencePath.moveTo(coord.projected[0],coord.projected[1]);
            }
            else {
                residencePath.lineTo(coord.projected[0],coord.projected[1]);
            }

            initial = false;
        });

        residencePath.closePath();

        return {
            width,
            height,
            processed,
            colorScale,
            projCity,
            projRivers,
            projMiss,
            processedCoords,
            residencePath: residencePath.toString()
        }
    },
    mounted() {
        this.$nextTick(() => {
            let legendLinear = legendColor()
                .title("Percent of population in subsidized housing")
                .shapeWidth(30)
                .cells([0.05,0.10,0.20,0.30,0.50])
                .orient('horizontal')
                .labelFormat('.00%')
                .scale(this.scale());

            d3.select('.legendLinear').call(legendLinear);
        });
    },
    methods: {
        scale() {
            return d3
                .scaleSequential(d3.interpolateReds)
                .domain([0, 0.5]);
                /*
            return d3.scaleLinear()
            .domain([0, 0.5])
            .range(["#ffe5e5", "red"]);*/
        }
    }
};

</script>

<style>
.stLouisHud .noData{
    font-family: tablet-gothic-n2,tablet-gothic,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-family: "nimbus-sans",sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100,100,100);
}

.stLouisHud .city {
    fill: none;
    stroke: rgb(50,50,50);
    stroke-width: 3px;
}

.stLouisHud .cityOutline {
    fill: none;
    stroke: white;
    stroke-width: 5px;
}

.stLouisHud .miss {
    fill: none;
    stroke: lightgrey;
    stroke-width: 2px;
}


.stLouisHud .river {
    fill: lightgrey;
}

.stLouisHud .tract {
    fill: white;
    stroke: rgb(220,220,220);
    stroke-width: 0.5;
}

.stLouisHud .dataTract{
    /* stroke: white; */
    stroke-width: .5px;
}
.stLouisHud .riverLabel {
    font-size: 12px;
    font-family: "nimbus-sans",sans-serif;
    fill: rgb(170,170,170);
    font-style: oblique;
}

.stLouisHud .legendLinear .label {
    font-family: tablet-gothic-n2,tablet-gothic,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100,100,100);
    font-family: "nimbus-sans",sans-serif;
}

.stLouisHud .legendLinear {
    transform: translate(35px,60px);
}

.stLouisHud .legendTitle {
    font-family: "nimbus-sans",sans-serif;
    font-weight: 400;
    transform: translate(0px,10px);
}

.stLouisHud .cityLabel{
    fill: black;
    /* text-transform: uppercase; */
    font-size: 16px;
    font-weight: bold;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}


.stLouisHud .siteLabel {
    fill: black;
    /* text-transform: uppercase; */
    font-size: 15px;
    font-weight: bold;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}

.stLouisHud .site {
    fill: white;
    stroke: black;
    opacity: 1;
    stroke-width: 2px;
}

.stLouisHud .siteShroud {
    fill: white;
    stroke-width: 0;
}

.stLouisHud .credit {
    font-size: 15px;
    color: rgb(170,170,170);
    text-align: right;
    padding-bottom: 8px;
    font-family: "nimbus-sans",sans-serif;
    padding-right: 4px;
}
</style>