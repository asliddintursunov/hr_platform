import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { useCallback } from 'react';
import '../css/_PopUp.css'
import { useNavigate } from 'react-router-dom';
import useURL from '../hooks/useURL';
import { baseUrl } from '../utils/api';
function _ConfirmationCode({ setConfirmCodeOpen, popupInfo, setConfirmEmailCode, confirmEmailCode,
  setUsernameValue, setEmailValue, setPasswordValue, setPasswordMatchValue, setIsOpen, setPopupInfo, setErrorOccured }) {

  const navigate = useNavigate()

  const sendEmailCode = useCallback(() => {
    axios.post(`${baseUrl}/register/code`, {
      code: confirmEmailCode.toString(),
      username: localStorage.getItem('new_username')
    })
      .then(req => {
        if (req.status === 202) {
          console.log(202, req);
          setConfirmCodeOpen(true)

          setErrorOccured(true)
          setIsOpen(true)
          setPopupInfo(req.data)
        }
        if (req.status === 200) {
          console.log(200, req);
          setConfirmCodeOpen(false)

          setErrorOccured(false)

          setUsernameValue('')
          setEmailValue('')
          setPasswordValue('')
          setPasswordMatchValue('')

          setTimeout(() => {
            setIsOpen(true)
            setPopupInfo(req.data)

            setTimeout(() => {
              navigate('/signin')
              console.log(2000 + 'ms');
            }, 2000);
            console.log(500 + 'ms');
          }, 500);
        }
      })
      .catch(err => {
        console.log(400, err);
        setIsOpen(true)
        setErrorOccured(true)
        setConfirmCodeOpen(false)
        setPopupInfo(err.response.data)

      })
  }, [confirmEmailCode, setIsOpen, setPopupInfo, navigate, setUsernameValue, setEmailValue,
    setPasswordValue, setPasswordMatchValue, setConfirmCodeOpen, setErrorOccured])
  // const [emailCode, setEmailCode] = useState(null);

  const ClickSendBtn = () => {
    setConfirmEmailCode('')

    sendEmailCode()
    console.log(confirmEmailCode)
  }

  const ClickCloseBtn = () => {
    setConfirmEmailCode('')

    setConfirmCodeOpen(false)
    console.log(confirmEmailCode);
  }

  return (
    <div>
      <div className='popupContainer open'>
        <div className='popup open'>
          <label htmlFor="number-input">{popupInfo}</label>
          <br />
          <InputNumber id="number-input" value={confirmEmailCode} onValueChange={(e) => setConfirmEmailCode(e.target.value)} />
          <button className="btn btn-primary sendBtn" onClick={() => { ClickSendBtn() }
          }>Send</button>
          {/* <button onClick={() => { ClickCloseBtn() }} className='btn closeBtn'><i className="bi bi-x-lg"></i></button> */}
        </div>
      </div>
    </div>
  )
}

export default _ConfirmationCode