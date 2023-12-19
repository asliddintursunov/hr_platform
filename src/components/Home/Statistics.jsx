import "./Home.css"
import { useBarChart } from "../../hooks/charts/useBarChart"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { fetchMajors } from "../../redux/features/chartsSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

function Statistics() {
  const dispatch = useDispatch()
  const { barChart } = useBarChart()
  useEffect(() => {
    dispatch(fetchMajors())
  }, [])
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={barChart} />
    </div>
  )
}

export default Statistics
