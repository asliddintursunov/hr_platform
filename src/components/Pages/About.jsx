import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from "../../styles/Landing.module.css"

// Charts
import { useLineGraph } from '../../hooks/charts/useLineGraph';
import { usePieChart } from '../../hooks/charts/usePieChart';
import CardChart from './CardChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMajors } from '../../redux/features/chartsSlice';
import { useEffect } from 'react';
import { useBarChart } from '../../hooks/charts/useBarChart';

function About() {
  const dispatch = useDispatch()

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  useEffect(
    () => {
      if (isConnected) {
        console.log(isConnected + " Disconnected");
        socketInstance.disconnect();
      }
    }, []
  )

  useEffect(
    () => {
      dispatch(fetchMajors())
    }, []
  )

  const { lineGraph } = useLineGraph()
  const { pieChartSecond } = usePieChart()
  const { barChart } = useBarChart()

  return (
    <div className={`text-center ${styles.aboutPage} pageAnimation`}>
      <div style={{ gap: '2rem' }}>
        <div className={styles.basicStatsContainer}>
          <div className={styles.lineGraphContainer}>
            <HighchartsReact highcharts={Highcharts} options={lineGraph} />
          </div>
          <div className={styles.pieChartGraphContainer} >
            <HighchartsReact highcharts={Highcharts} options={pieChartSecond} />
          </div>
        </div>
        <div className={styles.detailsContainer}>
          {/* <CardChart /> */}
          <div className={styles.barChartDetailsContainer}>
            <HighchartsReact highcharts={Highcharts} options={barChart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About