import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"

function EditDateOfBirth({ changeProfile, dateOfBirth, setDateOfBirth }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="dateofbirth"><Text className='underlined-label'>Date of Bitrh</Text></label>
        <input
          disabled={!changeProfile}
          type="date"
          name="dateofbirth"
          id="dateofbirth"
          value={dateOfBirth ? dateOfBirth : ''}
          onChange={e => setDateOfBirth(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default EditDateOfBirth