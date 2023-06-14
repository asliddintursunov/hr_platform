import { Link } from 'react-router-dom'

// Css
import '../Sign_In.css'

// Components
import _Username from '../../_Username'
import _Password from '../../_Password'

function Sign_In_Form() {
  return (
    <div className='sign-in-form-container'>
      <form className='form-control'>
        <div>
          <h2><i className="bi bi-key-fill key"></i></h2>
          <h2>Sign In</h2>
        </div>
        <hr style={{ width: '100%' }} />
        <br />
        <div className='input-container'>
          <_Username />
          <_Password />
        </div>
        <div style={{rowGap: '.5rem', margin: '.7rem auto'}} className='d-flex flex-column align-items-center justify-content-between'>
          <h5><b>No Account Yet?</b></h5>
          <Link className='sign-up-ahref' to='/signup'>Sign Up</Link>
        </div>
        <button className='w-full btn btn-primary'>Log In</button>
      </form>
    </div>
  )
}

export default Sign_In_Form