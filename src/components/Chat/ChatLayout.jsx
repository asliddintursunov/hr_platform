// import '../../app/App.css'
import { useCallback, useEffect, useState } from "react"
import ChatUserSidebar from "./ChatUserSidebar"
import ChatWebsocketPlace from "./ChatWebsocketPlace"
import styles from "../../styles/Chat.module.css"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, sendHeaders } from "../../redux/features/userDataSlice"
import { connect } from "../../redux/features/socketConnectionSlice"
import PopUp from "../Modals/PopUp"
import { useNavigate } from "react-router-dom"
import InternalError from "../Modals/InternalError"
function ChatLayout() {
  const navigate = useNavigate()

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)
  const head = useSelector((state) => state.headers)

  const [chatSelected, setChatSelected] = useState(false)
  const [oneUserData, setOneUserData] = useState({})
  const [messages, setMessages] = useState([])

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")
  const userID = localStorage.getItem("userId")
  // const [isPending, setIsPending] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sendHeaders())
    dispatch(connect())
  }, [])

  useEffect(() => {
    if (isConnected && userID) {
      socketInstance.emit("hello", {
        id: userID
      })
    }
  }, [isConnected, socketInstance, userID])

  // Token Expired Validation
  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.removeItem("token")
        localStorage.clear()
        // navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  const GetReceiverUsername = async (id, username) => {
    localStorage.setItem("receiverId", id)
    const senderId = localStorage.getItem("userId")

    localStorage.setItem("receiverUsername", username)

    setChatSelected(true)
    setIsPending(true)
    axios
      .post(
        `${baseUrl}/chat/${senderId}`,
        {
          username: username
        },
        {
          // headers: head
          headers: {
            "X-UserRole": localStorage.getItem("userRole"),
            "X-UserId": localStorage.getItem("userId")
          }
        }
      )
      .then((res) => {
        setIsPending(false)
        setOneUserData(res.data)
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }
        // setIsPending(false)
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })

    await axios
      .get(`${baseUrl}/chat/room`, {
        params: { user_id1: senderId, user_id2: id },
        // headers: head
        headers: {
          "X-UserRole": localStorage.getItem("userRole"),
          "X-UserId": localStorage.getItem("userId")
        }
      })
      .then((res) => {
        // setIsPending(false)
        setMessages(res.data)
      })
      .catch((err) => {
        setIsPending(false)
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
      })
  }

  return (
    <>
      {/* {isPending && <div className="loaderr"></div>} */}
      {closeInternalErrorModal && <InternalError setCloseInternalErrorModal={setCloseInternalErrorModal} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={`${styles.chatLayoutContainer} pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className={styles.chatPlace}>
          {chatSelected && <ChatWebsocketPlace oneUserData={oneUserData} messages={messages} setMessages={setMessages} />}
          {!chatSelected && <h1 className="display-2 text-center">Select A Chat to have a conversation!</h1>}
        </div>
        <div className={styles.usersSidebar}>
          <ChatUserSidebar GetReceiverUsername={GetReceiverUsername} setCloseInternalErrorModal={setCloseInternalErrorModal} />
        </div>
      </div>
    </>
  )
}

export default ChatLayout
