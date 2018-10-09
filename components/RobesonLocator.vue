<template>
    <div>
        <div class="scaling-svg-container">
            <svg :viewBox="'0 0 '+width+' '+height" class="scaling-svg">
                <svg :width="width" :height="height">
                    <path class="state" :d="state" />
                    <path class="county" :d="county" />
                </svg>
            </svg>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import nc from '~/assets/north_carolina.json';
import robeson from '~/assets/robeson_county.json';

export default {

    data() {
        let width = 800;
        let height = 380;

        let ncShape = topojson.feature(nc, nc.objects.north_carolina);
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
        
        return {
            width,
            height,
            state,
            county,
        }
    }
};

</script>

<style scoped>
.scaling-svg-container {
 position: relative; 
 height: 0; 
 width: 100%; 
 padding: 0;
 padding-bottom: 48%; 
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
    stroke-width: 0;
}

.county {
    fill: #E74C3C;   
}

</style>