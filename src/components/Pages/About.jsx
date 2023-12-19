import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import styles from "../../styles/Landing.module.css"

// Charts
import { useLineGraph } from "../../hooks/charts/useLineGraph"
import { usePieChart } from "../../hooks/charts/usePieChart"
import { useDispatch, useSelector } from "react-redux"
import { fetchMajors } from "../../redux/features/chartsSlice"
import { useCallback, useEffect, useState } from "react"
import { useBarChart } from "../../hooks/charts/useBarChart"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { Blockquote, Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import { Cross1Icon } from "@radix-ui/react-icons"
import InternalError from "../Modals/InternalError"

function About() {
  const dispatch = useDispatch()

  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  // const [acceptedUsers, setAcceptedUsers] = useState(0)
  const [waitingUsers, setWaitingUsers] = useState(0)
  const [closeNav, setCloseNav] = useState(false)

  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)

  const fetchUsers = useCallback(() => {
    axios
      .get(`${baseUrl}/count_users`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((req) => {
        setWaitingUsers(req.data)
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }
      })
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    if (isConnected) {
      socketInstance.disconnect()
    }
  }, [])

  useEffect(() => {
    dispatch(fetchMajors())
  }, [])

  const { lineGraph } = useLineGraph()
  const { pieChartSecond } = usePieChart()
  const { barChart } = useBarChart()

  return (
    <>
      {closeInternalErrorModal && <InternalError setCloseInternalErrorModal={setCloseInternalErrorModal} />}

      <div className={`text-center ${styles.aboutPage} pageAnimation`}>
        <div style={{ gap: "2rem" }}>
          {waitingUsers !== 0 && memberRole === 'admin' && (
            <div className={styles.registeredUsersContiner}>
              <div className={styles.waitingUsersNav}>
                <Blockquote>
                  <Link to="/landing/admin/waitingusers">{waitingUsers} users are waiting for acception!</Link>
                </Blockquote>
              </div>
              <Button className={styles.waitingUsersNavClose} color="red" variant="soft" mr="2" onClick={() => setCloseNav(true)}>
                {" "}
                <Cross1Icon />{" "}
              </Button>
            </div>
          )}
          <div className={styles.basicStatsContainer}>
            <div className={styles.lineGraphContainer}>
              <HighchartsReact highcharts={Highcharts} options={lineGraph} />
            </div>
            <div className={styles.pieChartGraphContainer}>
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
    </>
  )
}

export default About
