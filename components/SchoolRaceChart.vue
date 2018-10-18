<script>
import yazooRaceData from '~/assets/yazoo_race_achievement.csv';
import Chart from './Chart.vue';
import * as d3 from 'd3';

export default {
    extends: Chart,
    props: {
        type: {
            type: String,
            default: 'scatter'
        },
        series: {
            type: Array,
            default() {
                let yazooRaceDataParsed = d3.csvParse(yazooRaceData);

                return [{
                        name: 'Districts',
                        data: yazooRaceDataParsed.map(row => {
                            return [+row.percent_african_american*100, +row.total_points];
                        })
                }];
            }
        }
    }
};
</script>
