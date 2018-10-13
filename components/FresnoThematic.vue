<template>
    <div class="bigger fresnoThematic">
        <div class="scaling-svg-container">
            <svg class="scaling-svg">
                <g class="legendLinear"></g>
                <svg style="width: 100%;height: 100%" :viewBox="'0 0 '+width+' '+height">
                    <g class="map">
                        <path class="dataTract" v-for="obj in processed" :d="obj.feature" :stroke="colorScale(obj.percentSubsidized)" :fill="colorScale(obj.percentSubsidized)" />
                        <path class="cityOutline" :d="city" />
                        <path class="highwayShroud" v-for="d in highways" :d="d" />
                        <path class="highway" v-for="d in highways" :d="d" />
                        <path class="swOutline" :d="sw" />
                        <path class="sw" :d="sw" />
                        <g class="desktopLabels">
                            <text class="siteLabel" x="280" y="570">Proposed site of</text>
                            <text class="siteLabel" x="280" y="580">Running Horse</text>
                            <text class="siteLabel" x="280" y="590">Golf Course</text>
                            <text class="siteLabel" x="409" y="564">Planned high speed</text>
                            <text class="siteLabel" x="409" y="574">rail station</text>
                        </g>
                        <text class="fresnoLabel" x="400" y="500">Fresno</text>
                        <text class="swLabel" x="320" y="630">Southwest</text>
                        <g class="desktopLabels">
                            <circle class="siteShroud" v-for="site in processedCoords" :cx="site.projected[0]" :cy="site.projected[1]" r="6.4" />
                            <circle class="site" v-for="site in processedCoords" :cx="site.projected[0]" :cy="site.projected[1]" r="4.4" />
                        </g>
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
import fresno from '~/assets/fresno_thematic/clipped_tract_data.json';
import roads from '~/assets/fresno_thematic/highways.json';
import borders from '~/assets/fresno_thematic/output.json';
import cityLimits from '~/assets/fresno_thematic/fresno_city_limits.json';
import * as d3Chromatic from 'd3-scale-chromatic';
import { legendColor } from 'd3-svg-legend';
import coordCsv from '~/assets/fresno_thematic/development.csv';

export default {

    data() {
        let width = 800;
        let height = 800;
        let fresnoShapes = topojson.feature(fresno, fresno.objects.clipped_tract_data);
        let roadPaths = topojson.feature(roads, roads.objects.highways);
        let swOutline = topojson.feature(borders, borders.objects.sw);
        let cityOutline = topojson.feature(cityLimits, cityLimits.objects.fresno_city_limits);

        let coords = d3.csvParse(coordCsv);


        let projection = d3.geoConicConformal()
            .parallels([36, 37 + 15 / 60])
            .rotate([119, 0])
            .fitSize([width,height],fresnoShapes);

        let path = d3.geoPath()
            .projection(projection);


        function processShapes(features,projF) {
            let container = []
            for (let i = 0; i < features.length; i++) {
                let newObject = {}
                newObject.feature = projF(features[i])
                newObject.percentSubsidized = features[i].properties.fresno_d_7
                container.push(newObject)
            }
            return container
        }

        let colorScale = this.scale()

        let processed = processShapes(fresnoShapes.features,path);
        let highways = roadPaths.features.map(path);
        let sw = path(swOutline.features[0]);
        let city = path(cityOutline);

        function processCoords(coord) {
            coord.projected = projection([+coord.long,+coord.lat]);
            return coord
        }

        let processedCoords = coords.map(processCoords);

        return {
            width,
            height,
            processed,
            colorScale,
            highways,
            sw,
            city,
            processedCoords
        }
    },
    mounted() {
        this.$nextTick(() => {
            let legendLinear = legendColor()
                .title("Median income by census tract")
                .shapeWidth(35)
                .cells([15000,20000,35000,60000,90000,120000])
                .orient('horizontal')
                .labelFormat('$.2s')
                .scale(this.scale());

            d3.select('.legendLinear').call(legendLinear);
        });
    },
    methods: {
        scale() {
            return d3
                .scaleSequential(d3.interpolateReds)
                .domain([10000, 120000]);
                /*
            return d3.scaleLinear()
            .domain([10000, 120000])
            .range(["white", "red"]);*/
        }
    }
};

</script>

<style>
.fresnoThematic .scaling-svg-container {
 position: relative; 
 height: 0; 
 width: 100%; 
 padding: 0;
 padding-bottom: 110%; 
 /* override this inline for aspect ratio other than square */
}
.fresnoThematic .scaling-svg {
 position: absolute; 
 height: 100%; 
 width: 100%; 
 left: 0; 
 top: 0;
}
.fresnoThematic.bigger {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.fresnoThematic .siteLabel{
    fill: rgb(100,100,100);
    font-size: 11px;
    font-style: oblique;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}

.fresnoThematic .swLabel{
    fill: black;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}

.fresnoThematic .fresnoLabel{
    fill: black;
    /* text-transform: uppercase; */
    font-size: 20px;
    font-weight: bold;
    font-family: "nimbus-sans",sans-serif;
    text-shadow:
       -1px -1px 0 white,  
        1px -1px 0 white,
        -1px 1px 0 white,
         1px 1px 0 white;
}

.fresnoThematic .site {
    fill: white;
    stroke: black;
    opacity: 1;
    stroke-width: 2px;
}

.fresnoThematic .city {
    fill: none;
    stroke: darkred;
    opacity: .7;
    stroke-width: 1.5px;
}

.fresnoThematic .sw {
    fill: none;
    stroke: rgb(50,50,50);
    stroke-width: 3px;
}

.fresnoThematic .swOutline {
    fill: none;
    stroke: white;
    stroke-width: 5px;
}

.fresnoThematic .dataTract{
    /* stroke: white; */
    stroke-width: 0.5px;
}

.fresnoThematic .siteShroud {
    fill: white;
    stroke-width: 0;
}

.fresnoThematic .highway {
    fill: none;
    stroke: white;
    stroke-width: 1.5px;
}

.fresnoThematic .highwayShroud {
    fill: none;
    stroke: rgb(200,200,200);
    stroke-width: 2px;
}

.fresnoThematic .legendLinear .label {
    font-family: tablet-gothic-n2,tablet-gothic,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100,100,100);
    font-family: "nimbus-sans",sans-serif;
}

.fresnoThematic .legendLinear {
    transform: translate(35px,60px);
}

.fresnoThematic .legendTitle {
    font-family: "nimbus-sans",sans-serif;
    font-weight: 400;
    transform: translate(0px,10px);
}

.fresnoThematic .cityOutline {
    fill: none;
    stroke: rgb(150,150,150);
    stroke-width: 1px;
}

.fresnoThematic .credit {
    font-size: 15px;
    color: rgb(170,170,170);
    text-align: right;
    padding-bottom: 8px;
    font-family: "nimbus-sans",sans-serif;
}

@media (max-width: 580px) {
    .fresnoThematic.left {
        width: 297px;
        float: none;
        margin-right: auto !important;
        margin-left: auto !important;
    }
    .fresnoThematic .legendLinear {
        transform: translate(5px,5px);
    }
    .fresnoThematic .map {
        transform: translate(20px,80px);
    }
    .fresnoThematic .scaling-svg-container {
     padding-bottom: 130%; 
     /* override this inline for aspect ratio other than square */
    }
    .fresnoThematic .fresnoLabel {
        font-size: 38px;
    }
    .fresnoThematic .swLabel{
        font-size: 25px;
        transform: translate(-65px,120px);
    }
    .desktopLabels {
        display: none;
    }
}
</style>