import { Fragment } from "react"
import styles from '../../../styles/EditProfile.module.css'

function EditPassword({ passwordValue, setPasswordValue, validPasswordChecker,
  passwordTrue, setPasswordTrue,
  passwordType, setPasswordType, passwordChecker, changeProfile,
  passwordInputStyle }) {
  return (
    <Fragment>
      <div className={`${styles.passwordChanger} ${styles.inputContainer}`}>
        <label htmlFor="password"><b>Password</b></label>
        <div onClick={() => {
          passwordType ? setPasswordType(false) : setPasswordType(true)
        }}>
          {passwordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
        </div>
        <input
          disabled={!changeProfile}
          className='form-control'
          style={passwordValue.length >= 1 && passwordTrue ? passwordInputStyle : null}
          value={passwordValue}
          type={passwordType ? "password" : "text"}
          placeholder='Password'
          onChange={e => setPasswordValue(e.target.value)}
          onKeyUp={() => {
            passwordChecker()
            setPasswordTrue(true)
          }}
          id="password"
          name='password'
          required

        />
        {passwordValue.length >= 1 && validPasswordChecker === 'Valid Password' && <i style={{ color: 'green' }}>{validPasswordChecker}</i>}
        {passwordValue.length >= 1 && validPasswordChecker === 'Invalid Password' && <i style={{ color: 'red' }}>{validPasswordChecker}</i>}
      </div>
    </Fragment>
  )
}

export default EditPassword