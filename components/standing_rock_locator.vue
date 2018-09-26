<template>
    <svg :viewBox="viewDim">
        <svg :width="width" :height="height">
            <path class="res" :d="res" />
            <path class="highlight" :d="highlight" />
            <path class="state" :d="state" />
        </svg>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import master from '~/assets/nd_master_silhouette.json'
import nd from '~/assets/nd_silhouette.json';
import sr from '~/assets/sr_silhouette.json';
import overlap from '~/assets/nd_sd_overlap.json';

export default {

    data() {
        let width = 800;
        let height = 600;

        let ndShape = topojson.feature(nd, nd.objects.nd);
        let srShape = topojson.feature(sr, sr.objects.sr_silhouette);
        let srHighlight = topojson.feature(overlap, overlap.objects.nd_sd_overlap);
        let outline = topojson.feature(master, master.objects.master_silhouette);

        console.log(ndShape)

        let projection = d3.geoConicConformal()
            .parallels([47 + 26 / 60, 48 + 44 / 60])
            .rotate([100 + 30 / 60, 0])
            .fitSize([width,height],outline); // INCLUDE STANIDNG ROCK OUTLINE SOMEHOW

        let path = d3.geoPath()
            .projection(projection);


//TODO: Make "Outline" higher res, and then make state = path(outline.features[2])
// and res = path(outline.features[1]) 
        let state = path(ndShape.features[0]);
        let res = path(srShape.features[0]);
        let highlight = path(srHighlight.features[0]);

        let viewDim = "0 0 "+width.toString()+" "+height.toString();
        console.log(viewDim)
        return {
            width,
            height,
            state,
            res,
            highlight,
            viewDim
        }
    }
};

</script>

<style>

.state {
    fill: none;
    stroke: grey;
    stroke-width: 2px;
}

.res {
    fill: white;
    stroke: red;
    stroke-width: 2px;
}

.highlight {
    fill: red;   
}

</style>