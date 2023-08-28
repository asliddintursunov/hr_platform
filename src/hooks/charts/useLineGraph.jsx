import useUserData from "./useUserData"

export function useLineGraph() {
  const { byDate, userCount } = useUserData()

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
        fontSize: '1.2rem' // Adjust the font size for tooltip text
      }
    },
    xAxis: {
      categories: byDate,
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
        data: userCount
      }
    ]
  }
  return { lineGraph }
}

