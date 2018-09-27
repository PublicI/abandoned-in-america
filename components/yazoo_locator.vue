<template>
    <svg :viewBox="viewDim">
        <svg :width="width" :height="height">
            <path class="state" :d="state" />
            <circle class="county" :cx="projected[0]" :cy="projected[1]" r="4" />
        </svg>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import ms from '~/assets/ms_silhouette.json';
import yazoo from '~/assets/yazoo_coords.csv';

export default {

    data() {
        let width = 800;
        let height = 600;

        let msShape = topojson.feature(ms, ms.objects.ms_silhouette);

        let projection = d3.geoTransverseMercator()
            .rotate([88 + 50 / 60, -29 - 30 / 60])
            .fitSize([width,height],msShape);

        let path = d3.geoPath()
            .projection(projection);

        let state = path(msShape.features[0]);

        let coords = yazoo.split(',')
                        .map(coord => +coord)
                        .reverse();

        let projected = projection(coords);

        let viewDim = "0 0 "+width.toString()+" "+height.toString()
        return {
            width,
            height,
            state,
            viewDim,
            projected
        }
    }
};

</script>

<style scoped>

.state {
    fill: white;
    stroke: grey;
    stroke-width: 2px;
}

.county {
    fill: red;   
}

</style>