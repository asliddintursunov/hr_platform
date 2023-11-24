import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

// Components
import Username from "../../../Pages/Username"
import Email from "../../../Pages/Email"
import ConfirmPassword from "../../../Pages/ConfirmPassword"
import PopUp from "../../../Modals/PopUp"
import ConfirmationCode from "../../../Pages/ConfirmationCode"
import GoogleAUTH from "../../GoogleAuth/GoogleAUTH"

// Custom Hooks
import { useUsername } from "../../../../hooks/useUsername"
import { useEmail } from "../../../../hooks/useEmail"
import { useConfirmPassword } from "../../../../hooks/useConfirmPassword"
import { baseUrl } from "../../../../utils/api"
function SignUpForm() {
  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)

  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [confirmEmailCode, setConfirmEmailCode] = useState("")
  const [confirmCodeOpen, setConfirmCodeOpen] = useState(false)

  // Custom Hook Values
  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus, usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()

  const { emailValue, setEmailValue, validEmailChecker, emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle } = useEmail()

  const {
    passwordValue,
    setPasswordValue,
    validPasswordChecker,
    passwordTrue,
    setPasswordTrue,
    passwordType,
    setPasswordType,
    passwordChecker,
    passwordInputStyle,
    passwordMatchValue,
    setPasswordMatchValue,
    validPasswordMatchChecker,
    passwordMatchTrue,
    setPasswordMatchTrue,
    passwordCheckType,
    setPasswordCheckType,
    passwordMatchChecker,
    passwordInputMatchStyle
  } = useConfirmPassword()

  const addNewUser = () => {
    if (passwordValue == passwordMatchValue) {
      axios
        .post(`${baseUrl}/register`, {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          confirm_password: passwordMatchValue
        })
        .then((req) => {
          setConfirmCodeOpen(true)
          setErrorOccured(false)
          setPopupInfo(req.data.message)
          localStorage.setItem("new_username", req.data.username)
        })
        .catch((err) => {
          setIsOpen(true)
          setErrorOccured(true)
          if (typeof err.response.data !== "object") {
            setPopupInfo(err.response.data)
          } else {
            setPopupInfo(err.response.data.error)
          }
        })
    } else {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo("Password does not match!")
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addNewUser()
  }

  return (
    <div className="sign-up-form-container" id="signUpContainer">
      {confirmCodeOpen && !isOpen && (
        <ConfirmationCode
          confirmCodeOpen={confirmCodeOpen}
          setConfirmCodeOpen={setConfirmCodeOpen}
          popupInfo={popupInfo}
          setConfirmEmailCode={setConfirmEmailCode}
          confirmEmailCode={confirmEmailCode}
          usernameValue={usernameValue}
          setUsernameValue={setUsernameValue}
          setEmailValue={setEmailValue}
          setPasswordValue={setPasswordValue}
          setPasswordMatchValue={setPasswordMatchValue}
          setIsOpen={setIsOpen}
          setPopupInfo={setPopupInfo}
          setErrorOccured={setErrorOccured}
        />
      )}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <form onSubmit={handleSubmit} className="form-control">
        <div>
          <h3 className="h3-heading">Sign Up</h3>
          <sub className="sub-heading">Sign up to continue</sub>
        </div>
        <br />
        <div className="input-container">
          <Username
            usernameValue={usernameValue}
            setUsernameValue={setUsernameValue}
            validUsernameChecker={validUsernameChecker}
            usernameFocus={usernameFocus}
            setUsernameFocus={setUsernameFocus}
            usernameTrue={usernameTrue}
            setUsernameTrue={setUsernameTrue}
            usernameChecker={usernameChecker}
            usernameInputStyle={usernameInputStyle}
          />
          <Email
            emailValue={emailValue}
            setEmailValue={setEmailValue}
            validEmailChecker={validEmailChecker}
            emailFocus={emailFocus}
            setEmailFocus={setEmailFocus}
            emailTrue={emailTrue}
            setEmailtrue={setEmailtrue}
            emailChecker={emailChecker}
            emailInputStyle={emailInputStyle}
          />
          <ConfirmPassword
            passwordValue={passwordValue}
            setPasswordValue={setPasswordValue}
            validPasswordChecker={validPasswordChecker}
            passwordTrue={passwordTrue}
            setPasswordTrue={setPasswordTrue}
            passwordType={passwordType}
            setPasswordType={setPasswordType}
            passwordChecker={passwordChecker}
            passwordInputStyle={passwordInputStyle}
            passwordMatchValue={passwordMatchValue}
            setPasswordMatchValue={setPasswordMatchValue}
            validPasswordMatchChecker={validPasswordMatchChecker}
            passwordMatchTrue={passwordMatchTrue}
            setPasswordMatchTrue={setPasswordMatchTrue}
            passwordCheckType={passwordCheckType}
            setPasswordCheckType={setPasswordCheckType}
            passwordMatchChecker={passwordMatchChecker}
            passwordInputMatchStyle={passwordInputMatchStyle}
          />
          <button type="submit" className="btn btn-primary sign-up-btn">
            Sign Up
          </button>
          <div className="d-flex flex-column align-items-center justify-content-between">
            <div className="overline-container">
              <span className="line">________________</span>
              <span className="access-quick">ACCESS QUICKLY</span>
              <span className="line">________________</span>
            </div>
            <br />
            <GoogleAUTH page={"/signin"} number={1} />
          </div>
        </div>
        <br />
        <div className="have-account">
          <span>Already have an account?</span>
          <Link className="sign-up-ahref" to="/signin">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
