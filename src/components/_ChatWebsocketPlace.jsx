import { Fragment, useEffect, useState, useRef } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import { useSelector } from "react-redux"

function _ChatWebsocketPlace({ oneUserData, messages, setMessages, showUsers }) {
	const socketInstance = useSelector((state) => state.connection.socketInstance)

	const { defaultImage } = useURL()
	const [senderText, setSenderText] = useState("")
	const [scrollBottom, setScrollBottom] = useState(false)
	const chatContainerRef = useRef(null)

	const senderId = localStorage.getItem("userId")
	const receiverId = localStorage.getItem("receiverId")

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}

	useEffect(() => {
		socketInstance.on("new_message", (data) => {
			console.log(data);
			setMessages(data)
			scrollToBottom()
		})
	}, [])

	useEffect(() => {
		socketInstance.on("see_message", (data) => {
			console.log(data);
			setMessages(data)
			scrollToBottom()
		})
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const textSend = async () => {
		if (senderText.trim() !== "") {
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

	const readMsg = (id) => {
		if (senderText === "" && Number(senderId) === Number(localStorage.getItem("userId"))) {
			messages.map((message) => {
				if (message.is_read === false && message.sender_id !== Number(senderId)) {
					console.log(id)
					const data = {
						msg_id: id,
						sender_id: receiverId,
						receiver_id: senderId
					}
					socketInstance.emit("see_message", data)

					socketInstance.emit("count", {
						id: senderId
					})
				}
			})
		}
	}

	const conversationPathRef = useRef(null)
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
	}, [conversationPathRef])

	return (
		<Fragment>
			<div className={styles.receiverHeader}>
				<span>{oneUserData.username}</span>
				<img src={oneUserData.profile_photo || defaultImage} alt={oneUserData.username} />
			</div>
			<div className={styles.conversationPath} ref={conversationPathRef}>
				{messages &&
					messages.map((message, index) => (
						<div key={index} id={message.msg_id} value={message.is_read}>
							{message.sender_id === Number(senderId) ? (
								<div style={sendingStyle}>
									<p style={{ ...messageStyle, backgroundColor: "green" }}>{message.message}</p>
									<i style={timeStyle}>{message.timestamp}</i>
									{!message.is_read ? <i className="bi bi-check2" style={tickStyle}></i> : <i className="bi bi-check2-all" style={tickStyle}></i>}
								</div>
							) : message.sender_id === Number(receiverId) ? (
								<div style={receivingStyle}>
									<p style={{ ...messageStyle, backgroundColor: "royalblue" }}>{message.message}</p>
									<i style={timeStyle}>{message.timestamp}</i>
								</div>
							) : null}
						</div>
					))}
				{scrollBottom && <div ref={chatContainerRef}></div>}
			</div>

			<form className={styles.chatInputPart} onSubmit={(e) => e.preventDefault()} style={showUsers ? { right: "11.9rem" } : null}>
				<input type="text" className="form-control" onChange={(e) => setSenderText(e.target.value)} value={senderText} />
				<button type="submit" onClick={() => textSend()}>
					Send
				</button>
			</form>
		</Fragment>
	)
}

export default _ChatWebsocketPlace

const sendingStyle = {
	padding: "0.3rem 1.6rem",
	color: "#fff",
	fontWeight: "bold",
	textAlign: "right",
	display: "flex",
	justifyContent: "end",
	position: "relative",
	marginLeft: "10rem"
}

const receivingStyle = {
	padding: "0.3rem 1.6rem",
	color: "#fff",
	fontWeight: "bold",
	textAlign: "left",
	display: "flex",
	justifyContent: "start",
	position: "relative",
	marginRight: "10rem"
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
	color: "lightgray",
	padding: "0.3rem 0.7rem",
	fontWeight: "bold"
}

const tickStyle = {
	color: "lightgray",
	position: "absolute",
	bottom: ".7rem",
	marginRight: "0.3rem"
}
