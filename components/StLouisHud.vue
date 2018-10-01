<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <path :class="obj.percentSubsidized > 0 ? 'dataTract' : 'tract'" v-for="obj in processed" :d="obj.feature" :fill="obj.percentSubsidized > 0 ? colorScale(obj.percentSubsidized) : 'white'" />
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import stlouis from '~/assets/stlouis_tract_data.json';
import * as d3Chromatic from 'd3-scale-chromatic';

export default {

    data() {
        let width = 800;
        let height = 600;

        let stlouisShapes = topojson.feature(stlouis, stlouis.objects.stlouis_tract_data);
        
        let projection = d3.geoTransverseMercator()
            .rotate([90 + 30 / 60, -35 - 50 / 60])
            .fitSize([width,height],stlouisShapes);

        let path = d3.geoPath()
            .projection(projection);

        let colorScale = d3.scaleLinear()
            .domain([0, 0.5])
            .range(["pink", "red"])

        let processed = stlouisShapes.features.map(feature => {
            return {
                feature: path(feature),
                percentSubsidized: feature.properties.stlouis__6
            };
        });

        return {
            width,
            height,
            processed,
            colorScale
        }
    }
};

</script>

<style>

.tract {
    fill: white;
    stroke: lightgrey;
    stroke-width: 1px;
}

.dataTract{
    stroke: white;
    stroke-width: .5px;
}

</style>