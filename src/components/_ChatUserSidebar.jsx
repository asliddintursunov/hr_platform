import { useEffect, useState } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { baseUrl } from "../utils/api"
import { setUsersData, setUsersImage } from "../features/chatWebSocketPlaceSlicer"
import { logoutUser, sendHeaders } from "../features/userDataSlice"
import AnotherUser from "./modal/AnotherUser"

function ChatUserSidebar({ GetReceiverUsername, showUsers, setShowUsers }) {
	const { defaultImage } = useURL()
	const userid = localStorage.getItem("userId")

	const dispatch = useDispatch()
	const socketInstance = useSelector((state) => state.connection.socketInstance)
	const isConnected = useSelector((state) => state.connection.isConnected)
	const userData = useSelector((state) => state.usersData.usersData)
	const userImage = useSelector((state) => state.usersData.usersImage)
	const head = useSelector((state) => state.headers)

	const [wrongUser, setWrongUser] = useState(false)
	const [wrongUserData, setWrongUserData] = useState("")

	useEffect(() => {
		dispatch(sendHeaders())
		console.clear()
	}, [])

	useEffect(() => {
		if (userid && isConnected) {
			socketInstance.emit("count", {
				id: userid
			})

			return () => {
				socketInstance.off("count")
			}
		}
	}, [userid, isConnected])

	useEffect(() => {
		if (isConnected) {
			socketInstance.on("count", (data) => {
				dispatch(setUsersData(data))
			})
		}
	}, [isConnected])

	useEffect(() => {
		if (userid) {
			axios
				.get(`${baseUrl}/chat/${userid}`, {
					headers: head
				})
				.then((res) => {
					dispatch(setUsersImage(res.data))
				})
				.catch((err) => {
					if (err.response && err.response.status === 401) {
						setWrongUser(true)
						setWrongUserData(err.response.data)
						// alert(err.response.data);
						dispatch(logoutUser())
					}
				})
		}
	}, [userid, head])
	return (
		<>
			{wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
			<div className={styles.usersListContainer} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
				<div className={styles.usersShowHide} onClick={() => setShowUsers(!showUsers)}>
					<i className="bi bi-list"></i>
				</div>
				<h2 className="text-center" style={showUsers ? { color: "transparent", userSelect: "none" } : null}>
					Users List
				</h2>
				{userData.length === 0 && userImage.length === 0
					? null
					: userData.map((user, index) => {
						const userInfo = userImage[index]
						if (userInfo) {
							return (
								<div key={user.id} className={styles.userCard} onClick={() => GetReceiverUsername(userInfo.id, userInfo.username)}>
									{user.id === userInfo.id && <span className={styles.unreadMsg}>{user.unread_msg}</span>}
									<span>{userInfo.username}</span>
									<img src={userInfo.profile_photo !== null ? userInfo.profile_photo : defaultImage} alt={`Profile of ${userInfo.username}`} />
								</div>
							)
						}
						return null
					})}
			</div>
		</>
	)
}

export default ChatUserSidebar
