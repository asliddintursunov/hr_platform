import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"
import * as Form from '@radix-ui/react-form'
/* eslint-disable react/prop-types */
function EditUserName({ usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
  usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle, changeProfile }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <label htmlFor="username"><Text>User Name</Text></label>
        <input
          disabled={!changeProfile}
          style={usernameValue.length >= 1 && usernameTrue ? usernameInputStyle : null}
          value={usernameValue}
          type="text" placeholder='User123'
          onChange={e => setUsernameValue(e.target.value)}
          onKeyUp={() => {
            usernameChecker()
            setUsernameTrue(true)
          }}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          id='username'
          name='username'
          required />
        {usernameValue.length >= 1 && usernameFocus && validUsernameChecker === 'Invalid Username' && <i style={{ color: 'red' }}>{validUsernameChecker}</i>}
      </div>
    </Fragment>
  )
}

export default EditUserName