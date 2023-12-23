import { useCallback, useEffect, useState } from "react"
import styles from "../../styles/Chat.module.css"
import { useDispatch } from "react-redux"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { logoutUser } from "../../redux/features/logoutUser"
import AnotherUser from "../Modals/AnotherUser"
import { useNavigate } from "react-router-dom"
import PopUp from "../Modals/PopUp"
import { Avatar, Card, Code, Flex, Text } from "@radix-ui/themes"
import { ChatUserSidebarLoader } from "../../lottie/illustrations"
// import { setCount } from "../../redux/features/chatMsgCountSlice"

function ChatUserSidebar({ GetReceiverUsername, setCloseInternalErrorModal, isConnected, socketInstance, sidebarHeight }) {
  const userid = localStorage.getItem("userId")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState([])
  const [userImage, setUserImage] = useState([])

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [loadingUserSidebar, setLoadingUserSidebar] = useState(false)

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
        setLoadingUserSidebar(false)
        setUserData(data)
        // const unreadMsgCount = data.map((msg) => msg.unread_msg).reduce((a, b) => a + b, 0)
        // dispatch(setCount(unreadMsgCount))
      })
    }
  }, [socketInstance])

  useEffect(() => {
    setLoadingUserSidebar(true)
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
  const receiverId = localStorage.getItem("receiverId")
  return (
    <>
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <h2
        className="text-center"
        style={{
          borderBottom: "1px solid #e2e2e2"
        }}
      >
        Users List
      </h2>
      {!loadingUserSidebar && (
        <div
          className={styles.usersListContainer}
          style={{ filter: wrongUser ? "blur(4px)" : "blur(0)", height: sidebarHeight ? `calc(${sidebarHeight + 50}px)` : "calc(100vh - 12rem)", overflowY: "scroll" }}
        >
          {userData.length === 0 && userImage.length === 0
            ? null
            : userData.map((user, index) => {
                const userInfo = userImage[index]
                if (userInfo) {
                  return (
                    <Card
                      key={user.id}
                      className={styles.userCard}
                      onClick={() => GetReceiverUsername(userInfo.id, userInfo.username)}
                      style={{
                        backgroundColor: ~~receiverId === ~~userInfo.id && "#333",
                        color: ~~receiverId === ~~userInfo.id && "#fff"
                      }}
                    >
                      <Flex gap="3" align="center">
                        <Avatar
                          src={userInfo.profile_photo}
                          radius="full"
                          fallback={userImage[index].username.slice(0, 2).toUpperCase()}
                          style={{
                            aspectRatio: "3/4"
                          }}
                        />
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
      )}
      {loadingUserSidebar && <ChatUserSidebarLoader />}
    </>
  )
}
export default ChatUserSidebar
