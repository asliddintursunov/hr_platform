import useUserData from "./useUserData";

export default function usePieChart() {
  
  const userMajorData = []
  const { userMajor, userMajorCount } = useUserData()

  for(let i = 0; i < userMajorCount.length; i++){
    userMajorData.push({name: userMajor[i], y: userMajorCount[i], drilldown: userMajor[i]})
  }

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
    },

    plotOptions: {
      series: {
        borderRadius: 8,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:1f}',
          style: {
            fontSize: '1.4rem'
          }
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:1.2rem">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:2f}</b> of total developers<br/>',
      style: {
        fontSize: '1.4rem'
      }
    },

    series: [
      {
        name: 'Major',
        colorByPoint: true,
        data: userMajorData
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
