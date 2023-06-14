import { useState, Fragment } from 'react'
import './Sign_Up/Sign_Up.css'
function _Email() {

  // =========== Variables for Email Input ===========
  const [emailValue, setEmailValue] = useState('')
  const [validEmailChecker, setValidEmailChecker] = useState('')
  const [emailFocus, setEmailFocus] = useState(false)
  const [emailTrue, setEmailtrue] = useState(false)
  // =================================================

  // =========== Email Input Validation ===========
  const emailChecker = () => /^(?!.*\s)[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(emailValue) ? setValidEmailChecker('Valid Email') : setValidEmailChecker('Invalid Email')

  // ==============================================

  // =========== Email Input Style ===========
  const emailInputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: /^(?!.*\s)[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(emailValue) ? 'green' : 'red',
  }
  // ==========================================

  return (
    <Fragment>
      <label>
        <input style={emailValue.length >= 1 && emailTrue ? emailInputStyle : null} value={emailValue} className='form-control' type="email" placeholder='Email'
          onChange={e => setEmailValue(e.target.value)}
          onKeyUp={() => {
            emailChecker()
            setEmailtrue(true)
          }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          required />
        {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Valid Email' && <i style={{ color: 'green' }}>{validEmailChecker}</i>}
        {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Invalid Email' && <i style={{ color: 'red' }}>{validEmailChecker}</i>}
      </label>
    </Fragment>
  )
}

export default _Email