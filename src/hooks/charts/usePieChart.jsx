export default function usePieChart() {

    const pieChartSecond = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Number of All Developers',
            align: 'left',
            style: {
                fontSize: '2rem'
            }
        },
        subtitle: {
            align: 'left',
            style: {
                fontSize: '1.2rem'
            }
        },

        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: {
            series: {
                borderRadius: 8,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%',
                    style: {
                        fontSize: '1.4rem'
                    }
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:1.2rem">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
            style: {
                fontSize: '1.4rem'
            }
        },

        series: [
            {
                name: 'Majors',
                colorByPoint: true,
                data: [
                    {
                        name: 'FullStack',
                        y: 61.04, // Percentage
                        drilldown: 'FullStack'
                    },
                    {
                        name: 'Frontend',
                        y: 9.47, // Percentage
                        drilldown: 'Frontend'
                    },
                    {
                        name: 'Backend',
                        y: 9.32, // Percentage
                        drilldown: 'Backend'
                    },
                    {
                        name: 'Mobile',
                        y: 8.15, // Percentage
                        drilldown: 'Mobile'
                    },
                    {
                        name: 'Desktop',
                        y: 11.02, // Percentage
                        drilldown: 'Desktop'
                    },
                    {
                        name: 'Design',
                        y: 11.02, // Percentage
                        drilldown: 'Design'
                    }
                ]
            }
        ],
        drilldown: {
            series: [
                // Drilldown series data...
            ]
        }
    };

    return { pieChartSecond }
}
