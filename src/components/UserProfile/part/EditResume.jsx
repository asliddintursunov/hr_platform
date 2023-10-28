/* eslint-disable react/prop-types */
import { Button, HoverCard } from "@radix-ui/themes"
import styles from "../../../styles/EditProfile.module.css"
import { UploadIcon } from "@radix-ui/react-icons"

function EditResume({ handleResumeChange, changeProfile }) {
	const fileName = localStorage.getItem("fileName")
	return (
		<div className={styles.EditImgComponentContainer}>
			<div className={styles.uploadResumeComponent}>
				<input
					type="file"
					accept="application/pdf"
					onChange={(file) => {
						handleResumeChange(file)
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
		</div>
	)
}

export default EditResume
