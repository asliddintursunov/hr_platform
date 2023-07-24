import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

// Css
import '../Sign_Up.css'

// Components
import _Username from '../../_Username'
import _Email from '../../_Email'
import _ConfirmPassword from '../../_ConfirmPassword'
import _PopUp from '../../_PopUp'

// Custom Hooks
import { useUsername } from '../../../hooks/useUsername'
import { useEmail } from '../../../hooks/useEmail'
import { useConfirmPassword } from '../../../hooks/useConfirmPassword'

function Sign_Up_Form() {

  // const URL = 'http://localhost:3000/users'
  const URL = 'http://192.168.3.140:1000/register'
  
  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  // Custom Hook Values
  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
    usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()

  const { emailValue, setEmailValue, validEmailChecker,
    emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle } = useEmail()

  const { passwordValue, setPasswordValue, validPasswordChecker,
    passwordTrue, setPasswordTrue, passwordType, setPasswordType,
    passwordChecker, passwordInputStyle, passwordMatchValue, setPasswordMatchValue,
    validPasswordMatchChecker,
    passwordMatchTrue, setPasswordMatchTrue, passwordCheckType, setPasswordCheckType,
    passwordMatchChecker, passwordInputMatchStyle } = useConfirmPassword()

    // Redirecting uset to another page
    const navigate = useNavigate()

  const addNewUser = () => {
    if (passwordValue == passwordMatchValue) {
      axios.post(URL, {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        confirm_password: passwordMatchValue,
      })
        .then((req) => {
          setIsOpen(true)

          setPopupInfo(req.data)
          setErrorOccured(false)
          setTimeout(() => {
            navigate('/signin')
          }, 1500);

          setUsernameValue('')
          setEmailValue('')
          setPasswordValue('')
          setPasswordMatchValue('')
        })
        .catch((err) => {
          setIsOpen(true)

          setErrorOccured(true)
          console.log(err);
          if (typeof err.response.data !== 'object') {
            setPopupInfo(err.response.data)
          } else {
            setPopupInfo(err.response.data.error)
          }
        })
    } else {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo('Password does not match!')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewUser()
  }

  return (
    <div className='sign-up-form-container'>
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <form onSubmit={handleSubmit} className='form-control sign-up-form'>
        <div>
          <h2><i className="bi bi-lock lock"></i></h2>
          <h2>Sign Up</h2>
        </div>
        <hr style={{ width: '100%' }} />
        <br />
        <div className='input-container'>
          <_Username usernameValue={usernameValue} setUsernameValue={setUsernameValue} validUsernameChecker={validUsernameChecker}
            usernameFocus={usernameFocus} setUsernameFocus={setUsernameFocus} usernameTrue={usernameTrue} setUsernameTrue={setUsernameTrue}
            usernameChecker={usernameChecker} usernameInputStyle={usernameInputStyle} />
          <_Email emailValue={emailValue} setEmailValue={setEmailValue} validEmailChecker={validEmailChecker} emailFocus={emailFocus}
            setEmailFocus={setEmailFocus} emailTrue={emailTrue} setEmailtrue={setEmailtrue} emailChecker={emailChecker} emailInputStyle={emailInputStyle} />
          <_ConfirmPassword passwordValue={passwordValue} setPasswordValue={setPasswordValue} validPasswordChecker={validPasswordChecker}
            passwordTrue={passwordTrue} setPasswordTrue={setPasswordTrue} passwordType={passwordType} setPasswordType={setPasswordType}
            passwordChecker={passwordChecker} passwordInputStyle={passwordInputStyle} passwordMatchValue={passwordMatchValue}
            setPasswordMatchValue={setPasswordMatchValue} validPasswordMatchChecker={validPasswordMatchChecker}
            passwordMatchTrue={passwordMatchTrue} setPasswordMatchTrue={setPasswordMatchTrue} passwordCheckType={passwordCheckType}
            setPasswordCheckType={setPasswordCheckType} passwordMatchChecker={passwordMatchChecker}
            passwordInputMatchStyle={passwordInputMatchStyle} />
          <div className='d-flex flex-column align-items-center justify-content-between'>
            <h6><b>Already have an account?</b></h6>
            <Link className='sign-up-ahref' to='/signin'> Sign in</Link>
          </div>
          <button className='btn btn-primary'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Sign_Up_Form