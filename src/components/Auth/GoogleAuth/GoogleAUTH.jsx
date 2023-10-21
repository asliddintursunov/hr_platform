import { useState, useCallback } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import PopUp from "../../Modals/PopUp"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../../../utils/api"

// eslint-disable-next-line react/prop-types
function GoogleAUTH({ page, number }) {
  const navigate = useNavigate()

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

  const GoogleAuthUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=`

  const Register_sendUserDetailsToBackend = useCallback(
    (username, email, password, id) => {
      if (username && email && password && id) {
        axios
          .post(`${baseUrl}/register_gmail`, {
            username: username,
            email: email,
            password: password,
            id: id
          })
          .then((res) => {
            setPopupInfo(res.data)
            setErrorOccured(false)
            setIsOpen(true)

            setTimeout(() => {
              navigate(page)
            }, 2000)
          })
          .catch((err) => {
            setPopupInfo(err.response.data)
            setErrorOccured(true)
            setIsOpen(true)
          })
      }
    },
    [navigate]
  )

  const Login_sendUserDetailsToBackend = useCallback(
    (username, id) => {
      if (username && id) {
        axios
          .post(`${baseUrl}/login`, {
            username: username,
            password: id
          })
          .then((res) => {
            setPopupInfo(res.data.message)
            setErrorOccured(false)
            setIsOpen(true)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userId", res.data.id)
            localStorage.setItem("userRole", res.data.role)

            setTimeout(() => {
              location.assign(page)
            }, 2000)
          })
          .catch((err) => {
            setPopupInfo(err.response.data.message)
            setErrorOccured(true)
            setIsOpen(true)
          })
      }
    },
    [page]
  )

  const sendUserDetails = useCallback(
    (user) => {
      const v4Id = uuidv4()

      const indexOf_G = user.email.split("").indexOf("@")
      const emailToUsername = user.email.slice(0, indexOf_G)
      const randomPassword =
        "KuU" +
        v4Id
          .split("")
          .filter((e) => e !== "-")
          .join("") +
        "Vlw"
      if (number === 1) {
        Register_sendUserDetailsToBackend(emailToUsername, user.email, randomPassword, user.id)
      }
      if (number === 2) {
        Login_sendUserDetailsToBackend(emailToUsername, user.id)
      }
    },
    [Register_sendUserDetailsToBackend, Login_sendUserDetailsToBackend, number]
  )

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      isUserValid(codeResponse)
    },
    onError: (error) => console.error("Login Failed:", error)
  })

  const isUserValid = (user) => {
    if (user) {
      axios
        .get(GoogleAuthUrl + user.access_token, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
          }
        })
        .then((res) => {
          sendUserDetails(res.data)
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className="container">
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <button
        type="button"
        className="btn btn-outline-light text-danger border border-primary google-btn"
        onClick={() => {
          login()
        }}
      >
        <i className="bi bi-google text-primary"></i>
        <span style={{ fontWeight: 500 }} className="text-danger">o</span>
        <span style={{ fontWeight: 500 }} className="text-warning">o</span>
        <span style={{ fontWeight: 500 }} className="text-primary">g</span>
        <span style={{ fontWeight: 500 }} className="text-success">l</span>
        <span style={{ fontWeight: 500 }} className="text-danger">e</span>
      </button>
    </div>
  )
}

export default GoogleAUTH
