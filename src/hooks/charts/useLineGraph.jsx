import { useSelector } from "react-redux"
import { allMajors } from "../../redux/features/chartsSlice"

export function useLineGraph() {
  const allMajorsData = useSelector(allMajors)
  const lineGraph = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Registered Users',
      align: 'left',
      style: {
        fontSize: '2rem',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 400
      }
    },
    subtitle: {
      text: 'By Date',
      align: 'left',
      style: {
        fontSize: '1.6rem',
        fontWeight: 500
      }
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        color: 'darkblue',
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true
      },
    },
    tooltip: {
      style: {
        fontSize: '1.2rem',
        cursor: 'pointer',
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
  };

  return { lineGraph }
}

