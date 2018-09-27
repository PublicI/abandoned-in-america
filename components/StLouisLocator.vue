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
import mo from '~/assets/mo_silhouette.json';
import stlouis from '~/assets/stlouis_coords.csv';

export default {

    data() {
        let width = 600;
        let height = 800;

        let moShape = topojson.feature(mo, mo.objects.mo_silhouette);

        let projection = d3.geoTransverseMercator()
            .rotate([90 + 30 / 60, -35 - 50 / 60])
            .fitSize([width,height],moShape);

        let path = d3.geoPath()
            .projection(projection);

        let state = path(moShape.features[0]);

        let coords = stlouis.split(',')
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