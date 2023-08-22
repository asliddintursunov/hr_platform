import { useState } from 'react'
import styles from '../css/Resumes.module.css'
import useURL from '../hooks/useURL'
import axios from 'axios'
function _Resumes() {
  const { SearchResumesUrl } = useURL()

  var ResumeNumbers = []
  var ResumeSkills = []

  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState('')
  const [major, setMajor] = useState('')

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
    axios.post(SearchResumesUrl, {
      skills: skills.length === 0 ? undefined : skills,
      major: major === '' ? undefined : major,
      experience: experience === '' ? undefined : experience,
    })
      .then(res => {

        //* Getting numbers and skills!
        console.log(res);
        for (let i = 0; i < res.data.results.length; i++) {
          ResumeNumbers.push(res.data.results[i].phone_number.slice(2, -2))
          ResumeSkills.push(res.data.results[i].skills.slice(2, -2))
        }
        console.log(ResumeNumbers);
        console.log(ResumeSkills);
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
          Aside Left
        </aside>
        <aside className={styles.rightAside}>
          <form method='GET' onSubmit={(e) => e.preventDefault()}>
            <div className={styles.filterWrapper}>
              <input type="search" />
              <button type='submit' onClick={sendData}>
                <i className="bi bi-search"></i>
              </button>
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
      <footer className={styles.footer} style={{ backgroundColor: '#623CEA' }}>
        Footer
      </footer>
    </div>
  )
}

export default _Resumes