/* eslint-disable react/prop-types */
import { Text } from '@radix-ui/themes'
import styles from '../../../styles/Additional.module.css'
function EditSkills({ changeProfile, skills, seeSkills }) {

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
    <div className={styles.skillsContainier}>
      <div>
        <Text as='label' className='underlined-label'>Frontend</Text>
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
      <div>
        <Text as='label' className='underlined-label'>Backend</Text>
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
      <div>
        <Text as='label' className='underlined-label'>Mobile</Text>
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
      <div>
        <Text as='label' className='underlined-label'>Desktop</Text>
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
      <div>
        <Text as='label' className='underlined-label'>Design</Text >
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

export default EditSkills