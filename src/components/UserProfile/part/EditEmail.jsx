import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'
import { Text } from "@radix-ui/themes"

function EditEmail({ emailValue, setEmailValue, validEmailChecker,
  emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle, changeProfile }) {
  return (
    <Fragment>
      <div className={`${styles.emailChanger} ${styles.inputContainer}`}>
        <label htmlFor="email"><Text className='underlined-label'>Email</Text></label>
        <input
          disabled={!changeProfile}
          style={emailValue.length >= 1 && emailTrue ? emailInputStyle : null}
          value={emailValue}
          type="email"
          placeholder='user@example.com'
          onChange={e => setEmailValue(e.target.value)}
          onKeyUp={() => {
            emailChecker()
            setEmailtrue(true)
          }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          id='email'
          name='email'
          required />
        {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Valid Email' && <i style={{ color: 'green' }}>{validEmailChecker}</i>}
        {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Invalid Email' && <i style={{ color: 'red' }}>{validEmailChecker}</i>}
      </div>
    </Fragment>
  )
}

export default EditEmail