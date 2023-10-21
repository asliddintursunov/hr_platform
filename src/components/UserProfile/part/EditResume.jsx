/* eslint-disable react/prop-types */
import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
function EditResume({ handleResumeChange, changeProfile }) {
    const fileName = localStorage.getItem('fileName')
    return (
        <Fragment>
            <div className={styles.EditImgComponentContainer}>
                <div className={styles.uploadResumeComponent}>
                    <input
                        className=""
                        type="file"
                        accept="application/pdf"
                        onChange={(file) => {
                            handleResumeChange(file)
                        }} disabled={!changeProfile}
                        style={{ color: 'transparent' }}
                    />
                    {fileName && <p>Selected file: {fileName}</p>}
                </div>
            </div>
        </Fragment>
    )
}

export default EditResume