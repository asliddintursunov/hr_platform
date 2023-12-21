import { googleLogout } from "@react-oauth/google"
import axios from "axios"
import { baseUrl } from "../../../utils/api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../../redux/features/logoutUser"
import PopUp from "../../Modals/PopUp"
import LogOutModal from "../../Modals/LogOutModal"
import AnotherUser from "../../Modals/AnotherUser"
import InternalError from "../../Modals/InternalError"
import { useCallback, useState } from "react"
import { Button } from "@radix-ui/themes"

function LogOut() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const memberId = localStorage.getItem("userId")
  const memberRole = localStorage.getItem("userRole")

  const [isOpen, setIsOpen] = useState(false)
  const [errorOccured, setErrorOccured] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal(!showModal)

  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.clear()
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  // Log Out === Working
  const logOut = () => {
    googleLogout()
    axios
      .get(`${baseUrl}/logout/${memberId}`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        setIsOpen(true)

        setErrorOccured(false)
        setPopupInfo(res.data)

        setTimeout(() => {
          navigate("/signin")
        }, 1500)
        localStorage.clear()
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }

        setIsOpen(true)
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })
  }
  return (
    <>
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {closeInternalErrorModal && <InternalError />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {showModal && <LogOutModal toggleModal={toggleModal} logOut={logOut} />}
      <Button color="red" onClick={() => toggleModal()} style={{
				width: "100%",
			}}>
        <i className="bi bi-box-arrow-right"></i> Log Out
      </Button>
    </>
  )
}

export default LogOut
