import { useEffect } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { baseUrl } from "../utils/api"
import { setUsersData, setUsersImage } from "../features/chatWebSocketPlaceSlicer"


function _ChatUserSidebar({ GetReceiverUsername, showUsers, setShowUsers }) {
	const { defaultImage } = useURL()
	const userid = localStorage.getItem("userId")

	const dispatch = useDispatch()
	const isConnected = useSelector((state) => state.connection.isConnected)
	const socketInstance = useSelector((state) => state.connection.socketInstance)
	const userData = useSelector((state) => state.usersData.usersData)
	const userImage = useSelector((state) => state.usersData.usersImage)


	useEffect(() => {
		if (userid && isConnected) {
			socketInstance.emit("count", {
				id: userid
			})

			return () => {
				socketInstance.off("count")
			}
		}
	}, [])

	useEffect(
		() => {
			if (isConnected) {
				socketInstance.on("count", (data) => {
					dispatch(setUsersData(data))
					console.log(data)
				})
			}
		}, []
	)

	useEffect(() => {
		axios
			.get(`${baseUrl}/chat/${userid}`)
			.then((res) => {
				dispatch(setUsersImage(res.data))
			})
			.catch((err) => console.log(err))
	}, [userid])

	return (
		<div className={styles.usersListContainer}>
			<div className={styles.usersShowHide} onClick={() => setShowUsers(!showUsers)}>
				<i className="bi bi-list"></i>
			</div>
			<h2 className="text-center" style={showUsers ? { color: "transparent", userSelect: "none" } : null}>
				Users List
			</h2>
			{userData && userImage && userData.map((user, index) => {
				const userInfo = userImage[index];
				if (userInfo) {
					return (
						<div key={user.id} className={styles.userCard} onClick={() => GetReceiverUsername(userInfo.id, userInfo.username)}>
							{user.id == userImage[index].id && <span className={styles.unreadMsg}>{user.unread_msg}</span>}
							<span>{userInfo.username}</span>
							<img src={userInfo.profile_photo !== null ? userInfo.profile_photo : defaultImage} alt={`Profile of ${userInfo.username}`} />
						</div>
					);
				}
				return null;
			})}
		</div>
	)
}

export default _ChatUserSidebar
