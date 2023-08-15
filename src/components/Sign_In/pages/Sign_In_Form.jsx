import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

// Css
import '../Sign_In.css'

// Components
import _Username from '../../_Username'
import _Password from '../../_Password'
import _PopUp from '../../_PopUp'
import GoogleAUTH from '../../../GoogleAUTH'

// Custom Hooks
import { useUsername } from '../../../hooks/useUsername'
import { usePassword } from '../../../hooks/usePassword'
import useURL from '../../../hooks/useURL'

function Sign_In_Form() {

  const {LoginUrl} = useURL()

  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
    usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()

  const { passwordValue, setPasswordValue, validPasswordChecker,
    passwordTrue, setPasswordTrue,
    passwordType, setPasswordType, passwordChecker,
    passwordInputStyle } = usePassword()

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')


  const logInToProfile = () => {
    axios.post(LoginUrl, {
      'username': usernameValue,
      'password': passwordValue,
    },)
      .then(res => {
        setIsOpen(true)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.id)
        localStorage.setItem('userRole', res.data.role)
        setPopupInfo(res.data.message)
        setErrorOccured(false)

        setTimeout(() => {
          // Redirecting uset to another page
          window.location.assign('/landing')
        }, 1500);

      })
      .catch(err => {
        setIsOpen(true)
        setErrorOccured(true)
        console.log(err);
        setPopupInfo(err.response.data.message);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logInToProfile()
  }

  return (
    <div className='sign-in-form-container'>
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {<form onSubmit={handleSubmit} className='form-control'>
        <div>
          <h2><i className="bi bi-key-fill key"></i></h2>
          <h2>Sign In</h2>
        </div>
        <GoogleAUTH page={'/landing'} number={2}/>
        <hr style={{ width: '100%' }} />
        <br />
        <div className='input-container'>
          <_Username usernameValue={usernameValue} setUsernameValue={setUsernameValue} validUsernameChecker={validUsernameChecker}
            usernameFocus={usernameFocus} setUsernameFocus={setUsernameFocus} usernameTrue={usernameTrue} setUsernameTrue={setUsernameTrue}
            usernameChecker={usernameChecker} usernameInputStyle={usernameInputStyle}
          />
          <_Password passwordValue={passwordValue} setPasswordValue={setPasswordValue} validPasswordChecker={validPasswordChecker}
            passwordTrue={passwordTrue} setPasswordTrue={setPasswordTrue} passwordType={passwordType} setPasswordType={setPasswordType}
            passwordChecker={passwordChecker} passwordInputStyle={passwordInputStyle}
          />
        </div>
        <div style={{ rowGap: '.5rem', margin: '.7rem auto' }} className='d-flex flex-column align-items-center justify-content-between'>
          <h5><b>No Account Yet?</b></h5>
          <Link className='sign-up-ahref' to='/signup'>Sign Up</Link>
        </div>
        <button className='w-full btn btn-primary'>Log In</button>
      </form>}
    </div>
  )
}

export default Sign_In_Form