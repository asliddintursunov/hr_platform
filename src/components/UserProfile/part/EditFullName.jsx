import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"

function EditFullName({ changeProfile, fullName, setFullName }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="fullname"><Text>Full Name</Text></label>
        <input
          disabled={!changeProfile}
          type='text'
          id='fullname'
          name='fullname'
          placeholder='John Smith'
          value={fullName ? fullName : ''}
          onChange={e => setFullName(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default EditFullName