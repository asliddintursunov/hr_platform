import { useCallback, useEffect, useState } from "react"
import styles from "../../styles/Chat.module.css"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { logoutUser, sendHeaders } from "../../redux/features/userDataSlice"
import AnotherUser from "../Modals/AnotherUser"
import { useNavigate } from "react-router-dom"
import PopUp from "../Modals/PopUp"
import { Avatar, Card, Code, Flex, Text } from "@radix-ui/themes"
// import { setCount } from "../../redux/features/chatMsgCountSlice"

function ChatUserSidebar({ GetReceiverUsername, setCloseInternalErrorModal }) {
  const userid = localStorage.getItem("userId")
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)
  // const head = useSelector((state) => state.headers)

  const [userData, setUserData] = useState([])
  const [userImage, setUserImage] = useState([])

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

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
        localStorage.clear()
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        socketInstance.emit("count", {
          id: userid
        })
        return () => {
          socketInstance.off("count")
        }
      }, 100)
    }
  }, [isConnected, socketInstance])

  useEffect(() => {
    if (isConnected) {
      socketInstance.on("count", (data) => {
        setUserData(data)
        // const unreadMsgCount = data.map((msg) => msg.unread_msg).reduce((a, b) => a + b, 0)
        // dispatch(setCount(unreadMsgCount))
      })
    }
  }, [socketInstance])

  useEffect(() => {
    if (userid) {
      axios
        .get(`${baseUrl}/chat/${userid}`, {
          headers: {
            "X-UserRole": localStorage.getItem("userRole"),
            "X-UserId": localStorage.getItem("userId")
          }
        })
        .then((res) => {
          setUserImage(res.data)
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
  }, [])

  return (
    <>
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={styles.usersListContainer} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <h2 className="text-center">Users List</h2>
        {userData.length === 0 && userImage.length === 0
          ? null
          : userData.map((user, index) => {
              const userInfo = userImage[index]
              if (userInfo) {
                return (
                  <Card key={user.id} className={styles.userCard} onClick={() => GetReceiverUsername(userInfo.id, userInfo.username)}>
                    <Flex gap="3" align="center">
                      <Avatar src={userInfo.profile_photo} radius="full" fallback={userImage[index].username.slice(0, 2).toUpperCase()} />
                      {user.id === userInfo.id && user.unread_msg !== 0 && <Code className={styles.unreadMsg}>{user.unread_msg}</Code>}
                      <Text as="div" size="2" weight="bold">
                        {userInfo.username}
                      </Text>
                    </Flex>
                  </Card>
                )
              }
            })}
      </div>
    </>
  )
}

export default ChatUserSidebar
