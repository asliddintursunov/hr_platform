import './User_Profile.css'

// Components
import AddPhoneNumber from '../AddPhoneNumber'

// Custon Hooks
import { useUsername } from '../../hooks/useUsername'
import { usePassword } from '../../hooks/usePassword'
import { useEmail } from '../../hooks/useEmail'
import { useState } from 'react'
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

  const [changeProfile, setChangeProfile] = useState(false)

  return (
    <div className='container'>

      {/* Header, Image ... */}
      <div className='d-flex align-items-center justify-content-between'>
        <h1>My Profile</h1>
        <div className="d-flex align-items-center justify-content-center">
          <p style={{ marginRight: '1rem' }}>Name: </p>
          <img style={{ width: '3rem', borderRadius: '2rem' }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU" />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }} className='d-flex justify-content-end gap-3'>
        {!changeProfile && <button style={{ padding: '0.4rem 1.5rem', fontSize: 'medium' }} className='btn btn-secondary' onClick={() => setChangeProfile(true)}>Edit</button>}
        {changeProfile && <button style={{ padding: '0.4rem 1.5rem', fontSize: 'medium' }} className='btn btn-success' onClick={() => setChangeProfile(false)}>Save</button>}
        {changeProfile && <button style={{ padding: '0.4rem 1.5rem', fontSize: 'medium' }} className='btn btn-danger' onClick={() => setChangeProfile(false)}>Cancle</button>}
      </div>
      <hr />

      {/* ============ Update Profile Form ============ */}
      <br />
      <form onSubmit={(e) => e.preventDefault()} className='form-control d-flex flex-column update-profile-form'>
        <div className="d-flex flex-column flex-sm-row row">
          <div className="col-12 col-sm-2 img-container">
            <div className='d-flex flex-column align-items-center justify-content-center gap-2'>
              <img style={{ width: '7rem' }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU" />
              {/* <Link>Change image</Link> */}
              <button type='button' disabled={!changeProfile} className='btn btn-secondary'>Change Image</button>
            </div>
          </div>
          {/* Full Name */}
          <div className="col-12 col-sm-10">
            <div className='fullname-changer input-container'>
              <label htmlFor="fullname"><b>Full Name</b></label>
              <input
                disabled={!changeProfile}
                id='fullname'
                className='form-control'
                type='text'
                placeholder='Full Name'
              />
            </div>

            {/* User Name */}
            <div className="usernamename-changer input-container">
              <label htmlFor="username"><b>User Name</b></label>
              <input
                disabled={!changeProfile}
                style={usernameValue.length >= 1 && usernameTrue ? usernameInputStyle : null} value={usernameValue} className='form-control' type="text" placeholder='Username'
                onChange={e => setUsernameValue(e.target.value)}
                onKeyUp={() => {
                  usernameChecker()
                  setUsernameTrue(true)
                }}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                required />
              {/* {usernameValue.length >= 1 && usernameFocus && validUsernameChecker === 'Valid Username' && <i style={{ color: 'green' }}>{validUsernameChecker}</i>} */}
              {usernameValue.length >= 1 && usernameFocus && validUsernameChecker === 'Invalid Username' && <i style={{ color: 'red' }}>{validUsernameChecker}</i>}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className='email-changer input-container'>
          <label htmlFor="email"><b>Email</b></label>
          <div>
            <i className="bi bi-envelope-at-fill"></i>
          </div>
          <input
            disabled={!changeProfile}
            className='form-control'
            id='email'
            style={emailValue.length >= 1 && emailTrue ? emailInputStyle : null}
            value={emailValue}
            type="email"
            placeholder='Email'
            onChange={e => setEmailValue(e.target.value)}
            onKeyUp={() => {
              emailChecker()
              setEmailtrue(true)
            }}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            required />
          {/* {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Valid Email' && <i style={{ color: 'green' }}>{validEmailChecker}</i>} */}
          {emailValue.length >= 1 && emailFocus && validEmailChecker === 'Invalid Email' && <i style={{ color: 'red' }}>{validEmailChecker}</i>}
        </div>

        {/* Password */}
        <div className='password-changer input-container'>
          <label htmlFor="password"><b>Password</b></label>
          <div onClick={() => {
            passwordType ? setPasswordType(false) : setPasswordType(true)
          }}>
            {passwordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
          </div>
          <input
            disabled={!changeProfile}
            className='form-control'
            id="password"
            style={passwordValue.length >= 1 && passwordTrue ? passwordInputStyle : null}
            value={passwordValue}
            type={passwordType ? "password" : "text"}
            placeholder='Password'
            onChange={e => setPasswordValue(e.target.value)}
            onKeyUp={() => {
              passwordChecker()
              setPasswordTrue(true)
            }}
            required
          />
          {/* {passwordValue.length >= 1 && validPasswordChecker === 'Valid Password' && <i style={{ color: 'green' }}>{validPasswordChecker}</i>} */}
          {passwordValue.length >= 1 && validPasswordChecker === 'Invalid Password' && <i style={{ color: 'red' }}>{validPasswordChecker}</i>}
        </div>

        {/* Address */}
        <div className='address-changer input-container'>
          <label htmlFor="address"><b>Address</b></label>
          <input
            disabled={!changeProfile}
            className='form-control'
            type="text"
            id='address'
            placeholder='Address'
          />
        </div>
        <h3><b>Phone Number</b></h3>
        <AddPhoneNumber />
        <div className="btn-container d-flex justify-content-center">
          <button className='btn btn-dark'>Submit</button>
        </div>
      </form>
      {/* ================================================ */}
    </div>
  )
}

export default UpdateProfile