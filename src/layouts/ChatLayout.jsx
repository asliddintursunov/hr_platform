import { useEffect, useState } from "react"
import _ChatUserSidebar from "../components/_ChatUserSidebar"
import _ChatWebsocketPlace from "../components/_ChatWebsocketPlace"
import styles from "../css/Chat.module.css"
import axios from "axios"
import { baseUrl } from "../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, sendHeaders } from "../features/userDataSlice"

function ChatLayout() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()

  const [chatSelected, setChatSelected] = useState(false)
  const [oneUserData, setOneUserData] = useState({})
  const [messages, setMessages] = useState([])

  const [showUsers, setShowUsers] = useState(false)
  const usersSideBarStyle = {
    transform: 'translateX(78%)',
    flex: 0.5,
  }

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  useEffect(
    () => {
      dispatch(sendHeaders())
      console.clear()
    }, []
  )


  const GetReceiverUsername = async (id, username) => {
    localStorage.setItem("receiverId", id)
    const senderId = localStorage.getItem("userId")

    localStorage.setItem("receiverUsername", username)


    setChatSelected(true)

    axios.post(`${baseUrl}/chat/${senderId}`, {
      username: username,
    }, { headers: head })
      .then((res) => setOneUserData(res.data))
      .catch((err) => {
        if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })


    await axios
      .get(`${baseUrl}/chat/room`, { params: { user_id1: senderId, user_id2: id }, headers: head })
      .then((res) => {
        setMessages(res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })
  }


  return (
    <>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={`${styles.chatLayoutContainer} pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className={styles.chatPlace}>
          {chatSelected && <_ChatWebsocketPlace oneUserData={oneUserData} messages={messages} setMessages={setMessages} showUsers={showUsers} />}
          {!chatSelected && <h1 className="display-2 text-center">Select A Chat to have a conversation!</h1>}
        </div>
        <div className={styles.usersSidebar} style={showUsers ? usersSideBarStyle : null}>
          <_ChatUserSidebar GetReceiverUsername={GetReceiverUsername} showUsers={showUsers} setShowUsers={setShowUsers} />
        </div>
      </div>
    </>
  )
}

export default ChatLayout
