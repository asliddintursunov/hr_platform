import { Fragment } from "react"

/* eslint-disable react/prop-types */
function Edit_Email({ emailValue, setEmailValue, validEmailChecker,
  emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle, changeProfile }) {
  return (
    <Fragment>
      <div className='email-changer input-container'>
        <label htmlFor="email"><b>Email</b></label>
        <div>
          <i className="bi bi-envelope-at-fill"></i>
        </div>
        <input
          disabled={!changeProfile}
          className='form-control bg-light'
          style={emailValue.length >= 1 && emailTrue ? emailInputStyle : null}
          value={emailValue}
          type="email"
          placeholder='Email'
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

export default Edit_Email