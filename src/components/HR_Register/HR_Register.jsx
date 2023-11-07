import React, { useState } from "react"
import styles from "../../styles/HR_Register.module.css"
import "@radix-ui/themes/styles.css"
import { Button, Text, TextField } from "@radix-ui/themes"
import CandidateEducation from "./part/CandidateEducation"
import CandidateMajor from "./part/CandidateMajor"
import CandidateSkills from "./part/CandidateSkills"
import CandidateExperience from "./part/CandidateExperience"

function HR_Register() {
  const [candidateFullName, setCandidateFullName] = useState("")
  const [candidateEmail, setCandidateEmail] = useState("")
  const [candidateAddress, setCandidateAddress] = useState("")
  const [candidatePhoneNumber, setCandidatePhoneNumber] = useState("")
  const [candidateEducation, setCandidateEducation] = useState([])
  const [major, setMajor] = useState("")
  const [candidateExperience, setCandidateExperience] = useState("0-1")

  const [customTechList, setCustomTechList] = useState([])
  const [skills, setSkills] = useState([])
  const [customTech, setCustomTech] = useState("Pascal")

  const addUser = () => {
    if (customTechList.length > 0 && !skills.includes(customTech)) {
      setSkills((prev) => [...prev, ...customTechList])
    }

    setTimeout(() => {
      setCustomTechList([])
      setSkills([])
    }, 0);

  }
  return (
    <>
      <h1 className="text-center display-3 mb-4">HR Register Title</h1>
      <div className={`${styles.HrRegisterContainer} pageAnimation`}>
        <div style={{ boxShadow: 'inset 0 0 3px 0 rgba(0, 0, 0, 0.2)', padding: '2rem 3rem' }}>
          <div className={styles.FullNameEmailContainer}>
            <Text as="label">
              Full Name
              <TextField.Input
                type="text"
                variant="surface"
                placeholder="John Doe"
                value={candidateFullName}
                onChange={(e) => setCandidateFullName(e.target.value)}
              />
            </Text>
            <Text as="label">
              Email
              <TextField.Input
                type="email"
                variant="surface"
                placeholder="example@gmail.com"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
            </Text>
          </div>
          <div className={styles.AddressPhoneNumberContainer}>
            <Text as="label">
              Addess
              <TextField.Input
                type="text"
                variant="surface"
                placeholder="Manhattan, New York"
                value={candidateAddress}
                onChange={(e) => setCandidateAddress(e.target.value)}
              />
            </Text>
            <Text as="label">
              Phone Number
              <TextField.Input
                type="text"
                variant="surface"
                placeholder="+1 234 567 89 00"
                value={candidatePhoneNumber}
                onChange={(e) => setCandidatePhoneNumber(e.target.value)}
              />
            </Text>
          </div>
        </div>
        <div className={styles.UniversityContainer}>
          <CandidateEducation candidateEducation={candidateEducation} setCandidateEducation={setCandidateEducation} />
        </div>
        <div className={styles.MajorSkillsExperienceContainer}>
          <CandidateMajor major={major} setMajor={setMajor} />
          <br />
          <CandidateSkills customTechList={customTechList} setCustomTechList={setCustomTechList}
            skills={skills} setSkills={setSkills} customTech={customTech} setCustomTech={setCustomTech}
          />
          <br />
          <CandidateExperience candidateExperience={candidateExperience} setCandidateExperience={setCandidateExperience} />
          <Button onClick={addUser} className={styles.AddUser}>Send</Button>
        </div>
        <div className={styles.UploadResumeContainer}></div>
      </div>
    </>
  )
}

export default HR_Register
