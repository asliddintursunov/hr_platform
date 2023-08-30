import { useState } from 'react'
import _ChatUserSidebar from '../components/_ChatUserSidebar'
import _ChatWebsocketPlace from '../components/_ChatWebsocketPlace'
import styles from '../css/Chat.module.css'
import useURL from '../hooks/useURL'
import axios from 'axios'
function ChatLayout() {
	const { chatUrl, chatRoomUrl } = useURL()
	const [chatSelected, setChatSelected] = useState(false)
	const [oneUserData, setOneUserData] = useState({})
	const [messages, setMessages] = useState([])

	const GetReceiverUsername = async (id, username) => {
		localStorage.setItem('receiverId', id)
		localStorage.setItem('receiverUsername', username)

		const senderId = localStorage.getItem('userId')

		setChatSelected(true)

		await axios.post(chatUrl + '/' + id, {
			username: username
		})
			.then((res) => {
				setOneUserData(res.data)
			})
			.catch(err => console.log(err))

		await axios.get(chatRoomUrl + '?user_id1=' + senderId + '&' + 'user_id2=' + id)
			.then((res) => {
				console.log(res.data);
				setMessages(res.data)
			})
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<div className={`${styles.chatLayoutContainer} pageAnimation`}>
			<div className={styles.chatPlace}>
				{chatSelected && <_ChatWebsocketPlace oneUserData={oneUserData} messages={messages} setMessages={setMessages} />}
				{!chatSelected && <h1 className='display-2'>Select A Chat to have a conversation!</h1>}
			</div>
			<div className={styles.usersSidebar}>
				<_ChatUserSidebar GetReceiverUsername={GetReceiverUsername} />
			</div>
		</div>
	)
}

export default ChatLayout