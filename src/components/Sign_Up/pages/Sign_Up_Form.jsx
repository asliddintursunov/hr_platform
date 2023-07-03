import { Link } from 'react-router-dom'
import axios from 'axios'
// Css
import '../Sign_Up.css'

// Components
import _Username from '../../_Username'
import _Email from '../../_Email'
import _ConfirmPassword from '../../_ConfirmPassword'

// Custom Hooks
import { useUsername } from '../../../hooks/useUsername'
import { useEmail } from '../../../hooks/useEmail'
import { useConfirmPassword } from '../../../hooks/useConfirmPassword'

function Sign_Up_Form() {

  // const URL = 'http://localhost:3000/users'
  const URL = 'http://192.168.3.140:1000/register'

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

  const addNewUser = () => {
    axios.post(URL, {
      // fullname: 'New User',
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      // "address": null,
      // "dateOfBirth": null,
      // role: 'user',
      // accepted: false,
      // profile_photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU',
    })
      .then((req) => {
        alert(req.data)
        setUsernameValue('')
        setEmailValue('')
        setPasswordValue('')
        setPasswordMatchValue('')
      })
      .catch((err) => console.error(err))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    addNewUser()
  }

  return (
    <div className='sign-up-form-container'>
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