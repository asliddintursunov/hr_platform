import React from 'react'
import styles from '../../styles/Resumes.module.css'
import { Button } from '@radix-ui/themes'

function ResumeList({ resumeData, seeResumeDetail }) {
  console.log(resumeData);
  // const resumeDataSkills = resumeData[4]
  // console.log(typeof resumeDataSkills.skills.slice(1, -1).split(', '));
  // console.log(resumeDataSkills.skills.slice(1, -1).split(', '));
  return (
    <aside className={styles.leftAside}>
      {resumeData.length === 0 && <h1 className="display-4 text-secondary">No Suitable CV</h1>}
      {resumeData.length > 0 &&
        resumeData.map((resume, index) => {
          return (
            <div key={index} className={styles.resumeCard}>
              <div className={styles.resumeCardMajor}>
                <h2>{resume.major ? resume.major : 'Not available'}</h2>
              </div>
              <div className={styles.resumeCardSkills}>{resume.skills && resume.skills.map((skill, index) => <code key={index}>{skill}</code>)}</div>
              <div className={styles.resumeCardMore}>
                <div className={styles.resumeCardUsername}>
                  <span>Username</span>
                  <p>{resume.username ? resume.username : resume.fullname}</p>
                </div>
                <div className={styles.resumeCardExperience}>
                  <span>Experience</span>
                  <h3>{resume.experience ? resume.experience : 'Not available'}</h3>
                </div>
                <div className={styles.resumeCVCard}>
                  <span>Full Resume</span>
                  <Button onClick={() => seeResumeDetail(resume.id)} variant="surface">See</Button>
                </div>
              </div>
            </div>
          )
        })}
    </aside>
  )
}

export default ResumeList