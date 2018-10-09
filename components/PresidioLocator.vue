<template>
    <div>
        <div class="scaling-svg-container">
            <svg :viewBox="'0 0 '+width+' '+height" class="scaling-svg">
                <svg :width="width" :height="height">
                    <path class="state" :d="state" />
                    <circle class="city" :cx="projected[0]" :cy="projected[1]" r="18" />
                </svg>
            </svg>
        </div>
    </div>
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
    stroke-width: 0;
}

.city {
    fill: #E74C3C;
    stroke-width: 5px;
    stroke: white;   
}

</style>