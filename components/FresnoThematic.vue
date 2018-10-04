<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <path class="dataTract" v-for="obj in processed" :d="obj.feature" :fill="colorScale(obj.percentSubsidized)" />
        <path class="highway" v-for="d in highways" :d="d" />
        <path class="sw" :d="sw" />


    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import fresno from '~/assets/fresno_thematic/clipped_tract_data.json';
import roads from '~/assets/fresno_thematic/highways.json';
import borders from '~/assets/fresno_thematic/output.json';
import * as d3Chromatic from 'd3-scale-chromatic';


export default {

    data() {
        let width = 800;
        let height = 800;
        console.log(fresno)
        let fresnoShapes = topojson.feature(fresno, fresno.objects.clipped_tract_data);
        let roadPaths = topojson.feature(roads, roads.objects.highways);
        let swOutline = topojson.feature(borders, borders.objects.sw)

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

        let colorScale = d3.scaleLinear()
            .domain([0, 120000])
            .range(["white", "red"]);


        let processed = processShapes(fresnoShapes.features,path);
        let highways = roadPaths.features.map(path);
        let sw = path(swOutline.features[0]);


        return {
            width,
            height,
            processed,
            colorScale,
            highways,
            sw
        }
    }
};

</script>

<style>

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

</style>