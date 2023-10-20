import axios from "axios"
import "../Admin.css"
import { Fragment, useCallback, useEffect, useState } from "react"
import _PopUp from "../../_PopUp"
import { useNavigate } from "react-router-dom"
import useURL from "../../../hooks/useURL"
import styles from "../../../css/Admin.module.css"
import { baseUrl } from "../../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, sendHeaders } from "../../../features/userDataSlice"
import ConfirmModal from "../../modal/ConfirmModal"
import AcceptUserModal from "../../modal/AcceptUserModal"
import RejectUserModal from "../../modal/RejectUserModal"
import AnotherUser from "../../modal/AnotherUser"

function _NotAcceptedUsers() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { defaultImage } = useURL()

  const [user_id, setId] = useState(null)
  const [datas, setDatas] = useState("")
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  useEffect(() => {
    dispatch(sendHeaders())
    // console.clear()
  }, [])

  // Token Expired Validation
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

  const fetchData = useCallback(() => {
    setIsPending(true)
    axios
      .get(`${baseUrl}/users`, {
        // headers: head
        headers: {
          'X-UserRole': localStorage.getItem('userRole'),
          'X-UserId': localStorage.getItem('userId')
        }
      })
      .then((req) => {

        console.log(req.data);
        setDatas(req.data)
        setIsPending(false)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
        setIsPending(false)
      })
  }, [tokenExpired])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const toggleAcceptModal = (id) => {
    setShowAcceptModal((prev) => !prev)
    setId(id)
  }
  const AddUser = () => {
    setDatas((prev) => {
      return prev.filter((e) => e.id !== user_id)
    })

    axios
      .patch(
        `${baseUrl}/user/${user_id}`,
        {
          accepted: true
        },
        {
          //  headers: head
          headers: {
            'X-UserRole': localStorage.getItem('userRole'),
            'X-UserId': localStorage.getItem('userId')
          }
        }
      )
      .then((res) => {
        setPopupInfo(res.data)
        setErrorOccured(false)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setErrorOccured(true)
        setIsOpen(true)
      })
  }

  const [showRejectModal, setShowRejectModal] = useState(false)
  const toggleRejectModal = (id) => {
    setShowRejectModal((prev) => !prev)
    setId(id)
  }
  const RejectUser = () => {
    setDatas((prev) => {
      return prev.filter((e) => e.id !== user_id)
    })

    axios
      .delete(`${baseUrl}/user/${user_id}`, {
        // headers: head
        headers: {
          'X-UserRole': localStorage.getItem('userRole'),
          'X-UserId': localStorage.getItem('userId')
        }
      })
      .then((res) => {
        console.log(res)
        setPopupInfo(res.data)
        setIsOpen(true)
        setErrorOccured(false)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }

        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setErrorOccured(true)
        setIsOpen(true)
      })
  }

  return (
    <Fragment>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {showAcceptModal && <AcceptUserModal toggleAcceptModal={toggleAcceptModal} AddUser={AddUser} />}
      {showRejectModal && <RejectUserModal toggleRejectModal={toggleRejectModal} RejectUser={RejectUser} />}
      <div className={`form-control container ${styles.acceptedUsersContainer}`} style={{ filter: showRejectModal || showAcceptModal || wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className="text-center d-flex align-items-center justify-content-center">
          <div className="col-1">
            <h4>ID</h4>
          </div>
          <div className="col-3">
            <h4>Full Name</h4>
          </div>
          <div className="col-3">
            <h4>Username</h4>
          </div>
          <div className="col-3">
            <h4>E-mail</h4>
          </div>
          <div className="col-2">
            <h4>Accepted</h4>
          </div>
        </div>
        {isPending && <div className="loaderr"></div>}
        {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
        {!isPending && (
          <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
            <hr style={{ width: "100%" }} />
            {datas &&
              datas.map((data) => {
                return (
                  !data.accepted && data.approved && (
                    <div key={data.id} className={`form-control ${styles.userDataContainerDiv}`}>
                      <div className="col-1 text-center">
                        <b>#{data.id}</b>
                      </div>
                      <div className={`col-3 ${styles.userImgName}`}>
                        {data.profile_photo ? <img className="user-image" src={data.profile_photo} /> : <img className="user-image" src={defaultImage} />}
                        <p className="text-wrap">{data.fullname}</p>
                      </div>
                      <div className="col-3 text-center">
                        <p>{data.username}</p>
                      </div>
                      <div className="col-3 text-center">
                        <p>{data.email}</p>
                      </div>
                      {
                        <div className={`col-2 ${styles.changeDeleteBtn}`}>
                          {!data.accepted && (
                            <button className="btn btn-outline-success" onClick={() => toggleAcceptModal(data.id)}>
                              <i className="bi bi-check-square-fill"></i>
                            </button>
                          )}
                          {!data.accepted && (
                            <button className="btn btn-outline-danger" onClick={() => toggleRejectModal(data.id)}>
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          )}
                        </div>
                      }
                    </div>
                  )
                )
              })}
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default _NotAcceptedUsers
