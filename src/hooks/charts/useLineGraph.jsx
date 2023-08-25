import { useEffect, useState } from "react"
import useURL from "../useURL"
import axios from "axios"

export function useLineGraph() {
  const { usersStatsUrl } = useURL()

  const [byDate, setByDate] = useState([])
  const [userCount, setUserCount] = useState([])

  useEffect(
    () => {
      axios.get(usersStatsUrl)
        .then((res) => {

          // Getting users data
          const dates = res.data.map(item => item.date.slice(0, 10))
          setByDate(dates)

          // Getting users number
          const userNumbers = res.data.map(item => item.user_count)
          setUserCount(userNumbers)
        })
        .catch((err) => {
          console.log(err);
        })
    }, [usersStatsUrl]
  )
  useEffect(() => { console.log(byDate); }, [byDate])


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

