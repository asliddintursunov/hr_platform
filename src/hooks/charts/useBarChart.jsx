import { useSelector } from "react-redux"
import styles from "../../styles/Charts.module.css"
import { allMajors } from "../../redux/features/chartsSlice"

export function useBarChart() {
  const allMajorsData = useSelector(allMajors)
  console.log(allMajorsData);
  const responseData = {
    DesignDev: allMajorsData.DesignDev,
    DesktopDev: allMajorsData.DesktopDev,
    MobileDev: allMajorsData.MobileDev,
    backendDev: allMajorsData.backendDev,
    frontendDev: allMajorsData.frontendDev,
    fullstackDev: allMajorsData.fullstackDev,
    DataScienceDev: allMajorsData.DataScienceDev,
    DevOpsDev: allMajorsData.DevOpsDev,
    QADev: allMajorsData.QADev,
    SecurityDev: allMajorsData.SecurityDev,
    InternDev: allMajorsData.InternDev,
    OtherDev: allMajorsData.OtherDev,
  }

  // Define the categories you want to process
  const categories = Object.keys(responseData)

  // Initialize the result array
  const result = []

  // Create a mapping to keep track of counts
  const countMap = {}

  // Iterate through each category and its data
  categories.forEach((category) => {
    responseData[category].forEach((data) => {
      const { experience, count } = data

      // Initialize the count array for the experience if it doesn't exist
      if (!countMap[experience]) {
        countMap[experience] = Array(categories.length).fill(0)
      }
      // Update the count for the specific category
      countMap[experience][categories.indexOf(category)] = count
    })
  })

  // Convert the countMap into the desired result structure
  for (const experience in countMap) {
    const data = countMap[experience]

    // Check if any category has non-zero data for this experience
    if (data.some((count) => count !== 0)) {
      result.push({ name: experience, data })
    }
  }

  const barChart = {
    chart: {
      type: "bar",
      height: "600px",
    },
    title: {
      text: "Developer experience by category",
      align: "left",
      style: {
        fontSize: "1.6rem", // Updated font size
        fontFamily: "Arial, sans-serif",
        fontWeight: 400
      }
    },
    subtitle: {
      text: "Users count by major and experience level (years)",
      align: "left",
      style: {
        fontSize: "1.6rem", // Updated font size
        fontWeight: 500
      }
    },
    xAxis: {
      categories: categories.map((category) => {
        return (
          category.charAt(0).toUpperCase() + category.slice(1)).replace(/([A-Z])/g, " $1"
          ).trim()
      }),
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0,
      labels: {
        style: {
          fontSize: "1.4rem",
          color: "#888",
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        align: "high",
      },
      labels: {
        overflow: "justify",
        style: {
          fontSize: "1.2rem",
          color: "#888",
        }
      },
      gridLineWidth: 0
    },
    tooltip: {
      valueSuffix: " ta",
      style: {
        fontSize: "1.6rem",
        cursor: "pointer"
      }
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "1rem",
            fontWeight: 300
          }
        }
      },
      bar: {
        borderRadius: "35%",
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      shadow: true,
      itemStyle: {
        fontSize: "1rem",
        cursor: "pointer",
      }
    },
    credits: {
      enabled: false
    },
    series: result,
  }

  return { barChart }
}
