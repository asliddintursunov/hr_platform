/* eslint-disable react/prop-types */
import styles from '../../../css/Additional.module.css'
function Edit_Skills({ changeProfile, skills, seeSkills }) {
  
  const frontend = [
    'typesctipt', 'javascript', 'react', 'vue', 'angular'
  ]
  const backend = [
    'cpp', 'java', 'cSharp', 'pyhton', 'nodeJS', 'php'
  ]
  const mobile = [
    'kotlin', 'swift'
  ]
  const desktop = [
    'cSharp', 'cpp', 'javascript'
  ]
  const ui_ux = [
    'figma'
  ]

  return (
    <div className={`form-control ${styles.skillsContainier}`}>
      {/* className={styles.frontendContainer} */}
      <div>
        <h3>Frontend</h3>
        {frontend && frontend.map(skill => (
          <div key={skill} className={styles.skillWrapper}>
            <label>
              <input
                disabled={!changeProfile ? true : false}
                type="checkbox"
                name={skill}
                id={skill}
                value={skill}
                onChange={e => seeSkills(e.target.value)}
                checked={skills.includes(skill)}
              />
              <span className={styles.checkboxSpan}></span>
              {skill.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
      {/* className={styles.backendContainer} */}
      <div>
        <h3>Backend</h3>
        {backend && backend.map(skill => (
          <div key={skill} className={styles.skillWrapper}>
            <label>
              <input
                disabled={!changeProfile ? true : false}
                type="checkbox"
                name={skill}
                id={skill}
                value={skill}
                onChange={e => seeSkills(e.target.value)}
                checked={skills.includes(skill)}
              />
              <span className={styles.checkboxSpan}></span>
              {skill.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
      {/* className={styles.mobileContainer} */}
      <div>
        <h3>Mobile</h3>
        {mobile && mobile.map(skill => (
          <div key={skill} className={styles.skillWrapper}>
            <label>
              <input
                disabled={!changeProfile ? true : false}
                type="checkbox"
                name={skill}
                id={skill}
                value={skill}
                onChange={e => seeSkills(e.target.value)}
                checked={skills.includes(skill)}
              />
              <span className={styles.checkboxSpan}></span>
              {skill.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
      {/* className={styles.desktopContainer} */}
      <div>
        <h3>Desktop</h3>
        {desktop && desktop.map(skill => (
          <div key={skill} className={styles.skillWrapper}>
            <label>
              <input
                disabled={!changeProfile ? true : false}
                type="checkbox"
                name={skill}
                id={skill}
                value={skill}
                onChange={e => seeSkills(e.target.value)}
                checked={skills.includes(skill)}
              />
              <span className={styles.checkboxSpan}></span>
              {skill.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
      {/* className={styles.designContainer} */}
      <div>
        <h3>Design</h3>
        {ui_ux && ui_ux.map(skill => (
          <div key={skill} className={styles.skillWrapper}>
            <label>
              <input
                disabled={!changeProfile ? true : false}
                type="checkbox"
                name={skill}
                id={skill}
                value={skill}
                onChange={e => seeSkills(e.target.value)}
                checked={skills.includes(skill)}
              />
              <span className={styles.checkboxSpan}></span>
              {skill.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Edit_Skills