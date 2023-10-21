import { useSelector } from "react-redux"
import { allMajors } from "../../redux/features/chartsSlice"

export function useLineGraph() {
  const allMajorsData = useSelector(allMajors)
  const lineGraph = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Added Users',
      style: {
        fontSize: '1.6rem',
      }
    },
    plotOptions: {
      line: {
        dataLables: {
          enabled: true,
          style: {
            fontSize: '1.6rem'
          }
        }
      },
    },
    tooltip: {
      style: {
        fontSize: '1.2rem'
      }
    },
    xAxis: {
      categories: allMajorsData.byDate,
      labels: {
        style: {
          fontSize: '1.6rem'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Registered Users',
        style: {
          fontSize: '1.6rem'
        }
      },
      labels: {
        style: {
          fontSize: '1.6rem'
        }
      }
    },
    legend: {
      floating: true,
      align: 'right',
      verticalAlign: 'top',
      y: 60,
      x: -60,
      itemStyle: {
        fontSize: '1.6rem'
      }
    },
    series: [
      {
        name: 'Users',
        data: allMajorsData.userCount
      }
    ]
  }
  return { lineGraph }
}

