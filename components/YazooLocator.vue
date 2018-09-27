<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <svg :width="width" :height="height">
            <path class="state" :d="state" />
            <circle class="city" :cx="projected[0]" :cy="projected[1]" r="10" />
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
        let width = 600;
        let height = 800;

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

        return {
            width,
            height,
            state,
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

.city {
    fill: red;   
}

</style>