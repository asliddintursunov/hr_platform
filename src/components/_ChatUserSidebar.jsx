import { useEffect, useState } from 'react'
import styles from '../css/Chat.module.css'
import useURL from '../hooks/useURL'
import axios from 'axios'
function _ChatUserSidebar({ GetReceiverUsername }) {
	const { chatUrl, defaultImage } = useURL()
	const [usersData, setUsersData] = useState([])

	useEffect(() => {
		axios.get(chatUrl + '/' + localStorage.getItem('userId'))
			.then((res) => {
				setUsersData(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
	}, [chatUrl]);



	return (
		<div className={styles.usersListContainer}>
			<h1 className='text-center'>Users List</h1>
			{usersData && usersData.map((user) => {
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