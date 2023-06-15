import './User_Profile.css'
import { Link } from 'react-router-dom'

// Custon Hooks
import { useUsername } from '../../hooks/useUsername'
import { usePassword } from '../../hooks/usePassword'
import { useEmail } from '../../hooks/useEmail'
function UpdateProfile() {

  // Custom useUsername Hook 
  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
    usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()

  // Custom usePassword Hook
  const { passwordValue, setPasswordValue, validPasswordChecker,
    passwordTrue, setPasswordTrue,
    passwordType, setPasswordType, passwordChecker,
    passwordInputStyle } = usePassword()

  // Custom Email Hook
  const { emailValue, setEmailValue, validEmailChecker,
    emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle } = useEmail()
  return (
    <div className='container'>

      {/* Header, Image ... */}
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

        {/* Full Name */}
        <div className='fullname-changer'>
          <label htmlFor="fullname"><b>Full Name</b></label>
          <input
            id='fullname'
            className='form-control'
            type='text'
            placeholder='Full Name'
          />
        </div>

        {/* User Name */}
        <div className="usernamename-changer">
          <label htmlFor="username"><b>User Name</b></label>
          <input
            style={usernameValue.length >= 1 && usernameTrue ? usernameInputStyle : null} value={usernameValue} className='form-control' type="text" placeholder='Username'
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
        </div>

        {/* Email */}
        <div className='email-changer'>
          <label htmlFor="email"><b>Email</b></label>
          <div>
            <i className="bi bi-envelope-at-fill"></i>
          </div>
          <input id='email' style={emailValue.length >= 1 && emailTrue ? emailInputStyle : null} value={emailValue} className='form-control' type="email" placeholder='Email'
            onChange={e => setEmailValue(e.target.value)}
            onKeyUp={() => {
              emailChecker()
              setEmailtrue(true)
            }}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            required />
          {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Valid Email' && <i style={{ color: 'green' }}>{validEmailChecker}</i>}
          {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Invalid Email' && <i style={{ color: 'red' }}>{validEmailChecker}</i>}
        </div>

        {/* Password */}
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

        {/* Address */}
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