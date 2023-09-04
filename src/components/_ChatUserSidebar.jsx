import { useEffect, useState } from "react"
import styles from "../css/Chat.module.css"
import useURL from "../hooks/useURL"
import axios from "axios"
import { baseUrl } from "../utils/api"
function _ChatUserSidebar({ GetReceiverUsername, showUsers, setShowUsers }) {
	const { defaultImage } = useURL()
	const [usersData, setUsersData] = useState([])

	const userid = localStorage.getItem("userId")

	useEffect(() => {
		axios
			.get(`${baseUrl}/chat/${userid}`)
			.then((res) => {
				setUsersData(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div className={styles.usersListContainer} >
			<div className={styles.usersShowHide} onClick={() => setShowUsers(!showUsers)}>
				<i className="bi bi-list"></i>
			</div>
			<h2 className="text-center" style={showUsers ? { color: 'transparent' } : null}>Users List</h2>
			{usersData &&
				usersData.map((user) => {
					return (
						<div key={user.id} className={styles.userCard} onClick={() => GetReceiverUsername(user.id, user.username)}>
							<span>{user.username}</span>
							<img src={user.profile_photo !== null ? user.profile_photo : defaultImage} />
						</div>
					)
				})}
		</div>
	)
}

export default _ChatUserSidebar
