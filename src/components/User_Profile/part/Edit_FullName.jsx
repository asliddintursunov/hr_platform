import { Fragment } from "react"
import styles from '../../../css/EditProfile.module.css'
/* eslint-disable react/prop-types */
function Edit_FullName({ changeProfile, fullName, setFullName }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="fullname"><b>Full Name</b></label>
        <input
          disabled={!changeProfile}
          className='form-control'
          type='text'
          id='fullname'
          name='fullname'
          placeholder='Full Name'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default Edit_FullName