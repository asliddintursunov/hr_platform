import { useCallback, useEffect, useState } from "react"
import styles from "../../styles/ResumeDetails.module.css"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/features/logoutUser"
import AnotherUser from "../Modals/AnotherUser"
import { useLocation, useNavigate } from "react-router-dom"
import PopUp from "../Modals/PopUp"
import { Button, Code, Table } from "@radix-ui/themes"
import { CaretLeftIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons"
import ResumeFile from "./ResumeFile"
import InternalError from "../Modals/InternalError"

function _ResumeDetails() {
  const [userResumeData, setUserResumeData] = useState([])
  const userRole = localStorage.getItem("userRole")
  const userId = localStorage.getItem("userId")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const prevPage = location.pathname.split("/").splice(0, 3).join("/")
  const resumeUserId = useSelector((state) => state.resumeUsername.resumeId)

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [openResume, setOpenResume] = useState(false)
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)
  const [longAbout, setLongAbout] = useState("")

  // Token Expired Validation
  const tokenExpired = useCallback(
    (info) => {
      setIsOpen(true)
      setErrorOccured(true)
      setPopupInfo(info)
      setTimeout(() => {
        localStorage.clear()
        navigate("/signin")
      }, 1500)
    },
    [navigate]
  )

  useEffect(() => {
    axios
      .get(`${baseUrl}` + "/search/" + resumeUserId, {
        headers: {
          "X-UserRole": userRole,
          "X-UserId": userId
        }
      })
      .then((res) => {
        setUserResumeData(res.data[0])
        if (res.data[0].about.length > 80) {
          for (let i = 0; i < Math.ceil(res.data[0].about.length / 80); i++) {
            setLongAbout(
              (prev) =>
                prev +
                res.data[0].about
                  .split("")
                  .splice(i * 80, 80)
                  .join("") +
                "\n"
            )
          }
        }
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
  }, [resumeUserId, tokenExpired])
  return (
    <>
      {closeInternalErrorModal && <InternalError />}
      {openResume && <ResumeFile setOpenResume={setOpenResume} resume={userResumeData.resume} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      <div className={`${styles.resumeDetailsContainer}`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <div className={styles.resumeDetailsWrapper}>
          <h1 className="display-3">Resume Details</h1>
          <div className={styles.userGeneralData}>
            <Button color="gray" variant="ghost" className={styles.backButton} onClick={() => navigate(prevPage)}>
              Back <CaretLeftIcon />
            </Button>
            <h1>General Information</h1>
            {userResumeData.fullname && (
              <div>
                Full Name: <Code>{userResumeData.fullname}</Code>
              </div>
            )}
            {userResumeData.username && (
              <div>
                Username: <Code>{userResumeData.username}</Code>
              </div>
            )}
            {userResumeData.email && (
              <div>
                Email:{" "}
                <Code>
                  <a target="_blank" href={"https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=" + userResumeData.email} className="text-decoration-none">
                    {userResumeData.email}
                  </a>
                </Code>
              </div>
            )}
            {userResumeData.address && (
              <div>
                Address: <Code>{userResumeData.address}</Code>
              </div>
            )}
            {userResumeData.date_birth && (
              <div>
                Date of Birth: <Code>{userResumeData.date_birth}</Code>
              </div>
            )}
            {Array.isArray(userResumeData.phone_number) ? (
              <div className={styles.userPhoneNumber}>
                Phone Numbers:
                {userResumeData.phone_number &&
                  userResumeData.phone_number.map((num, index) => (
                    <Code key={index}>
                      <a href={`tel:+${num}`} className="text-decoration-none">
                        {num}
                      </a>
                    </Code>
                  ))}
              </div>
            ) : (
              <div className={styles.userPhoneNumber}>
                Phone Numbers:
                <Code>
                  <a href={`tel:+${userResumeData.phone_number}`} className="text-decoration-none">
                    {userResumeData.phone_number}
                  </a>
                </Code>
              </div>
            )}
            {userResumeData.about && <div className="text-start">About: {userResumeData.about.length > 80 ? <Code>{longAbout}</Code> : <Code>{userResumeData.about}</Code>}</div>}
            {userResumeData.degree_general && (
              <Table.Root
                variant="surface"
                mt="6"
                style={{
                  width: "100%",
                  fontSize: "1.6rem"
                }}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Major</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Education Year</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>University Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>University Location</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {userResumeData.degree_general.map((edu, index) => (
                    <Table.Row
                      key={index}
                      style={{
                        color: "gray",
                        fontWeight: "normal",
                        fontSize: "1.6rem"
                      }}
                    >
                      <Table.Cell>{edu.degree}</Table.Cell>
                      <Table.Cell>{edu.universityMajor}</Table.Cell>
                      <Table.Cell>
                        {edu.fromYear} - {edu.toYear}
                      </Table.Cell>
                      <Table.Cell>{edu.universityName}</Table.Cell>
                      <Table.Cell>{edu.universityLocation}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </div>
          <div className={styles.userExperience}>
            <h1>Work Experience</h1>
            {userResumeData.major ? (
              <div>
                Major: <Code>{userResumeData.major}</Code>
              </div>
            ) : (
              <div>
                Major: <Code>Not Available</Code>
              </div>
            )}
            {userResumeData.experience ? (
              <div>
                Experience: <Code>{userResumeData.experience} years</Code>
              </div>
            ) : (
              <div>
                Experience: <Code>Not Available</Code>
              </div>
            )}
          </div>
          {userResumeData.skills ? (
            <div className={styles.userSkills}>
              <h1>Technologies, Skills</h1>
              <div>{userResumeData.skills && userResumeData.skills.map((skill, index) => <Code key={index}>{skill}</Code>)}</div>
            </div>
          ) : (
            <div className={styles.userSkills}>
              <h1>Technologies, Skills</h1>
              <div>
                <Code>Not Available</Code>
              </div>
            </div>
          )}
          {userResumeData.resume && (
            <div className={styles.userResumeContainer}>
              <h1>Resume</h1>
              <Button color="gray" onClick={() => setOpenResume(true)}>
                <EnvelopeOpenIcon />
                Open Resume
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default _ResumeDetails
