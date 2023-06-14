import { Link } from 'react-router-dom'

// Css
import '../Sign_Up.css'

// Components
import _Username from '../../_Username'
import _Email from '../../_Email'
import _Password from '../../_Password'
import _ConfirmPassword from '../../_ConfirmPassword'

function Sign_Up_Form() {
  return (
    <div className='sign-up-form-container'>
      <form className='form-control sign-up-form'>
        <div>
          <h2><i className="bi bi-lock lock"></i></h2>
          <h2>Sign Up</h2>
        </div>
        <hr style={{ width: '100%' }} />
        <br />
        <div className='input-container'>
          <_Username />
          <_Email />
          <_Password />
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