import './User_Profile.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Components
import Edit_FullName from './part/Edit_FullName'
import Edit_UserName from './part/Edit_UserName'
import Edit_Email from './part/Edit_Email'
import Edit_Password from './part/Edit_Password'
import Edit_Address from './part/Edit_Address'
import Edit_DateOfBirth from './part/Edit_DateOfBirth'
import Edit_UploadImage from './part/Edit_UploadImage'
import AddPhoneNumber from './part/AddPhoneNumber'
import LogOutModal from './part/LogOutModal'
import _PopUp from '../_PopUp'

// Custon Hooks
import { useUsername } from '../../hooks/useUsername'
import { usePassword } from '../../hooks/usePassword'
import { useEmail } from '../../hooks/useEmail'
import { useCallback, useEffect, useState } from 'react'



function UpdateProfile() {
  // Redirect user to another page
  const navigate = useNavigate()

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
  // Full Name, Address, DateOfBirth values
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [data, set_data] = useState({})
  // Disable && Enable inputs
  const [changeProfile, setChangeProfile] = useState(false)

  // Add Phone Number
  const [numbers, setNumbers] = useState([])
  const [newNumber, setNewNumber] = useState('998')

  // Loader
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = 'Bearer ' + token;

    return config;
  });

  // Token Expired Validation
  const tokenExpired = useCallback((info) => {
    setIsOpen(true)
    setErrorOccured(true)
    setPopupInfo(info)
    setTimeout(() => {
      localStorage.removeItem('token')
      navigate('/signin')
    }, 1500);
  }, [navigate])

  const handleAddNewNumber = (e) => {
    e.preventDefault();
    setNumbers(prev => [...prev, Number(newNumber)])

    setNewNumber('998')
  }

  const handleDelete = (number) => {
    setNumbers(prev => {
      return prev.filter(num => num !== number)
    })
  }

  // Change Profile Image === Working
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result
      setSelectedImage(base64String)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  // Cancle Edition === Working
  const CancleEdition = useCallback(() => {

    setIsPending(true)
    axios.get(`http://192.168.3.140:1000/user/${localStorage.getItem('userId')}`)
      .then(res => {
        // User Data for input field
        console.log(res.data);
        set_data(res.data)
        setFullName(res.data.fullname)
        setUsernameValue(res.data.username)
        setEmailValue(res.data.email)
        // setPasswordValue(res.data.password)
        setAddress(res.data.address)
        setDateOfBirth(res.data.date_birth)
        setSelectedImage(res.data.profile_photo)
        setNumbers(res.data.phone_number)
        setIsPending(false)
      })
      .catch(err => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setIsPending(false)
      })
  }, [setFullName, setUsernameValue, setEmailValue, setAddress, setDateOfBirth, setSelectedImage, tokenExpired])

  useEffect(() => {
    CancleEdition()
  }, [CancleEdition])

  // Save Edition === Working
  const saveEdition = useCallback(() => {
    axios.patch(`http://192.168.3.140:1000/update_profile/${localStorage.getItem('userId')}`, {
      fullname: data.fullname !== fullName ? fullName : undefined,
      username: data.username !== usernameValue ? usernameValue : undefined,
      email: data.email !== emailValue ? emailValue : undefined,
      password: passwordValue !== "" ? passwordValue : undefined,
      address: data.address !== address ? address : undefined,
      date_birth: data.date_birth !== dateOfBirth ? dateOfBirth : undefined,
      phone_number: data.phone_number !== numbers ? numbers : undefined,
      profile_photo: data.profile_photo !== selectedImage ? selectedImage : undefined
    })
      .then((res) => {
        setIsOpen(true)
        console.log(res);
        setPopupInfo(res.data)
        setErrorOccured(false)
      })
      .catch((err) => {
        console.log(err);
        setIsOpen(true)
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else{
          setErrorOccured(true)
          setPopupInfo(err.response.data)
        }
      })

  }, [fullName, usernameValue, emailValue, passwordValue, address, dateOfBirth, selectedImage, numbers, data, tokenExpired])

  // Log Out === Working
  const logOut = () => {

    axios.get(`http://192.168.3.140:1000/logout/${localStorage.getItem('userId')}`)
      .then((data) => {
        setIsOpen(true)

        localStorage.removeItem('token')
        setErrorOccured(false)
        setPopupInfo(data.data)

        setTimeout(() => {
          navigate('/signin')
        }, 1500);

      })
      .catch((err) => {
        setIsOpen(true)
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
      })
  }
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  // ###########################################################333
  return (
    <div className='container'>
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {showModal && <LogOutModal toggleModal={toggleModal} logOut={logOut} />}
      {isPending && <div className='loader'></div>}
      {!isPending && <div style={{ filter: showModal ? 'blur(4px)' : 'blur(0)' }}>
        {/* Header, Image ... */}
        <div className='d-flex align-items-center justify-content-between'>
          <h1>My Profile</h1>
          <div className="d-flex align-items-center justify-content-center top-right-image">
            <p style={{ marginRight: '1rem' }}>{fullName}</p>
            {selectedImage ? <img src={selectedImage} /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU" />}
          </div>
        </div>
        <div style={{ marginTop: '1rem' }} className='d-flex justify-content-end gap-3'>
          <button className='btn btn-danger' onClick={() => toggleModal()}><i className="bi bi-box-arrow-right"></i> Log Out</button>
          {!changeProfile && <button style={{ padding: '0.4rem 1.5rem', fontSize: 'medium' }} className='btn btn-secondary' onClick={() => setChangeProfile(true)}>Edit</button>}
          {changeProfile && <button style={{ padding: '0.4rem 1.5rem', fontSize: 'medium' }} className='btn btn-success' onClick={() => {
            setChangeProfile(false)
            saveEdition()
          }}>Save</button>}
          {changeProfile && <button style={{ padding: '0.4rem 1.5rem', fontSize: 'medium' }} className='btn btn-danger' onClick={() => {
            setChangeProfile(false)
            CancleEdition()
          }}>Cancel</button>}
        </div>
        <hr />

        {/* ============ Update Profile Form ============ */}
        <br />
        <form
          // action={`/update_profile/${localStorage.getItem('userId')}`}
          action='/update_profile/'
          method='post'
          encType='multipart/form-data'
          onSubmit={(e) => e.preventDefault()} className='form-control d-flex flex-column update-profile-form' style={{ backgroundColor: '#F0F0F0' }}>
          <div className="d-flex flex-column flex-sm-row row">
            <div className="col-12 col-sm-2 img-container">
              <div className='d-flex flex-column align-items-center justify-content-center gap-2'>

                {/* Edit Image */}
                <Edit_UploadImage selectedImage={selectedImage} handleImageChange={handleImageChange} changeProfile={changeProfile} />

              </div>
            </div>
            <div className="col-12 col-sm-10">

              {/* Edit Full Name */}
              <Edit_FullName changeProfile={changeProfile} fullName={fullName} setFullName={setFullName} />

              {/* Edit User Name */}
              <Edit_UserName usernameValue={usernameValue} setUsernameValue={setUsernameValue} validUsernameChecker={validUsernameChecker}
                usernameFocus={usernameFocus} setUsernameFocus={setUsernameFocus} usernameTrue={usernameTrue} setUsernameTrue={setUsernameTrue}
                usernameChecker={usernameChecker} usernameInputStyle={usernameInputStyle} changeProfile={changeProfile}
              />

            </div>
          </div>

          {/* Edit Email */}
          <Edit_Email emailValue={emailValue} setEmailValue={setEmailValue} validEmailChecker={validEmailChecker} emailFocus={emailFocus}
            setEmailFocus={setEmailFocus} emailTrue={emailTrue} setEmailtrue={setEmailtrue} emailChecker={emailChecker}
            emailInputStyle={emailInputStyle} changeProfile={changeProfile}
          />

          {/* Edit Password */}
          <Edit_Password passwordValue={passwordValue} setPasswordValue={setPasswordValue} validPasswordChecker={validPasswordChecker}
            passwordTrue={passwordTrue} setPasswordTrue={setPasswordTrue} passwordType={passwordType} setPasswordType={setPasswordType}
            passwordChecker={passwordChecker} passwordInputStyle={passwordInputStyle} changeProfile={changeProfile}
          />

          {/* Edit Addres */}
          <Edit_Address changeProfile={changeProfile} address={address} setAddress={setAddress} />

          {/* Edit Date of Birth */}
          <Edit_DateOfBirth changeProfile={changeProfile} dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
          <h3><b>Phone Number</b></h3>

          {/* Edit Add Phone Number */}
          <AddPhoneNumber numbers={numbers} newNumber={newNumber} setNewNumber={setNewNumber} handleAddNewNumber={handleAddNewNumber}
            handleDelete={handleDelete} changeProfile={changeProfile}
          />
        </form>
        {/* ================================================ */}
      </div>}
    </div>
  )
}
export default UpdateProfile