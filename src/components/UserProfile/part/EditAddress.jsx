import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'

function EditAddress({ changeProfile, address, setAddress }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="address"><b>Address</b></label>
        <input
          disabled={!changeProfile}
          className='form-control'
          type="text"
          id='address'
          name='address'
          placeholder='Address'
          value={address ? address : ''}
          onChange={e => setAddress(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default EditAddress