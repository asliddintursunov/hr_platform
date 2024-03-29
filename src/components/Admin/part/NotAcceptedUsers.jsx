import axios from "axios"
import "../Admin.css"
import { Fragment, useCallback, useEffect, useState } from "react"
import _PopUp from "../../Modals/PopUp"
import { useNavigate } from "react-router-dom"
import styles from "../../../styles/Admin.module.css"
import { baseUrl } from "../../../utils/api"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../../redux/features/logoutUser"
import AcceptUserModal from "../../Modals/AcceptUserModal"
import RejectUserModal from "../../Modals/RejectUserModal"
import AnotherUser from "../../Modals/AnotherUser"

import { Table, Strong, Button } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import * as Avatar from "@radix-ui/react-avatar"
import InternalError from "../../Modals/InternalError"
import { Spinner } from "../../../lottie/illustrations"

function NotAcceptedUsers() {
  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user_id, setId] = useState(null)
  const [datas, setDatas] = useState("")
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)

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
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((req) => {
        // setDatas(req.data)
        const data = req.data.filter((user) => {
          return !user.accepted && user.approved
        })
        setDatas(data)
        setIsPending(false)
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
          headers: {
            "X-UserRole": memberRole,
            "X-UserId": memberId
          }
        }
      )
      .then((res) => {
        setPopupInfo(res.data)
        setErrorOccured(false)
        setIsOpen(true)
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
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        setPopupInfo(res.data)
        setIsOpen(true)
        setErrorOccured(false)
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

        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setErrorOccured(true)
        setIsOpen(true)
      })
  }

  return (
    <>
      {closeInternalErrorModal && <InternalError />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {showAcceptModal && <AcceptUserModal toggleAcceptModal={toggleAcceptModal} AddUser={AddUser} />}
      {showRejectModal && <RejectUserModal toggleRejectModal={toggleRejectModal} RejectUser={RejectUser} />}
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <div className={`${styles.acceptedUsersContainer}`} style={{ filter: showRejectModal || showAcceptModal || wrongUser ? "blur(4px)" : "blur(0)" }}>
        {isPending && <Spinner />}

        {!isPending && (
          <Table.Root variant="surface">
            <Table.Header>
              {datas.length > 0 ? (
                <Table.Row>
                  <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Accept</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.ColumnHeaderCell>Info</Table.ColumnHeaderCell>
                </Table.Row>
              )}
            </Table.Header>

            <Table.Body>
              {datas.length > 0 ? (
                datas.map((data) => {
                  return (
                    <Table.Row key={data.id}>
                      <Table.RowHeaderCell>
                        <Strong>{data.id}</Strong>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <Avatar.Root className={styles.AvatarRoot}>
                          <Avatar.Image
                            className={styles.AvatarImage}
                            src={data.profile_photo}
                            style={{
                              aspectRatio: "3/4"
                            }}
                          />
                          <Avatar.Fallback className={styles.AvatarFallback}>{data.username.charAt(0).toUpperCase()}</Avatar.Fallback>
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell>{data.username}</Table.Cell>
                      <Table.Cell>{data.email}</Table.Cell>
                      <Table.Cell>
                        <Button color="grass" variant="soft" className="btn btn-outline-success" onClick={() => toggleAcceptModal(data.id)}>
                          <i className="bi bi-check-square-fill"></i>
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button color="red" variant="soft" className="btn btn-outline-danger" onClick={() => toggleRejectModal(data.id)}>
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                })
              ) : (
                <Table.Row
                  style={{
                    display: "grid",
                    placeItems: "center",
                    fontSize: "3rem",
                    letterSpacing: "1rem"
                  }}
                >
                  <Table.Cell>No waiting users for now!</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        )}
      </div>
    </>
  )
}

export default NotAcceptedUsers
