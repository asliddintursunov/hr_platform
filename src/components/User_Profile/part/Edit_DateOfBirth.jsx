import { Fragment } from "react"
import styles from '../../../css/EditProfile.module.css'
/* eslint-disable react/prop-types */
function Edit_DateOfBirth({ changeProfile, dateOfBirth, setDateOfBirth }) {
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
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default Edit_DateOfBirth