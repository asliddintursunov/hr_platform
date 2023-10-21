import { useCallback, useEffect, useState } from 'react'
import styles from "../../styles/ResumeDetails.module.css"
import axios from 'axios'
import { baseUrl } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, sendHeaders } from "../../redux/features/userDataSlice"
import AnotherUser from '../Modals/AnotherUser'
import { useNavigate } from 'react-router-dom'
import PopUp from '../Modals/PopUp'

function _ResumeDetails() {
  const [userResumeData, setUserResumeData] = useState([])
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userID = localStorage.getItem('userResumeID')

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  useEffect(
    () => {
      dispatch(sendHeaders())
    }, []
  )

  // Token Expired Validation
  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.clear()
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  useEffect(
    () => {
      axios.get(`${baseUrl}` + '/search/' + userID, {
        headers: head
      })
        .then(res => {
          setUserResumeData(res.data)
        })
        .catch(err => {
          if (err.response.data.msg) {
            tokenExpired(err.response.data.msg)
          }
          else if (err.response.status === 401) {
            setWrongUser(true)
            setWrongUserData(err.response.data)
            dispatch(logoutUser())
          }
        })
    }, [userID, tokenExpired]
  )

  return (
    <>
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={styles.resumeDetailsContainer} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className={styles.resumeDetailsWrapper}>
          <h1 className='display-3'>Resume Details</h1>
          <div className={styles.userGeneralData}>
            <h1>General Information</h1>
            <div>Full Name: <code>{userResumeData.fullname}</code></div>
            <div>Username: <code>{userResumeData.username}</code></div>
            <div>Email: <code>{userResumeData.email}</code></div>
            <div>Address: <code>{userResumeData.address}</code></div>
            <div>Date of Birth: <code>{userResumeData.date_birth}</code></div>
            <div className={styles.userPhoneNumber}>Phone Numbers:
              {userResumeData.phone_number && userResumeData.phone_number.map((num, index) => (
                <code key={index}>{num}</code>
              ))}
            </div>
          </div>
          <div className={styles.userExperience}>
            <h1>Work Experience</h1>
            <div>Major: <code>{userResumeData.major}</code></div>
            <div>Experience: <code>{userResumeData.experience} years</code></div>
          </div>
          <div className={styles.userSkills}>
            <h1>Technologies, Skills</h1>
            <div>
              {userResumeData.skills && userResumeData.skills.map((skill, index) => (
                <code key={index}>{skill}</code>
              ))}
            </div>
          </div>
          <div className={styles.userResumeContainer}>
            <h1>Resume</h1>
            <embed
              type='application/pdf'
              src={userResumeData.resume}
              height='400'
              width='100%'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default _ResumeDetails