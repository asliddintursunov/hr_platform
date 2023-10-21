import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'

function EditDateOfBirth({ changeProfile, dateOfBirth, setDateOfBirth }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="dateofbirth"><b>Date of Bitrh</b></label>
        <input
          className='form-control'
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