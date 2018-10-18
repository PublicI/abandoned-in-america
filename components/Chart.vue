<template>
    <section class="charts">
        <div v-for="chart in charts" class="chart">
            <highcharts :options="chart"></highcharts>
        </div>
        <div class="credit">Graphic by Chris Zubak-Skees</div>

    </section>
</template>

<script>
import { Chart } from 'highcharts-vue';
// import clone from 'lodash.clonedeep';

export default {
    props: {
        type: String,
        categories: Array,
        series: Array,
        stacked: Boolean,
        grid: Boolean,
        suffix: String,
        directLabel: Boolean
    },
    computed: {
        charts() {
            let series = this.series;

            let options = {
                colors: [
                    '#427aa8',
                    '#fa8e1c',
                    '#e95b54',
                    '#6db6b2',
                    '#519e4b',
                    '#f3c73e',
                    '#b37ca1'
                ],
                chart: {
                    backgroundColor: null,
                    type: this.type,
                    height: 600,
                    // paddingLeft: -10,
                    style: {
                        fontFamily: 'nimbus-sans',
                        fontSize: '13px'
                    }
                },
                xAxis: {
                    min: 0,
                    max: 100,
                    tickLength: 0,
                    align: 'right',
                    title: {
                        text: 'Percent of students who are black',
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold'
                            // color: '#666'
                        }
                    },
                    labels: {
                        // enabled: false,
                        reserveSpace: true,
                        allowOverlap: true,
                        step: 1,
                        style: {
                            fontSize: '12.5px',
                            color: '#383838'
                        },
                        format: '{value}%' // %
                    }
                    //, categories: this.categories
                },
                yAxis: {
                    plotBands: [{
                        label: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            },
                            text: 'F',
                            align: 'left',
                        },
                        color: '#b30000', // Color value
                        from: 194, // Start of the plot band
                        to: 488 // End of the plot band
                    },{
                        label: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            },
                            text: 'D',
                            align: 'left',
                        },
                        color: '#e34a33', // Color value
                        from: 494, // Start of the plot band
                        to: 534 // End of the plot band
                    },{
                        label: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            },
                            text: 'C',
                            align: 'left',
                        },
                        color: '#fc8d59', // Color value
                        from: 536, // Start of the plot band
                        to: 598 // End of the plot band
                    },{
                        label: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            },
                            text: 'B',
                            align: 'left',
                        },
                        color: '#fdcc8a', // Color value
                        from: 599, // Start of the plot band
                        to: 667 // End of the plot band
                    },{
                        label: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            },
                            text: 'A',
                            align: 'left',
                        },
                        color: '#fef0d9', // Color value
                        from: 669, // Start of the plot band
                        to: 761 // End of the plot band
                    }],
                    // tickInterval: 15,
                    gridLineWidth: 0, // this.directLabel ? 0 : 1,
                    title: {
                        text: 'Achievement score',
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold'
                            // color: '#666'
                        }
                    },
                    labels: {
                        format: '{value}', // %
                        enabled: !this.directLabel
                    }
                },
                legend: {
                    enabled: true,
                    verticalAlign: 'top',
                    itemHoverStyle: {
                        color: '#333333',
                        cursor: 'initial'
                    }
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                        // color: '#666'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        },
                        stacking: this.stacked ? 'normal' : null
                    },
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        stacking: this.stacked ? 'normal' : null
                    },
                    line: {
                        marker: {
                            symbol: 'circle'
                        }
                    },
                    scatter: {
                        marker: {
                            symbol: 'circle'
                        },
                        dataLabels: {
                            align: 'left',
                            verticalAlign: 'middle',
                            y: -2,
                            x: -3,
                            formatter: function () {
                                return this.point.label;
                            }
                        }
                    },
                    series: {
                        events: {
                            legendItemClick() {
                                return false;
                            }
                        },
                        // pointWidth: 11,
                        // color: '#3D7FA6',
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                        marker: {
                            radius: 3,
                            fillColor: '#FFFFFF',
                            lineWidth: 2,
                            lineColor: '#333333' // inherit from series
                        }
                    }
                },
                series
            };

            // let options = clone(this.chartOptions);

            return [options];
        }
    },
    components: {
        highcharts: Chart
    },
    created() {
        this.$emit('init', {
            // TKTK
        });
    }
};
</script>

<style>
.highcharts-plot-band {
    opacity: 0.4;
}
.charts {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
.credit {
    padding-left: 25px;
    font-size: 15px;
    color: rgb(170,170,170);
    padding-bottom: 8px;
    font-family: "nimbus-sans",sans-serif;
}
</style>
