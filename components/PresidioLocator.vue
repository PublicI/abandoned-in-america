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
import tx from '~/assets/tx_silhouette.json';
import presidio from '~/assets/presidio_coords.csv';

export default {

    data() {
        let width = 800;
        let height = 800;

        let txShape = topojson.feature(tx, tx.objects.texas);

        let projection = d3.geoConicConformal()
            .parallels([26 + 10 / 60, 27 + 50 / 60])
            .rotate([98 + 30 / 60, 0])
            .fitSize([width,height],txShape);

        let path = d3.geoPath()
            .projection(projection);

        let state = path(txShape.features[0]);

        let coords = presidio.split(',')
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
    fill: rgb(220,220,220);
    stroke: grey;
    stroke-width: 0;
}

.city {
    fill: none;
    stroke-width: 5px;
    stroke: #E74C3C;   
}

</style>