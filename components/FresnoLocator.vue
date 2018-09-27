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
import ca from '~/assets/ca_silhouette.json';
import fresno from '~/assets/fresno_coords.csv';

export default {

    data() {
        let width = 600;
        let height = 800;

        let caShape = topojson.feature(ca, ca.objects.ca_silhouette);

        let projection = d3.geoConicConformal()
            .parallels([36, 37 + 15 / 60])
            .rotate([119, 0])
            .fitSize([width,height],caShape);

        let path = d3.geoPath()
            .projection(projection);

        let state = path(caShape.features[0]);

        let coords = fresno.split(',')
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