import "../Admin/Admin.css"
import styles from "../../styles/HR_Register.module.css"
import "@radix-ui/themes/styles.css"
import axios from "axios"
import React, { useCallback, useEffect, useState, useRef } from "react"
import { Button, Text, TextField } from "@radix-ui/themes"
import CandidateEducation from "./part/CandidateEducation"
import CandidateMajor from "./part/CandidateMajor"
import CandidateSkills from "./part/CandidateSkills"
import CandidateExperience from "./part/CandidateExperience"
import { baseUrl } from "../../utils/api"
import PopUp from "../Modals/PopUp"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../redux/features/userDataSlice"
import AnotherUser from "../Modals/AnotherUser"
import { UploadIcon } from "@radix-ui/react-icons"
import PhoneInput from "react-phone-input-2"
import InternalError from "../Modals/InternalError"
import "react-phone-input-2/lib/style.css"

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
  const [candidateBirthDate, setCandidateBirthDate] = useState("")

  const [customTechList, setCustomTechList] = useState([])
  const [skills, setSkills] = useState([])
  const [customTech, setCustomTech] = useState("Pascal")
  const [candidateResume, setCandidateResume] = useState(null)

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")
  const [emptyFields, setEmptyFields] = useState(false)

  const [percentage, setPercentage] = useState(0)
  const full = useRef(null)
  const value = useRef(0)
  const [isOnProgress, setIsOnProgress] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)

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
    "typesctipt",
    "javascript",
    "react",
    "vue",
    "angular",
    "nodeJS",
    "php",
    "rust",
    "go",
    "ruby",
    "cpp",
    "java",
    "spring",
    "swing",
    "cSharp",
    ".net",
    "pyhton",
    "django",
    "flask",
    "kotlin",
    "swift",
    "figma",
    "adobe"
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
    if (
      candidateFullName &&
      candidateEmail &&
      candidateAddress &&
      candidatePhoneNumber &&
      candidateEducation.length > 0 &&
      major &&
      skills &&
      candidateExperience &&
      candidateBirthDate &&
      candidateResume
    ) {
      setIsPending(true)
      setEmptyFields(false)
      axios
        .post(
          `${baseUrl + "/resumes"}`,
          {
            fullname: candidateFullName,
            email: candidateEmail,
            address: candidateAddress,
            birth_date: candidateBirthDate,
            phone_number: candidatePhoneNumber,
            degree_general: candidateEducation,
            major: major,
            skills: skills,
            experience: candidateExperience,
            resume: candidateResume
          },
          {
            headers: {
              "X-UserRole": memberRole,
              "X-UserId": memberId
            }
          }
        )
        .then((res) => {
          success(res.data)
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setCloseInternalErrorModal(true)
            return
          }

          if (err.response.data.msg) {
            tokenExpired(err.response.data.msg)
          } else if (err.response.status === 401) {
            setWrongUser(true)
            setWrongUserData(err.response.data)
            dispatch(logoutUser())
          }
          error(err.response.data)
        })
    } else {
      setEmptyFields(true)
    }
  }

  useEffect(() => {
    axios
      .get(`${baseUrl}/resumes`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        console.log(res.status)
      })
      .catch((err) => {
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }

        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })
  }, [])

  const progressBar = useCallback(() => {
    let progress = setInterval(() => {
      setIsOnProgress(true)
      full.current = Math.floor(Math.random() * 10 + 1)

      value.current += full.current

      if (value.current >= 100) {
        value.current = 100
        setPercentage(value.current)
        clearInterval(progress)
        setIsDone(true)
        setTimeout(() => {
          setIsDone(false), setIsOnProgress(false)
        }, 1500)
      } else {
        setPercentage(value.current)
      }
    }, 100)

    return () => {
      if (value.current) {
        clearInterval(progress)
        value.current = null
      }
    }
  }, [])

  const handleUploadResume = (event) => {
    const file = event.target.files[0]

    localStorage.setItem("fileName", file.name)

    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result
      setCandidateResume(base64String)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {closeInternalErrorModal && <InternalError setCloseInternalErrorModal={setCloseInternalErrorModal} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <PopUp popupInfo={popupInfo} setIsOpen={setIsOpen} errorOccured={errorOccured} />}
      {emptyFields && <PopUp popupInfo={"Make Sure You Filled All Fields!"} setIsOpen={setEmptyFields} errorOccured={true} />}
      {isPending && <div className="loaderr"></div>}
      <h1 className="text-center display-3 mb-4">HR Register Title</h1>
      {!isPending && (
        <div
          className={`${styles.HrRegisterContainer} pageAnimation`}
          style={{
            filter: isOpen || wrongUser ? "blur(4px)" : "blur(0)"
          }}
        >
          <div style={{ boxShadow: "inset 0 0 3px 0 rgba(0, 0, 0, 0.2)", padding: "2rem 3rem" }}>
            <div className={styles.FullNameEmailContainer}>
              <Text as="label">
                Full Name
                <TextField.Input type="text" variant="surface" placeholder="John Doe" value={candidateFullName} onChange={(e) => setCandidateFullName(e.target.value)} />
              </Text>
              <Text as="label">
                Email
                <TextField.Input type="email" variant="surface" placeholder="example@gmail.com" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} />
              </Text>
            </div>
            <div className={styles.AddressPhoneNumberContainer}>
              <Text as="label">
                Addess
                <TextField.Input type="text" variant="surface" placeholder="Manhattan, New York" value={candidateAddress} onChange={(e) => setCandidateAddress(e.target.value)} />
              </Text>
              <Text as="div">
                <Text as="label">
                  Phone Number
                  <PhoneInput
                    value={candidatePhoneNumber}
                    style={{ width: "100%" }}
                    country="uz"
                    type="text"
                    onChange={(e) => setCandidatePhoneNumber(e)}
                    inputProps={{
                      required: true
                    }}
                  />
                </Text>
                <Text as="label">
                  Date of Birth
                  <TextField.Input type="date" variant="surface" placeholder="01/01/2000" value={candidateBirthDate} onChange={(e) => setCandidateBirthDate(e.target.value)} />
                </Text>
              </Text>
            </div>
          </div>
          <div className={styles.UniversityContainer}>
            <CandidateEducation candidateEducation={candidateEducation} setCandidateEducation={setCandidateEducation} />
          </div>
          <div className={styles.MajorSkillsExperienceContainer}>
            <CandidateMajor major={major} setMajor={setMajor} />
            <br />
            <CandidateSkills
              customTechList={customTechList}
              setCustomTechList={setCustomTechList}
              skills={skills}
              setSkills={setSkills}
              customTech={customTech}
              setCustomTech={setCustomTech}
              CandidateInitialSkills={CandidateInitialSkills}
            />
            <br />
            <CandidateExperience candidateExperience={candidateExperience} setCandidateExperience={setCandidateExperience} />
          </div>
          <div className={styles.UploadResumeContainer}>
            <div>
              <input
                style={{ width: "14rem" }}
                accept="application/pdf"
                type="file"
                name="file"
                id="file"
                className={styles.InputFile}
                onChange={(file) => {
                  handleUploadResume(file)
                  full.current = null
                  value.current = 0
                  setIsOnProgress(false)
                  setPercentage(0)
                  setTimeout(() => {
                    progressBar()
                  }, 100)
                }}
              />
              <Button>
                <UploadIcon /> Upload Resume
              </Button>
              <Button onClick={sendCandidateData} className={styles.AddUser}>
                Send
              </Button>
              <div
                style={{
                  marginTop: "1rem",
                  maxWidth: "30%"
                }}
              >
                {isOnProgress && (
                  <div className="p-bar-container">
                    <div className="p-bar" style={{ width: percentage + "%" }}></div>
                  </div>
                )}
                {isDone && <span>Done😀</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default HR_Register
