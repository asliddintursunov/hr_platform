import { useState, useCallback } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import useURL from './hooks/useURL';
import { v4 as uuidv4 } from 'uuid';
import _PopUp from './components/_PopUp';
import { useNavigate } from 'react-router-dom';
import './components/Sign_Up/Sign_Up.css'

// eslint-disable-next-line react/prop-types
function GoogleAUTH({page, number}) {

  const navigate = useNavigate()

  // Pop Up States  
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')
  // const [user, setUser] = useState([])

  const GoogleAuthUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=`

  const { RegisterByGoogle, LoginUrl } = useURL()

  const Register_sendUserDetailsToBackend = useCallback(
    (username, email, password, id) => {
      if (username && email && password && id) {
        axios.post(RegisterByGoogle, {
          username: username,
          email: email,
          password: password,
          id: id
        })
          .then(res => {
            console.log(res);
            setPopupInfo(res.data)
            setErrorOccured(false)
            setIsOpen(true)

            setTimeout(() => {
              navigate(page)
            }, 2000);
          })
          .catch(err => {
            console.error(err)
            setPopupInfo(err.response.data)
            setErrorOccured(true)
            setIsOpen(true)
          })
      }
    }, [RegisterByGoogle, navigate, page]
  )

  const Login_sendUserDetailsToBackend = useCallback(
    (username, id) => {
      if (username && id) {
        axios.post(LoginUrl, {
          username: username,
          password: id
        })
        .then(res => {
          console.log(res);
          setPopupInfo(res.data.message)
          setErrorOccured(false)
          setIsOpen(true)
          
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.id)
          localStorage.setItem('userRole', res.data.role)

          setTimeout(() => {
            navigate(page)
          }, 2000);
        })
        .catch(err => {
          console.error(err)
          setPopupInfo(err.response.data.message)
          setErrorOccured(true)
          setIsOpen(true)
        })
      }
    }, [LoginUrl, navigate, page]
  )

  const sendUserDetails = useCallback(
    (user) => {
      const v4Id = uuidv4();

      const indexOf_G = user.email.split('').indexOf('@')
      const emailToUsername = user.email.slice(0, indexOf_G)
      const randomPassword = 'KuU' + v4Id.split('').filter(e => e !== '-').join('') + 'Vlw'
      if (number === 1) {
        Register_sendUserDetailsToBackend(emailToUsername, user.email, randomPassword, user.id)
      }
      if (number === 2) {
        Login_sendUserDetailsToBackend(emailToUsername, user.id)
      }
    }, [Register_sendUserDetailsToBackend, Login_sendUserDetailsToBackend, number]
  )

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      isUserValid(codeResponse)
      localStorage.setItem('accessToken', codeResponse.access_token)
    },
    onError: (error) => console.error('Login Failed:', error)
  });


  const isUserValid = (user) => {
    if (user) {
      axios
        .get(GoogleAuthUrl + user.access_token, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          sendUserDetails(res.data) // Working Late | Working Correctly!
        })
        .catch((err) => console.error(err));
    }
  }

  // useEffect(
  //   () => {
  //     const storedAccessToken = localStorage.getItem('accessToken');
  //     if (storedAccessToken) {
  //       setUser({ access_token: storedAccessToken });
  //     }
  //   }, []
  // )

  return (
    <div className='container'>
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <button type='button' className='btn btn-outline-light text-danger border border-primary' onClick={() => { login(); }}>
        By &#160;
        <i className="bi bi-google text-primary"></i>
        <span className='text-danger'>o</span>
        <span className='text-warning'>o</span>
        <span className='text-primary'>g</span>
        <span className='text-success'>l</span>
        <span className='text-danger'>e</span>
      </button>
    </div >
  );
}

export default GoogleAUTH