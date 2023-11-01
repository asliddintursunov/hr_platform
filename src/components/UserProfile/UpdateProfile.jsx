import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { googleLogout } from "@react-oauth/google"
import axios from "axios"
import styles from "../../styles/EditProfile.module.css"
import { logoutUser } from "../../redux/features/userDataSlice"
import { Tabs, Box, Heading, Text, Code, Avatar } from "@radix-ui/themes"

// Custon Hooks
import { useUsername } from "../../hooks/useUsername"
import { usePassword } from "../../hooks/usePassword"
import { useEmail } from "../../hooks/useEmail"
import { baseUrl } from "../../utils/api"

// Components
import EditFullName from "./part/EditFullName"
import EditUserName from "./part/EditUserName"
import EditEmail from "./part/EditEmail"
import EditPassword from "./part/EditPassword"
import EditAddress from "./part/EditAddress"
import EditDateOfBirth from "./part/EditDateOfBirth"
import EditUploadImage from "./part/EditUploadImage"
import AddPhoneNumber from "./part/AddPhoneNumber"
import EditBio from "./part/EditBio"
import LogOutModal from "../Modals/LogOutModal"
import PopUp from "../Modals/PopUp"
import EditMajor from "./part/EditMajor"
import EditSkills from "./part/EditSkills"
import EditExperience from "./part/EditExperience"
import EditResume from "./part/EditResume"
import AnotherUser from "../Modals/AnotherUser"
import EditUniversity from "./part/EditUniversity"
import EditCustonTech from "./part/EditCustonTech"

const ButtonFunction = (props) => {
  return (
    <div className={styles.right}>
      <div>
        <button className={`btn ${styles.logOutBtn}`} onClick={() => props.toggleModal()}>
          <i className="bi bi-box-arrow-right"></i> Log Out
        </button>
      </div>
      <div className={styles.btnStyles}>
        {!props.changeProfile && (
          <button className={`btn ${styles.editBtn}`} onClick={() => props.setChangeProfile(true)}>
            Edit Profile
          </button>
        )}
        {props.changeProfile && (
          <button
            className={`btn ${styles.saveBtn}`}
            onClick={() => {
              props.setChangeProfile(false)
              props.saveEdition()
            }}
          >
            Save Changes
          </button>
        )}
        {props.changeProfile && (
          <button
            className={`btn ${styles.cancelBtn}`}
            onClick={() => {
              props.setChangeProfile(false)
              props.CancleEdition()
            }}
          >
            Cancel Edition
          </button>
        )}
      </div>
    </div>
  )
}

function UpdateProfile() {
  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  // Redirect user to another page
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // Custom useUsername Hook
  const { usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus, usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle } = useUsername()
  // Custom usePassword Hook
  const { passwordValue, setPasswordValue, validPasswordChecker, passwordTrue, setPasswordTrue, passwordType, setPasswordType, passwordChecker, passwordInputStyle } = usePassword()
  // Custom Email Hook
  const { emailValue, setEmailValue, validEmailChecker, emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle } = useEmail()

  // Full Name, Address, DateOfBirth values
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [data, set_data] = useState({})
  const [joined, setJoined] = useState("")
  const [bio, setBio] = useState("")

  // Disable && Enable inputs
  const [changeProfile, setChangeProfile] = useState(false)

  // Add Phone Number
  const [numbers, setNumbers] = useState([])
  const [newNumber, setNewNumber] = useState("998")

  // Additional Values
  const [major, setMajor] = useState("")
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState([])
  const [customTechList, setCustomTechList] = useState([])
  const [userResume, setUserResume] = useState(null)
  const [education, setEducation] = useState([])

  // Loader
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false)
  const [popupInfo, setPopupInfo] = useState("")
  const [errorOccured, setErrorOccured] = useState("")

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState("")

  useEffect(() => {
    if (isConnected) {
      socketInstance.disconnect()
    }
  }, [])

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

  const handleAddNewNumber = (e) => {
    e.preventDefault()
    setNumbers((prev) => [...prev, Number(newNumber)])

    setNewNumber("998")
  }

  const handleDelete = (number) => {
    setNumbers((prev) => {
      return prev.filter((num) => num !== number)
    })
  }

  // Change Profile Image === Working
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result
      setSelectedImage(base64String)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleResumeChange = (event) => {
    const file = event.target.files[0]

    localStorage.setItem("fileName", file.name)

    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result
      setUserResume(base64String)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  // Cancle Edition === Working
  const CancleEdition = useCallback(() => {
    setIsPending(true)
    axios
      .get(`${baseUrl}/user/${memberId}`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        setJoined(res.data.joined)
        set_data(res.data)
        setFullName(res.data.fullname)
        setUsernameValue(res.data.username)
        setEmailValue(res.data.email)
        // setPasswordValue(res.data.password)
        setAddress(res.data.address)
        setDateOfBirth(res.data.date_birth)
        setSelectedImage(res.data.profile_photo)
        setUserResume(res.data.resume)
        setNumbers(res.data.phone_number)
        setMajor(res.data.major)
        setExperience(res.data.experience)
        setSkills(res.data.skills)
        setIsPending(false)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
        setIsPending(false)
      })
  }, [setFullName, setUsernameValue, setEmailValue, setAddress, setDateOfBirth, setSelectedImage, tokenExpired])

  useEffect(() => {
    CancleEdition()
  }, [CancleEdition])

  // Save Edition === Working
  const saveEdition = useCallback(() => {
    axios
      .patch(
        `${baseUrl}/update_profile/${localStorage.getItem("userId")}`,
        {
          fullname: data.fullname !== fullName ? fullName : undefined,
          // username: data.username !== usernameValue ? usernameValue : undefined,
          username: usernameValue,
          email: data.email !== emailValue ? emailValue : undefined,
          password: passwordValue !== "" ? passwordValue : undefined,
          address: data.address !== address ? address : undefined,
          date_birth: data.date_birth !== dateOfBirth ? dateOfBirth : undefined,
          phone_number: data.phone_number !== numbers ? numbers : undefined,
          profile_photo: data.profile_photo !== selectedImage ? selectedImage : undefined,
          resume: data.resume !== userResume ? userResume : undefined,
          major: data.major !== major ? major : undefined,
          experience: data.experience !== experience ? experience : undefined,
          skills: data.skills !== skills ? skills : undefined
        },
        {
          headers: {
            "X-UserRole": memberRole,
            "X-UserId": memberId
          }
        }
      )
      .then((res) => {
        setIsOpen(true)
        setPopupInfo(res.data)
        setErrorOccured(false)
      })
      .catch((err) => {
        setIsOpen(true)

        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        } else {
          setErrorOccured(true)
          setPopupInfo(err.response.data)
        }
      })
  }, [fullName, usernameValue, emailValue, passwordValue, address, dateOfBirth, selectedImage, numbers, data, major, experience, skills, userResume])

  // Log Out === Working
  const logOut = () => {
    googleLogout()
    axios
      .get(`${baseUrl}/logout/${memberId}`, {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        }
      })
      .then((res) => {
        setIsOpen(true)

        setErrorOccured(false)
        setPopupInfo(res.data)

        setTimeout(() => {
          navigate("/signin")
        }, 1500)
        localStorage.clear()
      })
      .catch((err) => {
        setIsOpen(true)
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        } else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }
      })
  }
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  // =========== Additional Skills ==========
  const seeSkills = (value) => {
    if (skills.includes(value)) {
      setSkills((prev) => prev.filter((skill) => skill !== value))
    } else {
      setSkills((prev) => [...prev, value])
    }
  }

  // For Major
  const seeMajor = (value) => {
    setMajor(value)
  }

  // For Experience
  const seeExperience = (value) => {
    setExperience(value)
  }

  // ###########################################################333
  return (
    <>
      {isPending && <div className="loaderr"></div>}
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {showModal && <LogOutModal toggleModal={toggleModal} logOut={logOut} />}
      {!isPending && (
        <div className={`container ${styles.userProfileContainer} pageAnimation`}>
          <ButtonFunction toggleModal={toggleModal} changeProfile={changeProfile} setChangeProfile={setChangeProfile} saveEdition={saveEdition} CancleEdition={CancleEdition} />

          <div style={{ filter: showModal || wrongUser ? "blur(4px)" : "blur(0)" }} className={styles.left}>
            <div className={styles.profileUpdateHeader}>
              <h2>My Profile</h2>
              <div>
                <i className="bi bi-bell-fill"></i>
                <Avatar src={selectedImage} alt="Selected" fallback="A" />
              </div>
            </div>

            <hr style={{ color: "gray" }} />

            {/* ============ Update Profile Form ============ */}
            <br />
            <form action="/update_profile/" method="post" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()} className={`${styles.updateProfileForm}`}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
                <div className={styles.profileImgContainer}>
                  <Avatar size="9" src={selectedImage} alt="Selected" fallback="A" />
                </div>
                <div className={styles.mainTopLeft}>
                  <Heading size="6">{fullName}</Heading>
                  <Text size="3" style={{ color: "gray" }}>
                    @{usernameValue}
                  </Text>
                  <EditUploadImage handleImageChange={handleImageChange} changeProfile={changeProfile} />
                </div>
                <div className={styles.mainTopRight}>
                  <Code size="4">{memberRole}</Code>
                  <Text size="3" color="gray">
                    Joined {joined}
                  </Text>
                </div>
              </div>
              <div>
                <Tabs.Root defaultValue="technalogies">
                  <Tabs.List>
                    <Tabs.Trigger value="basic">Basic</Tabs.Trigger>
                    <Tabs.Trigger value="technalogies">Technalogies</Tabs.Trigger>
                    <Tabs.Trigger value="additional">Additional</Tabs.Trigger>
                  </Tabs.List>

                  <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="basic">
                      <div className={styles.NamesContainer}>
                        <EditFullName changeProfile={changeProfile} fullName={fullName} setFullName={setFullName} />
                        <EditUserName
                          usernameValue={usernameValue}
                          setUsernameValue={setUsernameValue}
                          validUsernameChecker={validUsernameChecker}
                          usernameInputStyle={usernameInputStyle}
                          changeProfile={changeProfile}
                        />
                      </div>
                      <div className={styles.EmailBioAddressContainer}>
                        <EditEmail
                          emailValue={emailValue}
                          setEmailValue={setEmailValue}
                          validEmailChecker={validEmailChecker}
                          emailFocus={emailFocus}
                          setEmailFocus={setEmailFocus}
                          emailTrue={emailTrue}
                          setEmailtrue={setEmailtrue}
                          emailChecker={emailChecker}
                          emailInputStyle={emailInputStyle}
                          changeProfile={changeProfile}
                        />
                        <EditBio changeProfile={changeProfile} bio={bio} setBio={setBio} />
                        <EditPassword
                          passwordValue={passwordValue}
                          setPasswordValue={setPasswordValue}
                          validPasswordChecker={validPasswordChecker}
                          passwordTrue={passwordTrue}
                          setPasswordTrue={setPasswordTrue}
                          passwordType={passwordType}
                          setPasswordType={setPasswordType}
                          passwordChecker={passwordChecker}
                          passwordInputStyle={passwordInputStyle}
                          changeProfile={changeProfile}
                        />
                        <EditAddress changeProfile={changeProfile} address={address} setAddress={setAddress} />
                        <EditDateOfBirth changeProfile={changeProfile} dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="technalogies">
                      <div className={styles.MajorExperienceTechnalogiesContainer}>
                        <EditMajor major={major} seeMajor={seeMajor} changeProfile={changeProfile} />
                        <EditExperience experience={experience} seeExperience={seeExperience} changeProfile={changeProfile} />
                        <EditSkills changeProfile={changeProfile} skills={skills} setSkills={setSkills} seeSkills={seeSkills} />
                        <EditCustonTech changeProfile={changeProfile} customTechList={customTechList} setCustomTechList={setCustomTechList} />
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="additional">
                      <div className={styles.PhoneNumberResumesContainer}>
                        <AddPhoneNumber
                          numbers={numbers}
                          newNumber={newNumber}
                          setNewNumber={setNewNumber}
                          handleAddNewNumber={handleAddNewNumber}
                          handleDelete={handleDelete}
                          changeProfile={changeProfile}
                        />
                        <EditResume handleResumeChange={handleResumeChange} changeProfile={changeProfile} />
                        <EditUniversity education={education} setEducation={setEducation} changeProfile={changeProfile} />
                      </div>
                    </Tabs.Content>
                  </Box>
                </Tabs.Root>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default UpdateProfile
