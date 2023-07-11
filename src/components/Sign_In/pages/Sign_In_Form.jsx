import { Link } from 'react-router-dom'

// Css
import '../Sign_In.css'

// Components
import _Username from '../../_Username'
import _Password from '../../_Password'

// Custom Hooks
import { useUsername } from '../../../hooks/useUsername'
import { usePassword } from '../../../hooks/usePassword'
import axios from 'axios'

function Sign_In_Form() {

  const URL = 'http://192.168.3.140:1000/login'
  // const URL = 'http://localhost:3000/users'

  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
    usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()

  const { passwordValue, setPasswordValue, validPasswordChecker,
    passwordTrue, setPasswordTrue,
    passwordType, setPasswordType, passwordChecker,
    passwordInputStyle } = usePassword()

  const logInToProfile = () => {
    axios.post(URL, {
      'username': usernameValue,
      'password': passwordValue,
    })
      .then(res => {
        localStorage.setItem('userId', res.data.id)
        localStorage.setItem('userRole', res.data.role)
        if (res.data.accepted === true) {
          alert(res.data.message)
          window.location.assign('/landing')
        }
        else {
          alert(res.data.message)

          setUsernameValue('')
          setPasswordValue('')
        }
      })
      .catch(err => alert(err.response.data))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logInToProfile()
  }

  return (
    <div className='sign-in-form-container'>
      <form onSubmit={handleSubmit} className='form-control'>
        <div>
          <h2><i className="bi bi-key-fill key"></i></h2>
          <h2>Sign In</h2>
        </div>
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
      </form>
    </div>
  )
}

export default Sign_In_Form