import './User_Profile.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function UpdateProfile() {

  // =========== Variables for Password Input ===========
  const [passwordValue, setPasswordValue] = useState('')
  const [validPasswordChecker, setValidPasswordChecker] = useState('')
  const [passwordTrue, setPasswordTrue] = useState(false)
  const [passwordType, setPasswordType] = useState(true)
  // ====================================================

  // =========== Password Input Validation ===========
  const passwordChecker = () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? setValidPasswordChecker('Valid Password') : setValidPasswordChecker('Invalid Password')
  // =================================================

  // =========== Password Input Style ===========
  const passwordInputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? 'green' : 'red',
  }
  //* ======================================================================

  
  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-around'>
        <h1>My Profile</h1>
        <h1>My Account</h1>
      </div>
      <div className='img-container d-flex align-items-center justify-content-center '>
        <img style={{ width: '10rem' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png" />
        <Link>Change image</Link>
      </div>


      {/* ============ Update Profile Form ============ */}
      <br />
      <form className='form-control d-flex flex-column update-profile-form'>

        <div className='fullname-changer'>
          <label htmlFor="fullname"><b>Full Name</b></label>
          <input
            className='form-control'
            type="text"
            id="fullname"
            placeholder='Arnold Johnson'
          />
        </div>

        <div className="usernamename-changer">
          <label htmlFor="username"><b>User Name</b></label>
          <input
            className='form-control'
            type="text"
            id='username'
            placeholder='Username' />
        </div>

        <div className='email-changer'>
          <label htmlFor="email"><b>Email</b></label>
          <i className="bi bi-envelope-at-fill"></i>
          <input
            className='form-control'
            type="email"
            id="email"
            placeholder='Email'
          />

        </div>
        <div className='password-changer'>
          <label htmlFor="password"><b>Password</b></label>
          <div onClick={() => {
            passwordType ? setPasswordType(false) : setPasswordType(true)
          }}>
            {passwordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
          </div>
          <input
            style={passwordValue.length >= 1 && passwordTrue ? passwordInputStyle : null}
            value={passwordValue}
            type={passwordType ? "password" : "text"}
            className='form-control'
            id="password"
            placeholder='Password'
            onChange={e => setPasswordValue(e.target.value)}
            onKeyUp={() => {
              passwordChecker()
              setPasswordTrue(true)
            }}
            required
          />
          {passwordValue.length >= 1 && validPasswordChecker === 'Valid Password' && <i style={{ color: 'green' }}>{validPasswordChecker}</i>}
          {passwordValue.length >= 1 && validPasswordChecker === 'Invalid Password' && <i style={{ color: 'red' }}>{validPasswordChecker}</i>}
        </div>
        <div className='address-changer'>
          <label htmlFor="address"><b>Address</b></label>
          <input
            className='form-control'
            type="text"
            id='address'
            placeholder='Address'
          />
        </div>
      </form>
      {/* ================================================ */}
    </div>
  )
}

export default UpdateProfile