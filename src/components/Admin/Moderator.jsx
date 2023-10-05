import axios from "axios"
import "./Admin.css"
import styles from "../../css/Moderator.module.css"
import { useCallback, useEffect, useState } from "react"
import _PopUp from "../_PopUp"
import { useNavigate } from "react-router-dom"
import useURL from "../../hooks/useURL"
import { baseUrl } from "../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, sendHeaders } from "../../features/userDataSlice"
import ConfirmModal from '../modal/ConfirmModal'
import AnotherUser from "../modal/AnotherUser"

function Moderator() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { defaultImage } = useURL()
  const [datas, setDatas] = useState("")
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  useEffect(() => {
    dispatch(sendHeaders())
  }, [])

  // Add a request interceptor
  // axios.interceptors.request.use(function (config) {
  //   const token = localStorage.getItem('token')
  //   config.headers.Authorization = 'Bearer ' + token;

  //   return config;
  // });
  // Token Expired Validation
  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.removeItem("token")
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  const fetchData = useCallback(() => {
    setIsPending(true)
    axios
      .get(`${baseUrl}/users`, {
        headers: head
      })
      .then((req) => {
        setIsPending(false)
        setDatas(req.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setIsPending(false)
      })
  }, [tokenExpired])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const [user_id, setId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const toggleRemoveUserModal = (id) => {
    setShowModal(prev => !prev)
    setId(id)
  }

  const handleDelete = () => {
    setDatas((prev) => {
      return prev.filter((data) => data.id !== user_id)
    })

    axios.delete(`${baseUrl}/user/${user_id}`, {
      headers: head
    })
      .then((res) => {
        setErrorOccured(false)
        setPopupInfo(res.data)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setErrorOccured(true)
        setPopupInfo('Qandaydir xatolik ro\'y berdi!')
        setIsOpen(true)
      })
  }

  return (
    <>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={`container pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        {showModal && <ConfirmModal toggleRemoveUserModal={toggleRemoveUserModal} handleDelete={handleDelete} />}
        <div style={{ filter: showModal ? "blur(4px)" : "blur(0)" }}>
          <div className="text-center">
            <h1 className="display-3">Moderator Page</h1>
            <hr />
            <br />
          </div>
          <div className={`container form-control ${styles.ModeratorContainer}`}>
            <div className="text-center d-flex align-items-center justify-content-center">
              <div className="col-2">
                <h4>ID</h4>
              </div>
              <div className="col-2">
                <h4>User</h4>
              </div>
              <div className="col-2">
                <h4>Username</h4>
              </div>
              <div className="col-2">
                <h4>E-mail</h4>
              </div>
              <div className="col-2">
                <h4>Role</h4>
              </div>
              <div className="col-2">
                <h4>Delete</h4>
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
                      data.accepted && (
                        <div key={data.id} className={`form-control ${styles.userDataContainerDiv}`}>
                          <div className="col-2 text-center">
                            <p>#{data.id}</p>
                          </div>
                          <div className={`col-2 ${styles.userImgName}`}>
                            {data.profile_photo ? <img className="user-image" src={data.profile_photo} /> : <img className="user-image" src={defaultImage} />}
                            <p className="text-wrap">{data.fullname}</p>
                          </div>
                          <div className="col-2 text-center">
                            <p>{data.username}</p>
                          </div>
                          <div className="col-2 text-center">
                            <p>{data.email}</p>
                          </div>
                          <div className="col-2 d-flex align-items-center justify-content-around">
                            <p>{data.role}</p>
                          </div>
                          <div className={`col-2 ${styles.changeDeleteBtn}`}>
                            {data.role === "user" && (
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  toggleRemoveUserModal(data.id)
                                }}
                              >
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Moderator
