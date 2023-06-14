import { Fragment, useState } from 'react'
import passwordValue from './_Password'
import './Sign_Up/Sign_Up.css'
function _ConfirmPassword() {
  //* ########################################################################################

  // =========== Variables for Password Match Input ===========
  const [passwordMatchValue, setPasswordMatchValue] = useState('')
  const [validPasswordMatchChecker, setValidPasswordMatchChecker] = useState('')
  const [passwordMatchTrue, setPasswordMatchTrue] = useState(false)
  const [passwordCheckType, setPasswordCheckType] = useState(true)
  // ==========================================================

  // =========== Password Match Input Validation ===========
  const passwordMatchChecker = () => passwordMatchValue === passwordValue ? setValidPasswordMatchChecker('Password Matches') : setValidPasswordMatchChecker('Password does not Match')

  // =======================================================

  // =========== Password Match Input Style ===========
  const passwordInputMatchStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: passwordMatchValue === passwordValue ? 'green' : 'red',
  }
  // ==================================================


  //* ########################################################################################
  return (
    <Fragment>
      <label style={{ position: 'relative' }}>
        <input style={passwordMatchValue.length >= 1 && passwordMatchTrue ? passwordInputMatchStyle : null} value={passwordMatchValue} className='form-control' type={passwordCheckType ? "password" : "text"} placeholder='Confirm Password'
          onChange={e => setPasswordMatchValue(e.target.value)}
          onKeyUp={() => {
            passwordMatchChecker()
            setPasswordMatchTrue(true)
          }}
          required />
        {/* ====== Password Checker Type Changes ======= */}
        <div className='show-password' onClick={() => {
          passwordCheckType ? setPasswordCheckType(false) : setPasswordCheckType(true)
        }}>
          {passwordCheckType && <i className="bi bi-eye-fill"></i>}
          {!passwordCheckType && <i className="bi bi-eye-slash-fill"></i>}
        </div>
        {/* ======================== */}

        {/* ====== Password Chekcer Validation Starts ====== */}
        {passwordMatchValue.length >= 1 && validPasswordMatchChecker === 'Password Matches' && <i style={{ color: 'green' }}>{validPasswordMatchChecker}</i>}
        {passwordMatchValue.length >= 1 && validPasswordMatchChecker === 'Password does not Match' && <i style={{ color: 'red' }}>{validPasswordMatchChecker}</i>}
        {/* ==================================== */}
      </label>
    </Fragment>
  )
}

export default _ConfirmPassword