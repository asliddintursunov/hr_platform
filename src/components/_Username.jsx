import { Fragment, useState, useEffect, useCallback } from "react"
import './Sign_In/Sign_In.css'
import './Sign_Up/Sign_Up.css'
function _Username() {

  // =========== Variables for Username Input ===========
  const [usernameValue, setUsernameValue] = useState('')
  const [emptyCharacter, setEmptyCharacter] = useState([])
  const [validUsernameChecker, setValidUsernameChecker] = useState('')
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [usernameTrue, setUsernameTrue] = useState(false)
  // ====================================================

  // =========== Username Input Validation ===========
  const usernameValidation = useCallback(() => {
    if (/[^a-zA-Z0-9]/.test(usernameValue)) {
      setEmptyCharacter(prev => [...prev, false])
    } else if (!/[^a-zA-Z0-9]/.test(usernameValue)) {
      setEmptyCharacter([])
    }
  }, [usernameValue])

  useEffect(() => {
    usernameValidation()
  }, [usernameValidation])
  const usernameChecker = () => !/^[0-9]/.test(usernameValue.split('')[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1 ? setValidUsernameChecker('Valid Username') : setValidUsernameChecker('Invalid Username')
  // =================================================

  // =========== Username Input Style ===========
  const usernameInputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: !/^[0-9]/.test(usernameValue.split('')[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1 ? 'green' : 'red',
  }
  // ============================================


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