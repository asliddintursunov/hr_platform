import axios from "axios"
import styles from "../../../css/Admin.module.css"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import _PopUp from "../../_PopUp"
import useURL from "../../../hooks/useURL"
import { baseUrl } from "../../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, sendHeaders } from "../../../features/userDataSlice"
import ConfirmModal from "../../modal/ConfirmModal"
import EditRoleModal from "../../modal/EditRoleModal"
import AnotherUser from "../../modal/AnotherUser"

function _AcceptedUsers() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { defaultImage } = useURL()

  const [user_id, setUser_Id] = useState(null)
  const [datas, setDatas] = useState(null)
  const [userRole, setUserRole] = useState("user")
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

  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const toggleRemoveUserModal = (id) => {
    setShowRemoveModal(prev => !prev)
    setUser_Id(id)
  }
  const handleDelete = () => {
    // setDatas(prev => {
    //   return prev.filter(data => data.id !== user_id)
    // })
    axios
      .delete(`${baseUrl}/user/${user_id}`, {
        headers: head
      })
      .then((res) => {
        setDatas((prev) => {
          return prev.filter((data) => data.id !== user_id)
        })
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
        setIsPending(false)
        setErrorOccured(true)
        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setIsOpen(true)

        console.log(err)
      })
  }

  const [showEditRoleModal, setShowEditRoleModal] = useState(false)
  const toggleEditRoleModal = (id) => {
    setShowEditRoleModal(prev => !prev)
    setUser_Id(id)
  }
  const handleEdit = () => {
    axios
      .patch(
        `${baseUrl}/user/${user_id}`,
        {
          role: userRole
        },
        {
          headers: head
        }
      )
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
        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setIsOpen(true)
      })
  }

  return (
    <Fragment>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {showEditRoleModal && <EditRoleModal toggleEditRoleModal={toggleEditRoleModal} handleEdit={handleEdit} />}
      {showRemoveModal && <ConfirmModal toggleRemoveUserModal={toggleRemoveUserModal} handleDelete={handleDelete} />}
      <div className={`form-control container ${styles.acceptedUsersContainer}`} style={{ filter: showEditRoleModal || showRemoveModal || wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className="text-center d-flex align-items-center">
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
            <h4>Edit</h4>
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
                        <b>#{data.id}</b>
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
                      <div className={`col-2 ${styles.changeRoleContainer}`}>
                        {data.role !== "admin" && (
                          <select
                            className={`form-select ${styles.selectRole}`}
                            onChange={(e) => {
                              setUserRole(e.target.value)
                            }}
                          >
                            <option selected={data.role === "user" && true} value="user">
                              User
                            </option>
                            <option selected={data.role === "moderator" && true} value="moderator">
                              Moderator
                            </option>
                          </select>
                        )}
                        {data.role === "admin" && <b>{data.role}</b>}
                      </div>
                      <div className={`col-2 ${styles.changeDeleteBtn}`}>
                        <button
                          disabled={data.role === "admin"}
                          className="btn btn-outline-success"
                          onClick={() => {
                            toggleEditRoleModal(data.id)
                          }}
                        >
                          <i className="bi bi-pen-fill"></i>
                        </button>
                        <button
                          disabled={data.role === "admin"}
                          className="btn btn-outline-danger"
                          onClick={() => {
                            toggleRemoveUserModal(data.id)
                          }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
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

export default _AcceptedUsers
