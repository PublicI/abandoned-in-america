<template>
    <div>
        <div class="scaling-svg-container">
            <svg :viewBox="'0 0 '+width+' '+height" class="scaling-svg">
                <svg :width="width" :height="height">
                    <path class="state" :d="state" />
                    <circle class="city" :cx="projected[0]" :cy="projected[1]" r="10" />
                </svg>
            </svg>
        </div>
    </div>
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

        let caShape = topojson.feature(ca, ca.objects.ne_10m_admin_1_states_provinces);

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
.scaling-svg-container {
 position: relative; 
 height: 0; 
 width: 100%; 
 padding: 0;
 padding-bottom: 130%; 
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