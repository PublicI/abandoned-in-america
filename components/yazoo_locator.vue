<template>
    <svg :viewBox="viewDim">
        <svg :width="width" :height="height">
            <path class="state" :d="state" />
            <path class="county" :d="projected" />
        </svg>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import ms from '~/assets/ms_silhouette.json';
import yazoo from '~/assets/yazoo_coords.csv';
import yazooJson from '~/assets/yazoo_city.json';

export default {

    data() {
        let width = 800;
        let height = 600;

        let msShape = topojson.feature(ms, ms.objects.ms_silhouette);
        let yazooPoint = topojson.feature(yazooJson, yazooJson.objects.yazoo_city)

        console.log(yazooPoint)

        let projection = d3.geoTransverseMercator()
            .rotate([88 + 50 / 60, -29 - 30 / 60])
            .fitSize([width,height],msShape);

// This isn't working for some reason
        let path = d3.geoPath()
            .projection(projection);

        let state = path(msShape.features[0]);

        let coords = yazoo.split(',');
        coords[0] = Number(coords[0]);
        coords[1] = Number(coords[1]);

        let projected = projection(coords);

        projected = path(yazooPoint);
        console.log(coords)

        let viewDim = "0 0 "+width.toString()+" "+height.toString()
        return {
            width,
            height,
            state,
            viewDim,
            projected
//            lat,
//            long
        }
    }
};

</script>

<style>

.state {
    fill: white;
    stroke: grey;
    stroke-width: 2px;
}

.county {
    fill: red;   
}

</style>