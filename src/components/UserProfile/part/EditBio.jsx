import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"

function EditBio({ changeProfile }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="bio"><Text>About</Text></label>
        <textarea
          placeholder='Write something about yourself...'
          rows='4'
          cols='50'
          type="text"
          id='bio'
          name='bio'
          disabled={!changeProfile}
        />
      </div>
    </Fragment>
  )
}

export default EditBio