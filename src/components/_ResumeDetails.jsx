import { useEffect, useState } from 'react'
import styles from '../css/ResumeDetails.module.css'
import useURL from '../hooks/useURL'
import axios from 'axios'
function _ResumeDetails() {
  const { SearchResumesUrl } = useURL()
  const [userResumeData, setUserResumeData] = useState([])

  const userID = localStorage.getItem('userResumeID')

  useEffect(
    () => {
      axios.get(SearchResumesUrl + '/' + userID)
        .then(res => {
          console.log(res.data);
          console.log(res.data.skills);
          setUserResumeData(res.data)
        })
        .catch(err => console.log(err))
    }, [SearchResumesUrl, userID]
  )

  return (
    <div className={styles.resumeDetailsContainer} >
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
        <div>
          <h1>Resume</h1>
        </div>
      </div>
    </div>
  )
}

export default _ResumeDetails