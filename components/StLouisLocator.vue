<template>
    <div>
        <div class="scaling-svg-container">
            <svg :viewBox="'0 0 '+width+' '+height" class="scaling-svg">
                <svg :width="width" :height="height">
                    <path class="state" :d="state" />
                    <circle class="city" :cx="projected[0]" :cy="projected[1]" r="14" />
                </svg>
            </svg>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mo from '~/assets/mo_silhouette.json';
import stlouis from '~/assets/stlouis_coords.csv';

export default {

    data() {
        let width = 800;
        let height = 600;

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
.scaling-svg-container {
 position: relative; 
 height: 0; 
 width: 100%; 
 padding: 0;
 padding-bottom: 80%; 
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

.city {
    fill: #E74C3C;
    stroke-width: 5px;
    stroke: white;   
}

</style>