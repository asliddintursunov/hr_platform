import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Resumes.module.css'
import axios from 'axios'
import { baseUrl } from '../utils/api'
function _Resumes() {

  const navigate = useNavigate()

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

  const sendData = () => {
    setResumeData([])

    axios.post(`${baseUrl}/search`, {
      skills: skills.length === 0 ? undefined : skills,
      major: major === '' ? undefined : major,
      experience: experience === '' ? undefined : experience,
    })
      .then(res => {
        setResumeData(res.data.results)
        console.log(res);

      })
      .catch(err => console.error(err))
  }

  const seeAllResumes = () => {
    setResumeData([])

    axios.post(`${baseUrl}/search`, {
      skills: undefined,
      major: undefined,
      experience: undefined
    })
      .then(res => {
        setResumeData(res.data.results)
        console.log(res);
      })
      .catch(err => console.error(err))
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
      })
        .then(res => {
          setResumeData(res.data.results)
        })
        .catch(err => console.error(err))
    }, []
  )

  const seeResumeDetail = (userID) => {
    localStorage.setItem('userResumeID', userID)
    navigate('./userResume')
  }

  return (
    <div className={`text-center ${styles.resumesPage} pageAnimation`}>
      <div className={styles.header} style={{}}>
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
                  <div key={type}>
                    <label>
                      <input
                        type="radio"
                        name="skills"
                        value={type.split('-')[0]}
                        onChange={(e) => MajorStudy(e.target.value)}
                      />
                      <span className={`${styles.radioCheckmark}`}></span>
                      {type.split('-').join(' ')}
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
                    <label>
                      <input
                        type="radio"
                        name="workexperience"
                        value={type}
                        onChange={(e) => ExperienceYears(e.target.value)}
                      />
                      <span className={`${styles.radioCheckmark}`}></span>
                      {type} years
                    </label>
                  </div>
                )
              })}
            </div>
            <div className={styles.filterWrapper}>
              <h3>Languages / Technologies</h3>
              {Skills && Skills.map(type => {
                return (
                  <div key={type}>
                    <label>
                      <input
                        type="checkbox"
                        value={type.split('-').join('').toLowerCase()}
                        onChange={(e) => { KnowingSkills(e.target.value) }}
                      />
                      {type.split('-').join(' ')}
                      <span className={styles.checkboxSpan}></span>
                    </label>
                  </div>
                )
              })}
            </div>
          </form>
        </aside>
      </main>
    </div>
  )
}

export default _Resumes