<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <svg :width="width" :height="height">
            <path class="notWest" :d="city" />
            <path class="highlight" :d="highlight" />
            <path class="roadNotWest" v-for="d in projectedRoads" :d="d" />
            <path class="roadWest" v-for="d in projectedWestRoads" :d="d" />
        </svg>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import fresno from '~/assets/fresno_shapes.json';
import otherRoads from '~/assets/non_west_roads.json'
import westRoads from '~/assets/west_roads.json'

export default {

    data() {
        let width = 800;
        let height = 800;

        let fresnoShapes = topojson.feature(fresno, fresno.objects.fresno_shapes);
        let roadPaths = topojson.feature(otherRoads, otherRoads.objects.non_west_roads)
        let westRoadPaths = topojson.feature(westRoads, westRoads.objects.west_roads)

        console.log(fresnoShapes)

        let projection = d3.geoConicConformal()
            .parallels([36, 37 + 15 / 60])
            .rotate([119, 0])
            .fitSize([width,height],fresnoShapes);

        let path = d3.geoPath()
            .projection(projection);

        let projectedRoads = roadPaths.features.map(path);
        let projectedWestRoads = westRoadPaths.features.map(path);

        let city = path(fresnoShapes.features[0]);
        let highlight = path(fresnoShapes.features[1]);
        return {
            width,
            height,
            city,
            projectedWestRoads,
            projectedRoads,
            highlight
        }
    }
};

</script>

<style>

.notWest {
    fill: none;
    stroke: grey;
    stroke-width: 2px;
}

.roadWest {
    fill: none;
    stroke: pink;
    stroke-width: 1px;
}

.roadNotWest {
    fill: none;
    stroke: grey;
    stroke-width: 1px;
}

.highlight {
    stroke: red;
    fill: red;   
}

</style>