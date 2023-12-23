import { useEffect, useState, useRef } from "react"
import styles from "../../styles/Chat.module.css"
import { Avatar } from "@radix-ui/themes"
import { EmptyMsgPlace } from "../../lottie/illustrations"

function _ChatWebsocketPlace({ oneUserData, messages, setMessages, firstUnreadMsgId, socketInstance, setFirstUnreadMsgId, setSidebarHeight, sidebarHeight }) {
  const conversationPathRef = useRef(null)
  // console.log(firstUnreadMsgId); // 107

  const [senderText, setSenderText] = useState("")
  const [scrollBottom, setScrollBottom] = useState(false)
  const chatContainerRef = useRef(null)
  const senderId = localStorage.getItem("userId")
  const receiverId = localStorage.getItem("receiverId")
  const [imgFallback, setImgFallback] = useState("")
  const scrollToUnreadElement = useRef(null)
  const [showNewMsgLine, setShowNewMsgLine] = useState(false)

  useEffect(() => {
    if (scrollToUnreadElement.current) {
      scrollToUnreadElement.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [firstUnreadMsgId])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (oneUserData.profile_photo === null) {
      setImgFallback(oneUserData.username.slice(0, 2).toUpperCase())
    }
  }, [oneUserData.username])

  useEffect(() => {
    socketInstance.on("new_message", (data) => {
      const id_rec = localStorage.getItem("receiverId")
      if (Number(id_rec) === data[0].sender_id || Number(id_rec) === data[0].receiver_id) {
        setMessages(data)
        scrollToBottom()
      }
    })
  }, [socketInstance])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const textSend = async () => {
    if (senderText.trim() !== "") {
      setFirstUnreadMsgId(-1)
      setShowNewMsgLine(false)
      setScrollBottom(true)
      const data = {
        message: senderText,
        sender_id: senderId,
        receiver_id: receiverId
      }
      socketInstance.emit("new_message", data)
      setSenderText("")

      socketInstance.emit("count", {
        id: receiverId
      })
    }
  }

  const handleSeeMessage = () => {
    socketInstance.on("see_message", (data) => {
      const id_rec = localStorage.getItem("receiverId")
      if (Number(id_rec) === data[0].sender_id || Number(id_rec) === data[0].receiver_id) {
        setMessages(data)
      }
    })
    return () => socketInstance.off("see_message")
  }

  useEffect(() => {
    handleSeeMessage()
  }, [handleSeeMessage])

  const readMsg = (id) => {
    if (senderText === "" && Number(senderId) === Number(localStorage.getItem("userId"))) {
      messages.map((message) => {
        if (~~id === message.msg_id && message.is_read === false && message.receiver_id === ~~senderId) {
          const data = {
            msg_id: id,
            sender_id: receiverId,
            receiver_id: senderId
          }
          if (showNewMsgLine === false) {
            setShowNewMsgLine(true)
          }
          socketInstance.emit("see_message", data)
          handleSeeMessage()

          socketInstance.emit("count", {
            id: senderId
          })
        }
      })
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const attributeValue = entry.target.getAttribute("value")

          if (attributeValue === "false") {
            readMsg(entry.target.id)
          }
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 1
    }
  )

  useEffect(() => {
    onresize = () => {
      setSidebarHeight(conversationPathRef.current.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const getElements = async () => {
      await conversationPathRef.current.childNodes.forEach((sms) => {
        observer.observe(sms)
      })

      return () => {
        conversationPathRef.current.childNodes.forEach((sms) => {
          observer.unobserve(sms)
        })
      }
    }
    getElements()
  }, [conversationPathRef, messages])

  return (
    <>
      <div className={styles.receiverHeader}>
        <span>{oneUserData.username}</span>
        <Avatar src={oneUserData.profile_photo} radius="full" fallback={imgFallback} style={{
          backgroundColor: "#ccc",
        }} />
      </div>
      <div
        className={styles.conversationPath}
        ref={conversationPathRef}
        style={{
          height: "calc(100vh - 15rem)",
          overflowY: "scroll",
          overflowX: "hidden",
          // background: "var(--accent-6)"
          background: "#F5F5F5"
        }}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              ref={index === firstUnreadMsgId ? scrollToUnreadElement : null}
              id={message.msg_id}
              value={message.is_read}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.sender_id === Number(senderId) ? "flex-end" : "flex-start"
              }}
            >
              {message.sender_id === Number(senderId) && message.receiver_id === Number(receiverId) ? (
                <div style={sendingStyle}>
                  <p style={{ ...messageStyle, backgroundColor: "#2196F3", border: "1px solid #2196F3 " }}>{message.message}</p>
                  <i style={{...timeStyle, color: '#fff'}}>{message.timestamp}</i>
                  {!message.is_read ? <i className="bi bi-check2" style={tickStyle}></i> : <i className="bi bi-check2-all" style={tickStyle}></i>}
                </div>
              ) : message.sender_id === Number(receiverId) ? (
                <>
                  {index === firstUnreadMsgId && showNewMsgLine && (
                    <div className={styles.unreadMessageLine}>
                      <p>New messages</p>
                    </div>
                  )}
                  <div style={receivingStyle}>
                    <p style={{ ...messageStyle, backgroundColor: "#E0E0E0 ", border: "1px solid #ccc " }}>{message.message}</p>
                    <i style={{...timeStyle, color: '#333'}}>{message.timestamp}</i>
                  </div>
                </>
              ) : null}
            </div>
          ))
        ) : (
          <div>
            <EmptyMsgPlace />
            <h1 className="text-center display-3">Write Something</h1>
          </div>
        )}
        {scrollBottom && <div ref={chatContainerRef}></div>}
      </div>

      <form className={styles.chatInputPart} onSubmit={(e) => e.preventDefault()}>
        <input type="text" className="form-control" onChange={(e) => setSenderText(e.target.value)} value={senderText} />
        <button
          type="submit"
          onClick={() => textSend()}
          style={{
            backgroundColor: "royalblue",
            color: "#fff",
            border: "none",
            paddingLeft: "1.6rem",
            paddingRight: "1.6rem",
            fontWeight: "bold",
            borderRadius: "4px"
          }}
        >
          Send
        </button>
      </form>
    </>
  )
}

export default _ChatWebsocketPlace

const sendingStyle = {
  padding: "0.3rem 1.6rem",
  color: "#FFFFFF",
  fontWeight: "bold",
  textAlign: "right",
  display: "flex",
  justifyContent: "end",
  position: "relative",
  wordWrap: "break-word",
  maxWidth: "125rem",
  width: "100%"
}

const receivingStyle = {
  padding: "0.3rem 1.6rem",
  color: "#000000 ",
  fontWeight: "bold",
  textAlign: "left",
  display: "flex",
  justifyContent: "start",
  position: "relative",
  marginRight: "10rem",
  wordWrap: "break-word",
  maxWidth: "125rem"
}

const messageStyle = {
  padding: "0.3rem 1rem 2.5rem 1rem",
  borderRadius: "4px",
  border: "none",
  minWidth: "11rem"
}

const timeStyle = {
  position: "absolute",
  bottom: "2rem",
  fontSize: "1rem",
  // color: "lightgray",
  padding: "0.3rem 0.7rem",
  fontWeight: "bold"
}

const tickStyle = {
  position: "absolute",
  bottom: ".7rem",
  marginRight: "0.3rem"
}
