import { Fragment, useEffect, useState, useRef, useCallback } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import { io } from "socket.io-client"
import { baseUrl } from "../utils/api"
import axios from "axios"

function _ChatWebsocketPlace({ oneUserData, messages, setMessages, showUsers }) {
	const { defaultImage } = useURL()
	const [senderText, setSenderText] = useState("")
	const [socket, setSocket] = useState(null)
	const [scrollBottom, setScrollBottom] = useState(false)
	const chatContainerRef = useRef(null);
	const [smsSend, setSmsSend] = useState(false)

	const senderId = localStorage.getItem("userId")
	const receiverId = localStorage.getItem("receiverId")

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		const newSocket = io(baseUrl)
		setSocket(newSocket)

		return () => {
			if (newSocket) {
				newSocket.disconnect()
			}
		}
	}, [])

	useEffect(() => {
		if (socket) {
			socket.on("message", (data) => {
				setSmsSend(false)
				setMessages(data)
				scrollToBottom()
			})
		}
	}, [socket])
	useEffect(() => { scrollToBottom() }, [messages])

	const textSend = async () => {
		if (senderText.trim() !== "") {
			setSmsSend(true)
			setScrollBottom(true)
			const data = {
				message: senderText,
				sender_id: senderId,
				receiver_id: receiverId,
				profile_id: senderId,
			}
			socket.emit("message", data)
			setSenderText("")
		}
	}

	const readMsg = (id) => {
		// if (smsSend) {
		if (senderText == '' && senderId === Number(localStorage.getItem("userId"))) {
			axios
				.post(`${baseUrl}/chat/msg`, {
					msg_id: id,
					sender_id: senderId,
					receiver_id: receiverId,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
		// }
	};


	const conversationPathRef = useRef(null)
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const attributeValue = entry.target.getAttribute("value");
					console.log(attributeValue);
					if (attributeValue === "false") {
						console.log(entry.target.id);
						readMsg(entry.target.id)
					}
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 1,
		}
	);


	useEffect(() => {
		const getElements = async () => {
			await conversationPathRef.current.childNodes.forEach((sms) => {
				observer.observe(sms);
			});

			return () => {
				conversationPathRef.current.childNodes.forEach((sms) => {
					observer.unobserve(sms);
				});
			};
		}
		getElements()
	}, [conversationPathRef, messages, senderId, receiverId, readMsg, chatContainerRef]);



	return (
		<Fragment>
			<div className={styles.receiverHeader}>
				<span>{oneUserData.username}</span>
				<img src={oneUserData.profile_photo || defaultImage} alt={oneUserData.username} />
			</div>
			<div className={styles.conversationPath} ref={conversationPathRef} id="converationPath">
				{messages &&
					messages.map((message, index) => (
						<div key={index} id={message.msg_id} value={message.is_read}>
							{console.log(message)}
							{message.sender_id === Number(senderId) ? (
								<div style={sendingStyle}>
									<p style={{ ...messageStyle, backgroundColor: "green" }}>{message.message}</p>
									<i style={timeStyle}>{message.timestamp}</i>
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
	padding: "0.3rem 1rem 1rem 1rem",
	borderRadius: "4px",
	border: "none",
	minWidth: "10rem"
}

const timeStyle = {
	position: "absolute",
	bottom: "1rem",
	fontSize: "1rem",
	fontWeight: 400,
	color: "lightgray",
	padding: "0.3rem 0.7rem",
	fontWeight: 'bold'
}