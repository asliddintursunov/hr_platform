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

  return (
    <div className={`text-center ${styles.aboutPage} pageAnimation`}>
      <div>
        <h1 className="display-3 text-dark text-center">About Page</h1>
        <div className={styles.basicStatsContainer}>
          <HighchartsReact highcharts={Highcharts} options={lineGraph} />
          <HighchartsReact highcharts={Highcharts} options={pieChartSecond} />
        </div>
        <div className={styles.detailsContainer}>
          <CardChart />
        </div>
      </div>
    </div>
  )
}

export default About