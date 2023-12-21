import axios from "axios"
import "./Admin.css"
import styles from "../../styles/Moderator.module.css"
import { useCallback, useEffect, useState } from "react"
import PopUp from "../Modals/PopUp"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/features/logoutUser"
import ConfirmModal from "../Modals/ConfirmModal"
import AnotherUser from "../Modals/AnotherUser"

import { Table, Strong, Button } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import * as Avatar from "@radix-ui/react-avatar"
import InternalError from "../Modals/InternalError"
import { Spinner } from "../../lottie/illustrations"

function Moderator() {
  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")
  localStorage.removeItem("receiverId")
  localStorage.removeItem("receiverUsername")

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      console.log(info)
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
        setIsPending(false)
        setDatas(req.data)
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

  const [user_id, setId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const toggleRemoveUserModal = (id) => {
    setShowModal((prev) => !prev)
    setId(id)
  }

  const handleDelete = () => {
    setDatas((prev) => {
      return prev.filter((data) => data.id !== user_id)
    })

    axios
      .delete(`${baseUrl}/user/${user_id}`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        setErrorOccured(false)
        setPopupInfo(res.data)
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

        setErrorOccured(true)
        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setIsOpen(true)
      })
  }

  return (
    <>
      {closeInternalErrorModal && <InternalError />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {showModal && <ConfirmModal toggleRemoveUserModal={toggleRemoveUserModal} handleDelete={handleDelete} />}
      <div className={`container pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div style={{ filter: showModal ? "blur(4px)" : "blur(0)" }}>
          {isPending && <Spinner />}
          <div className={`container ${styles.ModeratorContainer}`}>
            {!isPending && (
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {datas &&
                    datas.map((data) => {
                      return (
                        data.accepted &&
                        data.approved && (
                          <Table.Row key={data.id}>
                            <Table.RowHeaderCell>
                              <Strong>{data.id}</Strong>
                            </Table.RowHeaderCell>
                            <Table.Cell>
                              <Avatar.Root className={styles.AvatarRoot}>
                                <Avatar.Image className={styles.AvatarImage} src={data.profile_photo} alt="Colm Tuite" />
                                <Avatar.Fallback className={styles.AvatarFallback} delayMs={100}>
                                  {data.username.slice(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                              </Avatar.Root>
                            </Table.Cell>
                            <Table.Cell>{data.username}</Table.Cell>
                            <Table.Cell>{data.email}</Table.Cell>
                            <Table.Cell>{data.role}</Table.Cell>
                            <Table.Cell>
                              {data.role == "user" && (
                                <Button
                                  variant="soft"
                                  color="red"
                                  className="btn btn-outline-danger"
                                  onClick={() => {
                                    toggleRemoveUserModal(data.id)
                                  }}
                                >
                                  <i className="bi bi-trash3-fill"></i>
                                </Button>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        )
                      )
                    })}
                </Table.Body>
              </Table.Root>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Moderator
