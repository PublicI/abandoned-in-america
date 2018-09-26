<template>
    <svg :width="width" :height="height">
        <path class="tract" v-for="d in projected" :d="d" />
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import ca from '~/assets/ca_w_data.json';

export default {

    data() {
        let width = 800;
        let height = 600;

        let caShapes = topojson.feature(ca, ca.objects.tl_2017_06_tract);
        
        let projection = d3.geoConicConformal()
            .parallels([40, 41 + 40 / 60])
            .rotate([122, 0])
            .fitSize([width,height],caShapes);

        let path = d3.geoPath()
            .projection(projection);

        let projected = caShapes.features.map(path);

        return {
            width,
            height,
            projected
        }
    }
};

</script>

<style>

.tract {
    fill: white;
    stroke: grey;
    stroke-width: 1px;
}

</style>