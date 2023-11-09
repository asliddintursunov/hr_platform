import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from "../../styles/Landing.module.css"

// Charts
import { useLineGraph } from '../../hooks/charts/useLineGraph';
import { usePieChart } from '../../hooks/charts/usePieChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMajors } from '../../redux/features/chartsSlice';
import { useCallback, useEffect, useState } from 'react';
import { useBarChart } from '../../hooks/charts/useBarChart';
import axios from 'axios';
import { baseUrl } from '../../utils/api';
import { Blockquote } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

function About() {
  const dispatch = useDispatch()

  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  const [acceptedUsers, setAcceptedUsers] = useState(0)
  const [waitingUsers, setWaitingUsers] = useState(0)

  const fetchUsers = useCallback(
    () => {
      axios
        .get(`${baseUrl}/users`, {
          headers: {
            "X-UserRole": memberRole,
            "X-UserId": memberId
          }
        })
        .then((req) => {
          req.data.map((user) => {
            if (user.accepted) {
              setAcceptedUsers((prev) => prev += 1)
            } else if (!data.accepted && data.approved) {
              setWaitingUsers((prev) => prev += 1)
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }, []
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(
    () => {
      if (isConnected) {
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
        <div className={styles.registeredUsersContiner}>
          {acceptedUsers !== undefined && acceptedUsers !== 0 && (
            <div>
              <Blockquote>
                <Link to='/landing/admin/admin/accepted'>{acceptedUsers} users are accepted!</Link>
              </Blockquote>
            </div>
          )}
          {waitingUsers !== undefined && waitingUsers !== 0 && (
            <div>
              <Blockquote>
                <Link to='/landing/admin/admin/waitingusers'>{waitingUsers} users are waiting for acception!</Link>
              </Blockquote>
            </div>
          )}
        </div>
        <div className={styles.basicStatsContainer}>
          <div className={styles.lineGraphContainer}>
            <HighchartsReact highcharts={Highcharts} options={lineGraph} />
          </div>
          <div className={styles.pieChartGraphContainer} >
            <HighchartsReact highcharts={Highcharts} options={pieChartSecond} />
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.barChartDetailsContainer}>
            <HighchartsReact highcharts={Highcharts} options={barChart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About