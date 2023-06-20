import { Fragment } from "react"
import './Sign_In/Sign_In.css'
import './Sign_Up/Sign_Up.css'
function _Password({ passwordValue, setPasswordValue, validPasswordChecker,
  passwordTrue, setPasswordTrue,
  passwordType, setPasswordType, passwordChecker,
  passwordInputStyle }) {


  //* ########################################################################################
  return (
    <Fragment>
      <label style={{ position: 'relative' }}>
        <input style={passwordValue.length >= 1 && passwordTrue ? passwordInputStyle : null} value={passwordValue} className='form-control' type={passwordType ? "password" : "text"} placeholder='Password'
          onChange={e => setPasswordValue(e.target.value)}
          onKeyUp={() => {
            passwordChecker()
            setPasswordTrue(true)
          }}
          required />
        {/* ====== Password Type Changes ====== */}
        <div className='show-password' onClick={() => {
          passwordType ? setPasswordType(false) : setPasswordType(true)
        }}>
          {passwordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
        </div>
        {/* ==================================== */}

        {/* ====== Password Validation Starts ====== */}
        {passwordValue.length >= 1 && validPasswordChecker === 'Valid Password' && <i style={{ color: 'green' }}>{validPasswordChecker}</i>}
        {passwordValue.length >= 1 && validPasswordChecker === 'Invalid Password' && <i style={{ color: 'red' }}>{validPasswordChecker}</i>}
        {/* ==================================== */}
      </label>
    </Fragment>
  )
}

export default _Password