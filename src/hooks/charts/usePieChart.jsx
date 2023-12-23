import { useSelector } from "react-redux"
import { allMajors } from "../../redux/features/chartsSlice"

export function usePieChart() {
  const allMajorsData = useSelector(allMajors)

  const userMajorData = []
  for (let i = 0; i < allMajorsData.userMajorCount.length; i++) {
    userMajorData.push({ name: allMajorsData.userMajor[i], y: allMajorsData.userMajorCount[i], drilldown: allMajorsData.userMajor[i] })
  }

  const pieChartSecond = {
    chart: {
      type: "pie",
      zooming: {
        mouseWheel: {
          enabled: false
        }
      }
    },
    title: {
      text: "Number of all developers",
      align: "left",
      style: {
        fontSize: "2rem",
        fontFamily: "Arial, sans-serif",
        fontWeight: 400
      }
    },
    subtitle: {
      text: "By Major",
      align: "left",
      style: {
        fontSize: "1.6rem",
        fontWeight: 500
      }
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    plotOptions: {
      series: {
        cursor: "pointer"
      },
      pie: {
        borderRadius: 8,
        shadow: {
          color: "rgba(0, 0, 0, 0.6)",
          offsetX: 0,
          offsetY: 0,
          opacity: 0.5,
          width: 5
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y:1f}",
          style: {
            fontSize: "1.3rem",
            fontWeight: "thin",
            textDecoration: "underline",
            color: "gray",
            textOutline: "0px 0px contrast"
          }
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:1.2rem">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:2f}</b> of total developers<br/>',
      style: {
        fontSize: "1.4rem"
      }
    },
    series: [
      {
        name: "Major",
        colorByPoint: true,
        data: userMajorData
      }
    ]
  }

  return { pieChartSecond }
}
