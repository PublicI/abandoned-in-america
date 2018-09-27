<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <svg :width="width" :height="height">
            <path class="state" :d="state" />
            <path class="county" :d="county" />
        </svg>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import nc from '~/assets/nc_silhouette.json';
import robeson from '~/assets/robeson_county.json';

export default {

    data() {
        let width = 800;
        let height = 600;

        let ncShape = topojson.feature(nc, nc.objects.nc_silhouette);
        let rbShape = topojson.feature(robeson, robeson.objects.robeson_county);

        let projection = d3.geoConicConformal()
            .parallels([34 + 20 / 60, 36 + 10 / 60])
            .rotate([79, 0])
            .fitSize([width,height],ncShape);

        let path = d3.geoPath()
            .projection(projection);

        let state = path(ncShape.features[0]);
        let county = path(rbShape.features[0]);
        let viewDim = "0 0 "+width.toString()+" "+height.toString()
        console.log(viewDim)
        return {
            width,
            height,
            state,
            county,
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