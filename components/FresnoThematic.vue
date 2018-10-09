<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <g class="legendLinear" transform="translate(20,50)"></g>
        <path class="dataTract" v-for="obj in processed" :d="obj.feature" :fill="colorScale(obj.percentSubsidized)" />
        <path class="highway" v-for="d in highways" :d="d" />
        <path class="sw" :d="sw" />
        <circle class="site" v-for="site in processedCoords" :cx="site.projected[0]" :cy="site.projected[1]" r="4.4" />
        <text class="siteLabel" x="280" y="570">Proposed site of</text>
        <text class="siteLabel" x="280" y="580">Running Horse</text>
        <text class="siteLabel" x="280" y="590">Golf Course</text>
        <text class="siteLabel" x="409" y="564">Planned High Speed</text>
        <text class="siteLabel" x="409" y="574">Rail Station</text>
        <text class="swLabel" x="230" y="730">Southwest Fresno</text>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import fresno from '~/assets/fresno_thematic/clipped_tract_data.json';
import roads from '~/assets/fresno_thematic/highways.json';
import borders from '~/assets/fresno_thematic/output.json';
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
            processedCoords
        }
    },
    mounted() {
        this.$nextTick(() => {
            let legendLinear = legendColor()
                .title("Median income by census tract")
                .shapeWidth(60)
                .cells([15000,20000,35000,60000,90000,120000])
                .orient('horizontal')
                .labelFormat('$0')
                .scale(this.scale());

            d3.select('.legendLinear').call(legendLinear);
        });
    },
    methods: {
        scale() {
            return d3.scaleLinear()
            .domain([10000, 120000])
            .range(["white", "red"]);
        }
    }
};

</script>

<style>

.siteLabel{
    fill: rgb(100,100,100);
    font-size: 11px;
    font-style: oblique;
}

.swLabel{
    fill: rgb(100,100,100);
    text-transform: uppercase;
    font-size: 13px;
    font-style: bold;
}

.site {
    fill: none;
    stroke: red;
    opacity: 1;
    stroke-width: 3px;
}

.city {
    fill: none;
    stroke: darkred;
    opacity: .7;
    stroke-width: 1.5px;
}

.sw {
    fill: none;
    stroke: red;
    stroke-width: 3px;
}

.dataTract{
    stroke: grey;
    stroke-width: .5px;
}

.highway{
    fill: none;
    stroke: white;
    stroke-width: 2px;
}

.legendLinear .label {
    font-family: tablet-gothic-n2,tablet-gothic,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100,100,100);
}

</style>