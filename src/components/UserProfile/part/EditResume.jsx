/* eslint-disable react/prop-types */
import { Button } from "@radix-ui/themes"
import styles from "../../../styles/EditProfile.module.css"
import { UploadIcon } from "@radix-ui/react-icons"
import { useCallback, useRef, useState } from "react"

function EditResume({ handleResumeChange, changeProfile }) {

	const [percentage, setPercentage] = useState(0)
	const full = useRef(null)
	const value = useRef(0)
	const [isOnProgress, setIsOnProgress] = useState(false)
	const [isDone, setIsDone] = useState(false)

	const progressBar = useCallback(() => {
		let progress = setInterval(() => {
			setIsOnProgress(true)
			full.current = Math.floor(Math.random() * 10 + 1)

			value.current += full.current

			if (value.current >= 100) {
				value.current = 100
				setPercentage(value.current)
				clearInterval(progress)
				setIsDone(true)
				setTimeout(() => {
					setIsDone(false),
						setIsOnProgress(false)
				}, 1500)
				console.log("Progress Done!")
			} else {
				setPercentage(value.current)
			}
		}, 100)

		return () => {
			if (value.current) {
				clearInterval(progress)
				value.current = null
			}
		}
	}, [])

	const fileName = localStorage.getItem("fileName")
	return (
		<div className={styles.EditImgComponentContainer}>
			<div className={styles.uploadResumeComponent}>
				<input
					type="file"
					accept="application/pdf"
					onChange={(file) => {
						handleResumeChange(file)
						full.current = null
						value.current = 0
						setIsOnProgress(false)
						setPercentage(0)
						setTimeout(() => {
							progressBar()
						}, 100)
					}}
					disabled={!changeProfile}
					style={{ color: "transparent" }}
				/>
				<Button type="button" disabled={!changeProfile}>
					<UploadIcon />
					Upload Resume
				</Button>

				{/* {fileName && <p>Selected file: {fileName}</p>} */}
			</div>
			<div
				style={{
					backgroundColor: '#eee',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: '5px auto',
					width: '50%'
				}}
			>
				{isOnProgress && (
					<div className="p-bar-container">
						<div className="p-bar" style={{ width: percentage + "%" }}></div>
					</div>
				)}
				{isDone && (
					<span>Done😀</span>
				)}
			</div>
		</div>
	)
}

export default EditResume
