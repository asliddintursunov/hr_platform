import { useState } from 'react'
import styles from '../css/Chat.module.css'
import useURL from '../hooks/useURL'
import axios from 'axios'

function _ChatWebsocketPlace({ oneUserData, messages, setMessages }) {
	const { chatUrl, defaultImage, chatRoomUrl } = useURL()
	const [senderText, setSenderText] = useState('')

	const senderId = localStorage.getItem('userId')
	const receiverId = localStorage.getItem('receiverId')

	const textSend = async () => {

		if (senderText !== '') {
			await axios.post(chatUrl + '/' + senderId, {
				receiver_id: receiverId,
				message_text: senderText,
			})
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				})
			setSenderText('')

			await axios.get(chatRoomUrl + '?user_id1=' + senderId + '&' + 'user_id2=' + receiverId)
				.then((res) => {
					console.log(res.data);
					setMessages(res.data)
				})
				.catch((err) => {
					console.log(err);
				})
		}

	}
	return (
		<div className={styles.chatPlaceContainer}>
			<div className={styles.receiverHeader}>
				<span>{oneUserData.username}</span>
				<img src={oneUserData.profile_photo !== null ? oneUserData.profile_photo : defaultImage} />
			</div>
			<div className={`${styles.chatWrapper} container`}>
				<h1 className='display-3 text-center'>Enjoy your conversation</h1>
				<div className={styles.conversationPath}>
					{messages && messages.map((message) => {
						return (
							<div key={message.timestamp}>
								{message.sender_id === Number(senderId) ? (
									<p className='text-success'>{message.message_text}</p>
								) : message.sender_id === Number(receiverId) ? (
									<p className='text-primary'>{message.message_text}</p>
								) : null}
							</div>
						)
					})}
				</div>
				<form className={styles.chatInputPart} onSubmit={(e) => e.preventDefault()}>
					<input
						type='text'
						className='form-control'
						onChange={(e) => setSenderText(e.target.value)}
						value={senderText}
					/>
					<button type='submit' onClick={() => textSend()}>Send</button>
				</form>
			</div>
		</div>
	)
}

export default _ChatWebsocketPlace