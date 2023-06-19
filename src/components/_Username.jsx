import { Fragment } from 'react'
import './Sign_In/Sign_In.css'
import './Sign_Up/Sign_Up.css'
function _Username({ usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
  usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle }) {


  //* ########################################################################################
  return (
    <Fragment>
      <label>
        <input style={usernameValue.length >= 1 && usernameTrue ? usernameInputStyle : null} value={usernameValue} className='form-control' type="text" placeholder='Username'
          onChange={e => setUsernameValue(e.target.value)}
          onKeyUp={() => {
            usernameChecker()
            setUsernameTrue(true)
          }}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          required />
        {usernameValue.length >= 1 && usernameFocus && validUsernameChecker === 'Valid Username' && <i style={{ color: 'green' }}>{validUsernameChecker}</i>}
        {usernameValue.length >= 1 && usernameFocus && validUsernameChecker === 'Invalid Username' && <i style={{ color: 'red' }}>{validUsernameChecker}</i>}
      </label>
    </Fragment>
  )
}

export default _Username