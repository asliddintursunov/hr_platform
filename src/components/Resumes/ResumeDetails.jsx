import { useCallback, useEffect, useState } from 'react'
import styles from "../../styles/ResumeDetails.module.css"
import axios from 'axios'
import { baseUrl } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, sendHeaders } from "../../redux/features/userDataSlice"
import AnotherUser from '../Modals/AnotherUser'
import { useLocation, useNavigate } from 'react-router-dom'
import PopUp from '../Modals/PopUp'
import { Button, Code } from '@radix-ui/themes'
import { CaretLeftIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons'
import ResumeFile from './ResumeFile'


function _ResumeDetails() {
  const [userResumeData, setUserResumeData] = useState([])
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const prevPage = location.pathname.split('/').splice(0, 3).join('/')
  const userID = localStorage.getItem('userResumeID')

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')
  const [openResume, setOpenResume] = useState(false)

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
          setUserResumeData(res.data[0])
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
      {openResume && <ResumeFile setOpenResume={setOpenResume} resume={userResumeData.resume} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={styles.resumeDetailsContainer} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className={styles.resumeDetailsWrapper}>
          <h1 className='display-3'>Resume Details</h1>
          <div className={styles.userGeneralData}>
            <Button
              color='gray'
              variant='ghost'
              className={styles.backButton}
              onClick={() => navigate(prevPage)}
            >Back <CaretLeftIcon /></Button>
            <h1>General Information</h1>
            {userResumeData.fullname && (
              <div>Full Name: <Code>{userResumeData.fullname}</Code></div>
            )}
            {userResumeData.username && (
              <div>Username: <Code>{userResumeData.username}</Code></div>
            )}
            {
              userResumeData.email && (
                <div>Email: <Code>
                  <a href={`mailto:${userResumeData.email}`} className='text-decoration-none'>{userResumeData.email}</a>
                </Code></div>
              )
            }
            {userResumeData.address && (
              <div>Address: <Code>{userResumeData.address}</Code></div>
            )}
            {userResumeData.date_birth && (
              <div>Date of Birth: <Code>{userResumeData.date_birth}</Code></div>
            )}
            {
              Array.isArray(userResumeData.phone_number) ? (
                <div className={styles.userPhoneNumber}>Phone Numbers:
                  {userResumeData.phone_number && userResumeData.phone_number.map((num, index) => (
                    <Code key={index}>
                      <a href={`tel:+${num}`} className='text-decoration-none'>{num}</a>
                    </Code>
                  ))}
                </div>
              ) : (
                <div className={styles.userPhoneNumber}>Phone Numbers: <Code>
                  <a href={`tel:+${userResumeData.phone_number}`} className='text-decoration-none'>{userResumeData.phone_number}</a>
                </Code></div>
              )
            }
          </div>
          <div className={styles.userExperience}>
            <h1>Work Experience</h1>
            {userResumeData.major ? (
              <div>Major: <Code>{userResumeData.major}</Code></div>
            ) : (
              <div>Major: <Code>Not Available</Code></div>
            )}
            {userResumeData.experience ? (
              <div>Experience: <Code>{userResumeData.experience} years</Code></div>
            ) : (
              <div>Experience: <Code>Not Available</Code></div>
            )}
          </div>
          {userResumeData.skills > 0 ? (
            <div className={styles.userSkills}>
              <h1>Technologies, Skills</h1>
              <div>
                {userResumeData.skills && userResumeData.skills.map((skill, index) => (
                  <Code key={index}>{skill}</Code>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.userSkills}>
              <h1>Technologies, Skills</h1>
              <div>
                <Code>Not Available</Code>
              </div>
            </div>
          )}
          <div className={styles.userResumeContainer}>
            <h1>Resume</h1>
            <Button color='gray'
              onClick={() => setOpenResume(true)}
            ><EnvelopeOpenIcon />Open Resume</Button>
          </div>
        </div>
      </div >
    </>
  )
}

export default _ResumeDetails