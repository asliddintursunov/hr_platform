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
  
  const URL = 'http://localhost:3000/users'

  // Custom Hook Values
  const {usernameValue, setUsernameValue} = useUsername()
  const {emailValue, setEmailValue} = useEmail()
  const {passwordValue, setPasswordValue, setPasswordMatchValue} = useConfirmPassword()
console.log(usernameValue);
  const addNewUser = () => {
    axios.post(URL, {
      fullname: 'New User',
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      accepted: false,
      profile_photo: 'https://example.com/profiles/john_doe.jpg',

    })
      .then((req) => {
        console.log(req.data)
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
          <_Username />
          <_Email />
          <_ConfirmPassword />
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