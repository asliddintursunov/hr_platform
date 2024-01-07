import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

// Components
import Username from "../../../Pages/Username"
import Password from "../../../Pages/Password"
import PopUp from "../../../Modals/PopUp"

// Custom Hooks
import { useUsername } from "../../../../hooks/useUsername"
import { usePassword } from "../../../../hooks/usePassword"
import { baseUrl } from "../../../../utils/api"
import InternalError from "../../../Modals/InternalError"

function Sign_In_Form() {
  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus, usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()

  const { passwordValue, setPasswordValue, validPasswordChecker, passwordTrue, setPasswordTrue, passwordType, setPasswordType, passwordChecker, passwordInputStyle } = usePassword()

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)

  const logInToProfile = () => {
    axios
      .post(`${baseUrl}/login`, {
        username: usernameValue,
        password: passwordValue
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userId", res.data.id)
        localStorage.setItem("userRole", res.data.role)

        location.assign("/landing")
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }

        setIsOpen(true)
        setErrorOccured(true)
        setPopupInfo(err.response.data.message)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    logInToProfile()
  }

  return (
    <>
      {closeInternalErrorModal && <InternalError />}
      <div className="sign-in-form-container">
        {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
        {
          <form onSubmit={handleSubmit} className="form-control">
            <div>
              <h3 className="h3-heading">Sign In</h3>
              <sub className="sub-heading">Sign in to continue</sub>
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
              <Password
                passwordValue={passwordValue}
                setPasswordValue={setPasswordValue}
                validPasswordChecker={validPasswordChecker}
                passwordTrue={passwordTrue}
                setPasswordTrue={setPasswordTrue}
                passwordType={passwordType}
                setPasswordType={setPasswordType}
                passwordChecker={passwordChecker}
                passwordInputStyle={passwordInputStyle}
              />
              <button className="w-full btn btn-primary sign-in-btn">Log In</button>
              <div className="d-flex flex-column align-items-center justify-content-between">
                <div className="overline-container">
                  <span className="line">________________</span>
                  <span className="access-quick">ACCESS QUICKLY</span>
                  <span className="line">________________</span>
                </div>
                <br />
                <br />
                <div className="no-account">
                  <span>No account yet?</span>
                  <Link className="sign-in-ahref" to="/signup">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        }
      </div>
    </>
  )
}

export default Sign_In_Form
