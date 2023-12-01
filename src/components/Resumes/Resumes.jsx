import "../../app/App.css"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../../styles/Resumes.module.css"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { logoutUser } from "../../redux/features/userDataSlice"
import { useDispatch, useSelector } from "react-redux"
import AnotherUser from "../Modals/AnotherUser"
import PopUp from "../Modals/PopUp"
import { Text, Flex } from "@radix-ui/themes"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import ResumeList from "./ResumeList"
import Pagination from "./Pagination"
import InternalError from "../Modals/InternalError"

function Resumes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  useEffect(() => {
    if (isConnected) {
      socketInstance.disconnect()
    }
  }, [])

  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState("")
  const [major, setMajor] = useState("")
  const [optn, setOptn] = useState("")

  const [resumeData, setResumeData] = useState([])

  const Skills = [
    "typescript",
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
  const WorkExperience = ["0-1", "1-3", "3-6", "6+"]
  const Specializations = [
    "FullStack-developer",
    "Frontend-developer",
    "Backend-developer",
    "Mobile-developer",
    "Desktop-developer",
    "Design-UI/UX",
    "Data Science-developer",
    "DevOps-developer",
    "QA-developer",
    "Security-developer",
    "Intern-developer",
    "Other-developer"
  ]
  const SearchOptions = ["all", "users", "candidates"]

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")
  const [closeInternalErrorModal, setCloseInternalErrorModal] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)

  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")
  const [isPending, setIsPending] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(7)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage

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

  const sendData = () => {
    setResumeData([]);
    axios
      .post(
        `${baseUrl}/search`,
        {
          resumes: optn === "all" ? "all" : optn,
          skills: skills.length === 0 ? undefined : skills,
          major: major === "" ? undefined : major,
          experience: experience === "" ? undefined : experience,
        },
        {
          headers: {
            "X-UserRole": localStorage.getItem("userRole"),
            "X-UserId": localStorage.getItem("userId"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setResumeData(res.data.results);
  
        if (res.status === 500 || res.status === 0) {
          setCloseInternalErrorModal(true);
          return;
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.msg) {
          tokenExpired(err.response.data.msg);
        } else if (err.response && err.response.status === 401) {
          setWrongUser(true);
          setWrongUserData(err.response.data);
          dispatch(logoutUser());
        } else {
          console.error("Unexpected error:", err);
        }
      });
  };
  

  const getAllData = useCallback(() => {
    setIsPending(true)
    axios
      .post(
        `${baseUrl}/search`,
        {
          skills: undefined,
          major: undefined,
          experience: undefined
        },
        {
          headers: {
            "X-UserRole": localStorage.getItem("userRole"),
            "X-UserId": localStorage.getItem("userId")
          }
        }
      )
      .then((res) => {
        setIsPending(false)
        setResumeData(res.data.results)
      })
      .catch((err) => {
        setIsPending(false)
        if (err.request.status === 500 || err.request.status === 0) {
          setCloseInternalErrorModal(true)
          return
        }

        if (err.response.data.msg) {
          setWrongUser(true)
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })
  }, [])

  useEffect(() => {
    getAllData()
  }, [getAllData])

  const seeAllResumes = () => {
    setSelectedSkill(null)
    setSelectedExperience(null)
    setSelectedOption(null)
    setSkills([])
    setMajor("")
    setResumeData([])
    setExperience("")
    setOptn("")
    getAllData()
  }

  const KnowingSkills = (value) => {
    if (skills.includes(value)) {
      setSkills((prev) => prev.filter((hour) => hour !== value))
    } else {
      setSkills((prev) => [...prev, value])
    }
  }

  const ExperienceYears = (value) => {
    setExperience(value)
  }

  const MajorStudy = (value) => {
    setMajor(value)
  }

  const seeResumeDetail = (userID) => {
    localStorage.setItem("userResumeID", userID)
    navigate("./userResume")
  }

  const currentPosts = resumeData.slice(firstPostIndex, lastPostIndex)
  return (
    <>
      {isPending && <div className="loaderr"></div>}
      {closeInternalErrorModal && <InternalError setCloseInternalErrorModal={setCloseInternalErrorModal} />}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {!isPending && (
        <div className={`text-center ${styles.resumesPage} pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
          <div className={styles.header}>
            <div>
              <h1 className="display-2">Resumes</h1>
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
            <ResumeList
              // resumeData={resumeData}
              resumeData={currentPosts}
              seeResumeDetail={seeResumeDetail}
              firstPostIndex={firstPostIndex}
              lastPostIndex={lastPostIndex}
              currentPosts={currentPosts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postPerPage={postPerPage}
            />
            <aside className={styles.rightAside}>
              <form method="GET" onSubmit={(e) => e.preventDefault()}>
                <div className={styles.filterWrapper}>
                  <div className={styles.searchByName}>
                    <input type="text" />
                    <button>
                      <MagnifyingGlassIcon />
                    </button>
                  </div>

                  {/* ========= HERE THE API CHANGES ========= */}
                  <div className={styles.filterOptionsContainer}>
                    {SearchOptions &&
                      SearchOptions.map((option) => {
                        return (
                          <div key={option}>
                            <label>
                              <input
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                  display: "none"
                                }}
                                type="radio"
                                name="searchOptions"
                                value={option}
                                onChange={(e) => {
                                  setOptn(e.target.value)
                                  setSelectedOption(e.target.value)
                                }}
                                checked={selectedOption === option}
                              />
                              <h4>{option}</h4>
                              <span className={`${styles.radioCheckmark}`}></span>
                            </label>
                          </div>
                        )
                      })}
                  </div>

                  <div className={styles.filterByButton}>
                    <button type="submit" onClick={sendData}>
                      Filter
                    </button>
                    <button type="submit" onClick={seeAllResumes}>
                      All
                    </button>
                  </div>
                </div>
                <div className={`${styles.filterWrapper}`}>
                  <h3 className="mb-4">Specializations</h3>
                  <div className={styles.majorContainer}>
                    {Specializations &&
                      Specializations.map((type) => {
                        return (
                          <div key={type} className={styles.radioWrapper}>
                            <label style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", marginBottom: "10px" }}>
                              <input
                                className={styles.InputRadio}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                  display: "none"
                                }}
                                type="radio"
                                name="skills"
                                value={type.split("-")[0]}
                                onChange={(e) => {
                                  MajorStudy(e.target.value)
                                  setSelectedSkill(e.target.value)
                                }}
                                checked={selectedSkill === type.split("-")[0]}
                              />
                              <h4>{type.split("-")[0]}</h4>
                              <span className={`${styles.radioCheckmark}`}></span>
                            </label>
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className={styles.filterWrapper}>
                  <h3 className="mb-4">Work Experience</h3>
                  <div className={styles.workExperienceContainer}>
                    {WorkExperience &&
                      WorkExperience.map((type) => {
                        return (
                          <div key={type}>
                            <label style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                              <input
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                  display: "none"
                                }}
                                className={styles.InputRadio}
                                type="radio"
                                name="workexperience"
                                value={type}
                                onChange={(e) => {
                                  ExperienceYears(e.target.value)
                                  setSelectedExperience(e.target.value)
                                }}
                                checked={selectedExperience === type}
                              />
                              <span className={`${styles.radioCheckmark}`}></span>
                              <h4>{type} years</h4>
                            </label>
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className={`${styles.filterWrapper}`}>
                  <h3 className="mb-4">Languages / Technologies</h3>
                  <div className={styles.technalogyContainer}>
                    {Skills &&
                      Skills.map((type) => {
                        return (
                          <Flex key={type} mb="2" style={{ width: "120px" }}>
                            <Checkbox.Root className={styles.CheckboxRoot} id={type} onClick={(e) => KnowingSkills(e.target.id)} checked={skills.includes(type.split("-").join("").toLowerCase())}>
                              <Checkbox.Indicator className={styles.CheckboxIndicator}>
                                <CheckIcon />
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Text as="label" className={styles.Label} htmlFor={type}>
                              {type}
                            </Text>
                          </Flex>
                        )
                      })}
                  </div>
                </div>
              </form>
              <Pagination totalPost={resumeData.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} />
            </aside>
          </main>
        </div>
      )}
    </>
  )
}

export default Resumes
