import "./Home.css"
import { useState } from "react"
import axios from "axios"
import { useEffect, useCallback } from "react"
import { baseUrl } from "../../utils/api"
import InternalError from "../Modals/InternalError"
import AnotherUser from "../Modals/AnotherUser"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { logoutUser } from "../../redux/features/userDataSlice"
import { Spinner } from "../../lottie/illustrations"
import UserInfo from "./UserInfo"
import Statistics from "./Statistics"
import FizmasoftInfo from "./FizmasoftInfo"

function Home() {
  const memberId = localStorage.getItem("userId")
  const memberRole = localStorage.getItem("userRole")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isPending, setIsPending] = useState(false)
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  const [userData, setUserData] = useState({})

  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.removeItem("token")
        localStorage.clear()
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  useEffect(() => {
    axios
      .get(`${baseUrl}/user/${memberId}`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        setUserData(res.data)
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }

        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }

        setIsPending(false)
      })
  }, [])

  return (
    <>
      {isPending && <Spinner />}
      {closeInternalErrorModal && <InternalError setCloseInternalErrorModal={setCloseInternalErrorModal} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className="pageAnimation HomePage container">
        <div className="userInfo__FizmasoftInfo">
          <UserInfo userData={userData}/>
          <FizmasoftInfo />
        </div>
        <div className="StatisticsData">
          <Statistics />
        </div>
      </div>
    </>
  )
}

export default Home
