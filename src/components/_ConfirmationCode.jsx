import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { useCallback, useEffect } from 'react';
import '../css/_PopUp.css'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, sendHeaders } from '../features/userDataSlice';
function _ConfirmationCode({ setConfirmCodeOpen, popupInfo, setConfirmEmailCode, confirmEmailCode,
  setUsernameValue, setEmailValue, setPasswordValue, setPasswordMatchValue, setIsOpen, setPopupInfo, setErrorOccured }) {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      dispatch(sendHeaders())
    }, []
  )
  const sendEmailCode = useCallback(() => {

    axios.post(`${baseUrl}/register/code`, {
      code: confirmEmailCode.toString(),
      username: localStorage.getItem('new_username')
    }, {
      headers: head
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
        if (err.response.status === 401) {
          alert(err.response.data)
          dispatch(logoutUser())
        }

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