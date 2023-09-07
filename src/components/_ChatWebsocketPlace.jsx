import { Fragment, useState } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import axios from "axios"
import { baseUrl } from "../utils/api"
import { io } from "socket.io-client"

function _ChatWebsocketPlace({ oneUserData, messages, setMessages, showUsers }) {
	const socket = io(baseUrl)

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

	const sender_P = {
		padding: "0.3rem 1.6rem 1rem 1.6rem",
		backgroundColor: "green",
		borderRadius: "4px",
		border: "none",
		minWidth: "10rem"
	}

	const receiver_P = {
		padding: "0.3rem 1.6rem 1rem 1.6rem",
		backgroundColor: "royalblue",
		borderRadius: "4px",
		border: "none",
		minWidth: "10rem"
	}

	const sender_Time = {
		position: "absolute",
		bottom: "1rem",
		fontSize: "1rem",
		fontWeight: 400,
		color: "lightgray",
		right: "2rem",
		padding: "0.3rem 0"
	}

	const receiver_Time = {
		position: "absolute",
		bottom: "1rem",
		fontSize: "1rem",
		fontWeight: 400,
		color: "lightgray",
		left: "2rem",
		padding: "0.3rem 0"
	}

	const { defaultImage } = useURL()
	const [senderText, setSenderText] = useState("")

	const senderId = localStorage.getItem("userId")
	const receiverId = localStorage.getItem("receiverId")

	socket.on("connected", (data) => {
		// console.log(data)
	})

	socket.on("message", (data) => {
		console.log(data);
		setMessages(data)
	})

	const textSend = async () => {
		if (senderText.trim() !== "") {
			const data = {
				message: senderText,
				sender_id: senderId,
				receiver_id: receiverId
			}
			socket.emit("message", data)
			setSenderText("")
		}
	}

	return (
		<Fragment>
			<div className={styles.receiverHeader}>
				<span>{oneUserData.username}</span>
				<img src={oneUserData.profile_photo !== null ? oneUserData.profile_photo : defaultImage} />
			</div>
			<div className={styles.conversationPath}>
				{messages &&
					messages.map((message) => {
						return (
							<div key={message.timestamp}>
								{message.sender_id === Number(senderId) ? (
									<div style={message.sender_id === Number(senderId) && sendingStyle}>
										<p style={sender_P}>{message.message}</p>
										<i style={sender_Time}>
											&#40;{new Date(message.timestamp).getFullYear()}&#45;
											{String(new Date(message.timestamp).getMonth() + 1).padStart(2, "0")}&#45;
											{String(new Date(message.timestamp).getDate()).padStart(2, "0")}&#41; &#160;
											{String(new Date(message.timestamp).getUTCHours()).padStart(2, "0")}&#58;
											{String(new Date(message.timestamp).getUTCMinutes()).padStart(2, "0")}
										</i>
									</div>
								) : message.sender_id === Number(receiverId) ? (
									<div style={message.sender_id === Number(receiverId) && receivingStyle}>
										<p style={receiver_P}>{message.message}</p>
										<i style={receiver_Time}>
											&#40;{new Date(message.timestamp).getFullYear()}&#45;
											{String(new Date(message.timestamp).getMonth() + 1).padStart(2, "0")}&#45;
											{String(new Date(message.timestamp).getDate()).padStart(2, "0")}&#41; &#160;
											{String(new Date(message.timestamp).getUTCHours()).padStart(2, "0")}&#58;
											{String(new Date(message.timestamp).getUTCMinutes()).padStart(2, "0")}
										</i>
									</div>
								) : null}
							</div>
						)
					})}
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
