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
                        name: 'District',
                        data: yazooRaceDataParsed.map(row => {
                            return {
                                label: (row.dist_name === 'Yazoo City Municipal School District' ? 'Yazoo City' : row.dist_name),
                                x: +row.percent_african_american*100,
                                y: +row.total_points,
                                dataLabels: { enabled: (row.dist_name === 'Yazoo City Municipal School District') }
                            };
                        })
                }];
            }
        }
    }
};
</script>
