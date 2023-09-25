import { useSelector } from "react-redux";
import { allMajors } from "../../features/chartsSlice";


export function usePieChart() {
  const allMajorsData = useSelector(allMajors)

  const userMajorData = []
  for (let i = 0; i < allMajorsData.userMajorCount.length; i++) {
    userMajorData.push({ name: allMajorsData.userMajor[i], y: allMajorsData.userMajorCount[i], drilldown: allMajorsData.userMajor[i] })
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
