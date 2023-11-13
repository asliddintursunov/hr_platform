import React, { useCallback, useEffect, useState } from "react"
import styles from "../../styles/HR_Register.module.css"
import '../Admin/Admin.css'
import "@radix-ui/themes/styles.css"
import { Button, Text, TextField } from "@radix-ui/themes"
import CandidateEducation from "./part/CandidateEducation"
import CandidateMajor from "./part/CandidateMajor"
import CandidateSkills from "./part/CandidateSkills"
import CandidateExperience from "./part/CandidateExperience"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import PopUp from "../Modals/PopUp"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../redux/features/userDataSlice"
import AnotherUser from "../Modals/AnotherUser"

function HR_Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")

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

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")
  // Token Expired Validation
  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.removeItem("token")
        localStorage.clear()
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  const CandidateInitialSkills = [
    'typesctipt', 'javascript', 'react', 'vue', 'angular',
    'nodeJS', 'php', 'rust', 'go', 'ruby',
    'cpp', 'java', 'spring', 'swing', 'cSharp', '.net',
    'pyhton', 'django', 'flask',
    'kotlin', 'swift', 'figma', 'adobe',
  ]

  function success(data) {
    setIsPending(false)
    setIsOpen(true)
    setErrorOccured(false)
    setPopupInfo(data)

    setCandidateFullName("")
    setCandidateEmail("")
    setCandidateAddress("")
    setCandidatePhoneNumber("")
    setCandidateEducation([])
    setMajor("")
    setCandidateExperience("0-1")
    setCustomTechList([])
    setSkills([])
    setCustomTech("Pascal")

  }
  function error(err) {
    setIsPending(false)
    setIsOpen(true)
    setErrorOccured(true)
    setPopupInfo(err)
  }

  const sendCandidateData = () => {
    setIsPending(true)
    console.log(candidateEducation);
    axios.post(`${baseUrl + '/resumes'}`, {
      fullname: candidateFullName,
      email: candidateEmail,
      address: candidateAddress,
      phone_number: candidatePhoneNumber,
      degree_general: candidateEducation,
      major: major,
      skills: skills,
      experience: candidateExperience,
    }, {
      headers: {
        'X-UserRole': memberRole,
        'X-UserId': memberId
      }
    })
      .then((res) => {
        console.log(res);
        success(res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
        error(err.response.data)
      })
  }

  useEffect(
    () => {
      axios.get(`${baseUrl}/resumes`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response.data.msg) {
            tokenExpired(err.response.data.msg)
          } else if (err.response.status === 401) {
            setWrongUser(true)
            setWrongUserData(err.response.data)
            dispatch(logoutUser())
          }
        })
    }, []
  )

  return (
    <>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <PopUp popupInfo={popupInfo} setIsOpen={setIsOpen} errorOccured={errorOccured} />}
      {isPending && <div className="loaderr"></div>}
      <h1 className="text-center display-3 mb-4">HR Register Title</h1>
      {!isPending &&
        (
          <div className={`${styles.HrRegisterContainer} pageAnimation`}
            style={{
              filter: isOpen || wrongUser ? "blur(4px)" : "blur(0)",
            }}
          >
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
                CandidateInitialSkills={CandidateInitialSkills}
              />
              <br />
              <CandidateExperience candidateExperience={candidateExperience} setCandidateExperience={setCandidateExperience} />
              <Button onClick={sendCandidateData} className={styles.AddUser}>Send</Button>
            </div>
            <div className={styles.UploadResumeContainer}></div>
          </div>
        )}
    </>
  )
}

export default HR_Register
