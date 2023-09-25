import { useEffect, useState } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import { useSelector } from "react-redux"


function _ChatUserSidebar({ GetReceiverUsername, showUsers, setShowUsers }) {

	const isConnected = useSelector((state) => state.connection.isConnected)
	const socketInstance = useSelector((state) => state.connection.socketInstance)

	const { defaultImage } = useURL()
	const [usersData, setUsersData] = useState([])

	const userid = localStorage.getItem("userId")

	useEffect(() => {
		if (userid && isConnected) {
			socketInstance.emit("count", {
				id: userid,
			})

			socketInstance.on("count", (data) => {
				setUsersData(data)
			})

			return () => {
				socketInstance.off("count")
			}
		}
	}, [])

	return (
		<div className={styles.usersListContainer}>
			<div className={styles.usersShowHide} onClick={() => setShowUsers(!showUsers)}>
				<i className="bi bi-list"></i>
			</div>
			<h2 className="text-center" style={showUsers ? { color: "transparent" } : null}>
				Users List
			</h2>
			{usersData &&
				usersData.map((user) => {
					return (
						<div key={user.id} className={styles.userCard} onClick={() => GetReceiverUsername(user.id, user.username)}>
							<span className={styles.unreadMsg}>{user.unread_msg}</span>
							<span>{user.username}</span>
							<img src={user.profile_photo !== null ? user.profile_photo : defaultImage} />
						</div>
					)
				})}
		</div>
	)
}

export default _ChatUserSidebar
