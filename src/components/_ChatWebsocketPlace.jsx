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
				setMessages(data)
				scrollToBottom()
			})
		}
	}, [socket])
	useEffect(() => { scrollToBottom() }, [messages])

	const textSend = async () => {
		if (senderText.trim() !== "") {
			setScrollBottom(true)
			const data = {
				message: senderText,
				sender_id: senderId,
				receiver_id: receiverId
			}
			socket.emit("message", data)
			setSenderText("")
		}
	}

	// ========== TEST =============
	const messageRef = useRef();

	const readMsg = (id) => {
		console.log(id);
		axios
			.post(`${baseUrl}/chat/msg`, {
				msg_id: id,
				is_read: true,
				sender_id: senderId,
				receiver_id: receiverId,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	// Create a state variable to track the ID of the first received but unread message
	const [firstUnreadMessageId, setFirstUnreadMessageId] = useState(null);

	useEffect(() => {
		const handleIntersection = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const unreadMessage = messages.find(
						(msg) => msg.msg_id === Number(entry.target.id) && !msg.is_read
					);
					const unreadMessages = messages.filter(
						(msg) => msg.receiver_id === Number(senderId) && !msg.is_read
					)
					console.log(unreadMessages);

					if (unreadMessage) {
						// Send the ID of the first unread message to the backend
						readMsg(unreadMessage.msg_id);
						// Set the ID of the first unread message in state
						setFirstUnreadMessageId(unreadMessage.msg_id);
					}

					observer.unobserve(entry.target);
				}
			});
		};

		const currentRef = messageRef.current;

		if (currentRef) {
			const observer = new IntersectionObserver(handleIntersection);

			observer.observe(currentRef);

			return () => {
				observer.unobserve(currentRef);
			};
		}
	}, [messageRef, messages, readMsg]);

	const handleScroll = () => {
		// Your code to handle scrolling goes here

		// Check if the firstUnreadMessageId is set and not null
		if (firstUnreadMessageId !== null) {
			console.log('First unread message ID in view:', firstUnreadMessageId);
			// Optionally, you can reset firstUnreadMessageId to null here
			// if you want to only log it once when it appears on screen
			// setFirstUnreadMessageId(null);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [firstUnreadMessageId]);




	return (
		<Fragment>
			<div className={styles.receiverHeader}>
				<span>{oneUserData.username}</span>
				<img src={oneUserData.profile_photo || defaultImage} alt={oneUserData.username} />
			</div>
			{/* <div className={styles.conversationPath} ref={messageRef}>
				{messages &&
					messages.map((message, index) => (
						<div key={index} >
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
			</div> */}
			<div className={styles.conversationPath}>
				{messages &&
					messages.map((message, index) => (
						<div key={index} ref={messageRef} id={message.msg_id}>
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