import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Resumes.module.css'
import axios from 'axios'
import { baseUrl } from '../utils/api'
import { logoutUser, sendHeaders } from '../features/userDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import AnotherUser from './modal/AnotherUser'
import _PopUp from './_PopUp'

function _Resumes() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  useEffect(
    () => {
      if (isConnected) {
        console.log(isConnected + " Disconnected");
        socketInstance.disconnect();
      }
    }, []
  )
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState('')
  const [major, setMajor] = useState('')

  const [resumeData, setResumeData] = useState([])

  const Skills = [
    'typesctipt', 'javascript', 'react', 'vue', 'angular',
    'java', 'cSharp', 'pyhton', 'nodeJS', 'php',
    'kotlin', 'swift', 'cpp', 'figma'
  ]
  const WorkExperience = [
    '1-3', '3-6', '6+'
  ]
  const Specializations = [
    'FullStack-developer', 'Frontend-developer', 'Backend-developer', 'Mobile-developer', 'Desktop-developer', 'Design-UI/UX'
  ]

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  useEffect(
    () => {
      dispatch(sendHeaders())
    }, []
  )

  // Token Expired Validation
  const tokenExpired = useCallback((info) => {
    setIsOpen(true)
    setErrorOccured(true)
    setPopupInfo(info)
    setTimeout(() => {
      localStorage.clear()
      navigate('/signin')
    }, 1500);
  }, [navigate])

  const sendData = () => {
    setResumeData([])
    axios.post(`${baseUrl}/search`, {
      skills: skills.length === 0 ? undefined : skills,
      major: major === '' ? undefined : major,
      experience: experience === '' ? undefined : experience,
    }, {
      // headers: head
      headers: {
        'X-UserRole': localStorage.getItem('userRole'),
        'X-UserId': localStorage.getItem('userId')
      }
    })
      .then(res => {
        setResumeData(res.data.results)
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
  }

  const seeAllResumes = () => {

    setSelectedSkill(null);
    setSelectedExperience(null);
    setSkills([])
    setMajor('')
    setResumeData([])
    setExperience('')

    axios.post(`${baseUrl}/search`, {
      skills: undefined,
      major: undefined,
      experience: undefined
    }, {
      // headers: head
      headers: {
        'X-UserRole': localStorage.getItem('userRole'),
        'X-UserId': localStorage.getItem('userId')
      }
    })
      .then(res => {
        setResumeData(res.data.results)
      })
      .catch(err => {
        if (err.response.data.msg) {
          setWrongUser(true)
          tokenExpired(err.response.data.msg)
        }
        else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })
  }

  const KnowingSkills = (value) => {
    if (skills.includes(value)) {
      setSkills(prev => prev.filter(hour => hour !== value))
    } else {
      setSkills(prev => [...prev, value])
    }
  }

  const ExperienceYears = (value) => {
    setExperience(value)
  }

  const MajorStudy = (value) => {
    setMajor(value)
  }

  useEffect(
    () => {
      axios.post(`${baseUrl}/search`, {
        skills: undefined,
        major: undefined,
        experience: undefined
      }, {
        // headers: head
        headers: {
          'X-UserRole': localStorage.getItem('userRole'),
          'X-UserId': localStorage.getItem('userId')
        }
      })
        .then(res => {
          setResumeData(res.data.results)
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.msg) {
            setWrongUser(true)
            tokenExpired(err.response.data.msg)
          }
          else if (err.response.status === 401) {
            setWrongUser(true)
            setWrongUserData(err.response.data)
            dispatch(logoutUser())
          }
        })
    }, [tokenExpired]
  )

  const seeResumeDetail = (userID) => {
    localStorage.setItem('userResumeID', userID)
    navigate('./userResume')
  }

  return (
    <>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <div className={`text-center ${styles.resumesPage} pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className={styles.header}>
          <div>
            <h1 className='display-2'>Resumes</h1>
            <div>
              <span>CV&nbsp;&#x2f;&nbsp;IT Jobs</span>
            </div>
            <div>
              <strong>User Resumes</strong>
              <strong>Resumes of people who are looking for an IT job</strong>
            </div>
          </div>
        </div>
        <main className={styles.main}>
          <aside className={styles.leftAside}>
            {resumeData.length === 0 && <h1 className='display-4 text-secondary'>No Suitable CV</h1>}
            {resumeData.length > 0 && resumeData.map((resume) => {
              return (
                <div key={resume.id} className={styles.resumeCard}>
                  <div className={styles.resumeCardMajor}>
                    <h2>{resume.major}</h2>
                  </div>
                  <div className={styles.resumeCardSkills}>
                    {resume.skills && resume.skills.slice(2, -1).map((skill, index) => (
                      <code key={index}>{skill}</code>
                    ))}
                  </div>
                  <div className={styles.resumeCardMore}>
                    <div className={styles.resumeCardUsername}>
                      <span>Username</span>
                      <p>{resume.username}</p>
                    </div>
                    <div className={styles.resumeCardExperience}>
                      <span>Experience</span>
                      <h3>{resume.experience}</h3>
                    </div>
                    <div className={styles.resumeCVCard}>
                      <span>Full Resume</span>
                      <button onClick={() => seeResumeDetail(resume.id)}>See</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </aside>
          <aside className={styles.rightAside}>
            <form method='GET' onSubmit={(e) => e.preventDefault()}>
              <div className={styles.filterWrapper}>
                <button type='submit' onClick={sendData}>Filter</button>
                <button type='submit' onClick={seeAllResumes}>All</button>
              </div>
              <div className={styles.filterWrapper}>
                <h3>Specializations</h3>
                {Specializations && Specializations.map(type => {
                  return (
                    <div key={type} className={styles.radioWrapper}>
                      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                          className={styles.InputRadio}
                          style={{
                            cursor: 'pointer',
                            marginRight: '5px',
                          }}
                          type="radio"
                          name="skills"
                          value={type.split('-')[0]}
                          onChange={(e) => {
                            MajorStudy(e.target.value)
                            setSelectedSkill(e.target.value)
                            console.log(e.target.value)
                          }}
                          checked={selectedSkill === type.split('-')[0]}
                        />
                        <h4>{type.split('-')[0]}</h4>
                        {/* <span className={`${styles.radioCheckmark}`}></span> */}
                      </label>
                    </div>
                  )
                })}
              </div>
              <div className={styles.filterWrapper}>
                <h3>Work Experience</h3>
                {WorkExperience && WorkExperience.map(type => {
                  return (
                    <div key={type}>
                      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                          style={{
                            cursor: 'pointer',
                            marginRight: '5px',
                          }}
                          className={styles.InputRadio}
                          type="radio"
                          name="workexperience"
                          value={type}
                          onChange={(e) => {
                            ExperienceYears(e.target.value)
                            setSelectedExperience(e.target.value)
                          }}
                          checked={selectedExperience === type}
                        />
                        {/* <span className={`${styles.radioCheckmark}`}></span> */}
                        <h4>{type} years</h4>
                      </label>
                    </div>
                  )
                })}
              </div>
              <div className={styles.filterWrapper}>
                <h3>Languages / Technologies</h3>
                {Skills && Skills.map(type => {
                  return (
                    <div key={type} style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          value={type.split('-').join('').toLowerCase()}
                          onChange={(e) => { KnowingSkills(e.target.value) }}
                          checked={skills.includes(type.split('-').join('').toLowerCase())}
                          style={{
                            cursor: 'pointer',
                            marginRight: '5px',
                          }}
                        />
                        <h4>{type.split('-').join(' ')}</h4>
                        {/* <span className={styles.checkboxSpan}></span> */}
                      </label>
                    </div>
                  )
                })}
              </div>
            </form>
          </aside>
        </main>
      </div>
    </>
  )
}

export default _Resumes