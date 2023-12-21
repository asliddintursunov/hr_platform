import axios from "axios"
import styles from "../../../styles/Admin.module.css"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PopUp from "../../Modals/PopUp"
import { baseUrl } from "../../../utils/api"
import { logoutUser } from "../../../redux/features/logoutUser"
import ConfirmModal from "../../Modals/ConfirmModal"
import AnotherUser from "../../Modals/AnotherUser"
import InternalError from "../../Modals/InternalError"

import { Select, Table, Strong, Button } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import * as Avatar from "@radix-ui/react-avatar"
import { Spinner } from "../../../lottie/illustrations"

function AcceptedUsers() {
  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const [user_id, setUser_Id] = useState(null)
  const [datas, setDatas] = useState(null)
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
      .get(`${baseUrl}/accepted_users`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((req) => {
        console.log(req)
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

  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const toggleRemoveUserModal = (id) => {
    setShowRemoveModal((prev) => !prev)
    setUser_Id(id)
  }

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/user/${user_id}`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
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
        setErrorOccured(true)
        setPopupInfo("Qandaydir xatolik ro'y berdi!")
        setIsOpen(true)
      })
  }

  const handleEditRole = (id, role) => {
    axios
      .patch(
        `${baseUrl}/user/${id}`,
        {
          role: role
        },
        {
          headers: {
            "X-UserRole": memberRole,
            "X-UserId": memberId
          }
        }
      )
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
      {showRemoveModal && <ConfirmModal toggleRemoveUserModal={toggleRemoveUserModal} handleDelete={handleDelete} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <div className={`${styles.acceptedUsersContainer}`} style={{ filter: showRemoveModal || wrongUser ? "blur(4px)" : "blur(0)" }}>
        {isPending && !closeInternalErrorModal && <Spinner />}

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
                    <Table.Row key={data.id}>
                      <Table.RowHeaderCell>
                        <Strong>{data.id}</Strong>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <Avatar.Root className={styles.AvatarRoot}>
                          <Avatar.Image className={styles.AvatarImage} src={data.profile_photo} />
                          <Avatar.Fallback className={styles.AvatarFallback}>{data.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell>{data.username}</Table.Cell>
                      <Table.Cell>{data.email}</Table.Cell>
                      {data.role !== "admin" && (
                        <Table.Cell>
                          <Select.Root defaultValue={data.role} onValueChange={() => handleEditRole(data.id, data.role === "user" ? "moderator" : "user")}>
                            <Select.Trigger />
                            <Select.Content position="popper">
                              <Select.Item value="user">User</Select.Item>
                              <Select.Item value="moderator">Moderator</Select.Item>
                            </Select.Content>
                          </Select.Root>
                        </Table.Cell>
                      )}
                      {data.role === "admin" && <Table.Cell>Admin</Table.Cell>}
                      <Table.Cell>
                        {data.role !== "admin" && (
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
                })}
            </Table.Body>
          </Table.Root>
        )}
      </div>
    </>
  )
}

export default AcceptedUsers
