import { useEffect, useState } from 'react'
import styles from '../css/Resumes.module.css'
function _Resumes() {
  const [workHours, setWorkHours] = useState([])
  const [experience, setExperience] = useState('')
  const [major, setMajor] = useState([])
  const EmploymentType = [
    'Fulltime', 'Parttime', 'To-be-discussed'
  ]
  const WorkExperience = [
    '1-3', '3-6', '6+'
  ]
  const Specializations = [
    'Website-developer', 'Frontend-developer', 'Backend-developer', 'Mobile-developer', 'Desktop-developer', 'Design-UI/UX'
  ]

  const workTime = (value) => {
    if (workHours.includes(value)) {
      setWorkHours(prev => prev.filter(hour => hour !== value))
    } else {
      setWorkHours(prev => [...prev, value])
    }
  }

  const ExperienceYears = (value) => {
    setExperience(value)
  }

  const MainPosition = (value) => {
    if (major.includes(value)) {
      setMajor(prev => prev.filter(majorP => majorP !== value))
    } else {
      setMajor(prev => [...prev, value])
    }
  }

  useEffect(() => { console.log(workHours); }, [workHours])
  useEffect(() => { console.log(experience); }, [experience])
  useEffect(() => { console.log(major); }, [major])
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
          <form method='GET'>
            <div className={styles.filterWrapper}>
              <input type="search" />
              <button type='submit'><i className="bi bi-search"></i></button>
            </div>
            <div className={styles.filterWrapper}>
              <h3>Employment Type</h3>
              {EmploymentType && EmploymentType.map(type => {
                return (
                  <div key={type}>
                    <label>
                      <input
                        type="checkbox"
                        value={type.split('-').join('').toLowerCase()}
                        onChange={(e) => { workTime(e.target.value) }}
                      />
                      {type.split('-').join(' ')}
                      <span className={styles.checkboxSpan}></span>
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
              <h3>Specializations</h3>
              {Specializations && Specializations.map(type => {
                return (
                  <div key={type}>
                    <label>
                      <input
                        type="checkbox"
                        value={type.split('-')[0]}
                        onChange={(e) => MainPosition(e.target.value)}
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