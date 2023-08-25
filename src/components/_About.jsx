import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from '../css/Landing.module.css'

// Charts
import { useLineGraph } from '../hooks/charts/useLineGraph';
import usePieChart from '../hooks/charts/usePieChart';
import CardChart from '../hooks/charts/CardChart';

function _About() {
  const { lineGraph } = useLineGraph()
  const { pieChartSecond } = usePieChart()

  return (
    <div className={`text-center ${styles.aboutPage} pageAnimation`}>
      <div>
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

export default _About