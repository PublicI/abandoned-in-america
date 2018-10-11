<template>
    <div>
        <div class="scaling-svg-container">
            <svg :viewBox="'0 0 '+width+' '+height" class="scaling-svg">
                <svg :width="width" :height="height">
                    <path class="state" :d="state" />
                    <path class="highlight" :d="highlight" />
                    <path class="res" :d="res" />
                </svg>
            </svg>
        </div>
    </div>
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
        let height = 500;

        let ndShape = topojson.feature(nd, nd.objects.nd);
        let srShape = topojson.feature(sr, sr.objects.sr_silhouette);
        let srHighlight = topojson.feature(overlap, overlap.objects.nd_sd_overlap);
        let outline = topojson.feature(master, master.objects.master_silhouette);

        let projection = d3.geoConicConformal()
            .parallels([47 + 26 / 60, 48 + 44 / 60])
            .rotate([100 + 30 / 60, 0])
            .fitSize([width,height],outline);

        let path = d3.geoPath()
            .projection(projection);


//TODO: Make "Outline" higher res, and then make state = path(outline.features[2])
// and res = path(outline.features[1]) 
        let state = path(ndShape.features[0]);
        let res = path(srShape.features[0]);
        let highlight = path(srHighlight.features[0]);
        return {
            width,
            height,
            state,
            res,
            highlight
        }
    }
};

</script>

<style>
.scaling-svg-container {
 position: relative; 
 height: 0; 
 width: 100%; 
 padding: 0;
 padding-bottom: 100%; 
 /* override this inline for aspect ratio other than square */
}
.scaling-svg {
 position: absolute; 
 height: 100%; 
 width: 100%; 
 left: 0; 
 top: 0;
}
.state {
    fill: rgb(220,220,220);
    stroke: grey;
    stroke-width: 0px;
}

.res {
    fill: #E74C3C;
    stroke: red;
    stroke-width: 0px;
}

.highlight {
    fill: #E74C3C;
}

</style>