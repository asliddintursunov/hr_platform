import { useEffect, useState } from "react"
import _ChatUserSidebar from "../components/_ChatUserSidebar"
import _ChatWebsocketPlace from "../components/_ChatWebsocketPlace"
import styles from "../css/Chat.module.css"
import axios from "axios"
import { baseUrl } from "../utils/api"

function ChatLayout() {
  const [chatSelected, setChatSelected] = useState(false)
  const [oneUserData, setOneUserData] = useState({})
  const [messages, setMessages] = useState([])

  const [showUsers, setShowUsers] = useState(false)
  const usersSideBarStyle = {
    transform: 'translateX(78%)',
    flex: 0.5,
  }

  const GetReceiverUsername = async (id, username) => {
    localStorage.setItem("receiverId", id)
    localStorage.setItem("receiverUsername", username)

    const senderId = localStorage.getItem("userId")

    setChatSelected(true)

    await axios
      .get(`${baseUrl}/chat/room`, { params: { user_id1: senderId, user_id2: id } })
      .then((res) => {
        setMessages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className={`${styles.chatLayoutContainer} pageAnimation`}>
      <div className={styles.chatPlace}>
        {chatSelected && <_ChatWebsocketPlace oneUserData={oneUserData} messages={messages} setMessages={setMessages} showUsers={showUsers} />}
        {!chatSelected && <h1 className="display-2 text-center">Select A Chat to have a conversation!</h1>}
      </div>
      <div className={styles.usersSidebar} style={showUsers ? usersSideBarStyle : null}>
        <_ChatUserSidebar GetReceiverUsername={GetReceiverUsername} showUsers={showUsers} setShowUsers={setShowUsers} />
      </div>
    </div>
  )
}

export default ChatLayout
