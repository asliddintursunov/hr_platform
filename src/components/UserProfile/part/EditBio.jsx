import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"

function EditBio({ changeProfile, bio, setBio }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="bio"><Text className='underlined-label'>About</Text></label>
        <textarea
          placeholder='Write something about yourself...'
          rows='4'
          cols='50'
          type="text"
          id='bio'
          name='bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!changeProfile}
        />
      </div>
    </Fragment>
  )
}

export default EditBio