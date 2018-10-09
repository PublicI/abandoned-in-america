<template>
    <svg :viewBox="'0 0 '+width+' '+height">
        <g class="legendLinear" transform="translate(40,50)"></g>
        <path :class="obj.percentSubsidized > 0 ? 'dataTract' : 'tract'" v-for="obj in processed" :d="obj.feature" :fill="obj.percentSubsidized > 0 ? colorScale(obj.percentSubsidized) : 'grey'" />
        <path :class="'city'" :d="projCity" />
        <path :class="'river'" v-for="r in projRivers" :d="r" />
        <path :class="'miss'" v-for="d in projMiss" :d="d" />
        <text class="riverLabel" x="100" y="220">Missouri River</text>
        <text class="riverLabel" x="470" y="520">Mississippi River</text>
        <text class="riverLabel" x="470" y="533">(border with IL)</text>
        <text class="cityLabel" x="495" y="430">City of St. Louis</text>
        <text class="noData" x="205" y="325">Insufficient data</text>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import rivers from '~/assets/stlouis_thematic/rivers_area.json';
import ms from '~/assets/stlouis_thematic/mississippi.json';
import city from '~/assets/stlouis_thematic/city_limits.json';
import stlouis from '~/assets/stlouis_thematic/stlouis_tract_data.json';
import * as d3Chromatic from 'd3-scale-chromatic';
import { legendColor } from 'd3-svg-legend';


export default {

    data() {
        let width = 670;
        let height = 600;

        let stlouisShapes = topojson.feature(stlouis, stlouis.objects.stlouis_tract_data);
        let cityLimits = topojson.feature(city, city.objects.city_limits);
        let riversArea = topojson.feature(rivers,rivers.objects.rivers_area);
        let missPath = topojson.feature(ms,ms.objects.mississippi);

        let projection = d3.geoTransverseMercator()
            .rotate([90 + 30 / 60, -35 - 50 / 60])
            .translate([0,100])
            .fitSize([width,height],riversArea);

        let path = d3.geoPath()
            .projection(projection);

        let colorScale = this.scale();

        let projRivers = riversArea.features.map(path);
        console.log(projRivers)

        let projMiss = missPath.features.map(path);

        let projCity = path(cityLimits.features[0]);

        let processed = stlouisShapes.features.map(feature => {
            return {
                feature: path(feature),
                percentSubsidized: feature.properties.stlouis__6
            };
        });

        return {
            width,
            height,
            processed,
            colorScale,
            projCity,
            projRivers,
            projMiss
        }
    },
    mounted() {
        this.$nextTick(() => {
            let legendLinear = legendColor()
                .title("Percent of population in subsidized housing")
                .shapeWidth(30)
                .cells([0.05,0.10,0.20,0.30,0.50])
                .orient('horizontal')
                .labelFormat('.00%')
                .scale(this.scale());

            d3.select('.legendLinear').call(legendLinear);
        });
    },
    methods: {
        scale() {
            return d3.scaleLinear()
            .domain([0, 0.5])
            .range(["#ffe5e5", "red"]);
        }
    }
};

</script>

<style>

.noData{
    font-size: 14px;
    font-family: "nimbus-sans",sans-serif;
    fill: grey;
    text-transform: uppercase;
}

.cityLabel {
    font-size: 14px;
    font-family: "nimbus-sans",sans-serif;
    fill: red;
    font-style: bold;
}

.city {
    stroke: red;
    stroke-width:1.5;
}

.miss {
    fill: none;
    stroke: lightgrey;
    stroke-width: 2px;
}

.river {
    fill: lightgrey;
    opacity: 1;
}

.tract {
    fill: white;
    stroke: lightgrey;
    stroke-width: 1px;
}

.dataTract{
    stroke: white;
    stroke-width: .5px;
}

.legendLinear .title {
    font-family: tablet-gothic-n2,tablet-gothic,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100,100,100);
}

.legendLinear .label {
    font-family: tablet-gothic-n2,tablet-gothic,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100,100,100);
}

.riverLabel {
    font-size: 12px;
    font-family: "nimbus-sans",sans-serif;
    fill: rgb(170,170,170);
    font-style: oblique;
}

</style>