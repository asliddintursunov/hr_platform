import { InputNumber } from "primereact/inputnumber"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../../styles/PopUp.css"
import { baseUrl } from "../../utils/api"
import AnotherUser from "../Modals/AnotherUser"
import InternalError from "../Modals/InternalError"

function _ConfirmationCode({
  confirmCodeOpen,
  setConfirmCodeOpen,
  popupInfo,
  setConfirmEmailCode,
  confirmEmailCode,
  setUsernameValue,
  setEmailValue,
  setPasswordValue,
  setPasswordMatchValue,
  setIsOpen,
  setPopupInfo,
  setErrorOccured,
  usernameValue
}) {
  const navigate = useNavigate()

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")
  const [remindEmailCode, setRemindEmailCode] = useState(true)
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)
  const sendEmailCode = useCallback(() => {
    setConfirmCodeOpen(false)
    axios
      .post(`${baseUrl}/register/code`, {
        code: confirmEmailCode ? confirmEmailCode.toString() : null,
        username: usernameValue
      })
      .then((req) => {
        setRemindEmailCode(false)
        if (req.status === 202) {
          setConfirmCodeOpen(true)

          setErrorOccured(true)
          setIsOpen(true)
          setPopupInfo(req.data)
        }
        if (req.status === 200) {
          setConfirmCodeOpen(false)

          setErrorOccured(false)

          setUsernameValue("")
          setEmailValue("")
          setPasswordValue("")
          setPasswordMatchValue("")

          setTimeout(() => {
            setIsOpen(true)
            setPopupInfo(req.data)

            setTimeout(() => {
              navigate("/signin")
            }, 2000)
          }, 500)
        }
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }

        if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
        }
        setIsOpen(true)
        setErrorOccured(true)
        setConfirmCodeOpen(false)
        setPopupInfo(err.response.data)

        setClosepopup(true)
      })
  }, [confirmEmailCode, setIsOpen, setPopupInfo, navigate, setUsernameValue, setEmailValue, setPasswordValue, setPasswordMatchValue, setConfirmCodeOpen, setErrorOccured])

  const ClickSendBtn = () => {
    setConfirmEmailCode("")

    sendEmailCode()
  }

  return (
    <>
      {closeInternalErrorModal && <InternalError />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className="popupContainer open">
        {confirmCodeOpen && (
          <form className="popup open" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="number-input">
              <h3>{popupInfo}</h3>
            </label>
            <br />
            {remindEmailCode && <h3>Emailingizga kelgan 6 ta raqamdan iborat sonni kiriting!</h3>}
            <InputNumber 
            autoFocus
            placeholder="ex: 123456" useGrouping={false} id="number-input" value={confirmEmailCode} onValueChange={(e) => setConfirmEmailCode(e.target.value)} />
            <button
              type="submit"
              className="btn btn-primary sendBtn"
              onClick={() => {
                ClickSendBtn()
              }}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default _ConfirmationCode
