import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"

function EditAddress({ changeProfile, address, setAddress }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="address"><Text>Address</Text></label>
        <input
          disabled={!changeProfile}
          type="text"
          id='address'
          name='address'
          placeholder='Manila, Philippines'
          value={address ? address : ''}
          onChange={e => setAddress(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default EditAddress