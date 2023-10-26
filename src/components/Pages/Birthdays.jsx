import axios from "axios"
import { useCallback, useEffect, useState, useRef, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import PopUp from "../Modals/PopUp"
import styles from '../../styles/Birthdays.module.css'
import { baseUrl } from "../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/features/userDataSlice"
import AnotherUser from "../Modals/AnotherUser"

import { Table, Strong, Button, Heading, Blockquote, Code } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import * as Avatar from "@radix-ui/react-avatar"
import { defaultOptions } from "highcharts"
import useURL from "../../hooks/useURL"

function _Birthdays() {
  const memberRole = localStorage.getItem("userRole")
  const memberId = localStorage.getItem("userId")
  const { defaultImage } = useURL()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  useEffect(
    () => {
      if (isConnected) {
        socketInstance.disconnect();
      }
    }, []
  )


  const [userBday, setUserBday] = useState([]) // Shows User's B-day in table
  var setUserBdayToDays = [] // Users' B-day in days in array
  var leftDays = [] // Left Days
  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDate()
  const currentDateInDay = useRef(0)
  const userBdayInDate = useRef(0)
  const [usersLength, setUsersLength] = useState(null) // Numbers of Users
  const [isPending, setIsPending] = useState(false) // Loader

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  // Token Expired Validation
  const tokenExpired = useCallback((info) => {
    console.log(info);
    setIsOpen(true)
    setErrorOccured(true)
    setPopupInfo(info)
    setTimeout(() => {
      localStorage.removeItem('token')
      localStorage.clear()
      navigate('/signin')
    }, 1500);
  }, [navigate])


  const getBday = useCallback(() => {
    setIsPending(true)
    axios.get(`${baseUrl}/users`, {
      headers: {
        'X-UserRole': memberRole,
        'X-UserId': memberId
      }
    })
      .then(res => {
        setIsPending(false)
        setUserBday(res.data)
        setUsersLength(res.data.length)
      })
      .catch(err => {

        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        else if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          dispatch(logoutUser())
        }

        setIsPending(false)
      })
  }, [tokenExpired])
  useEffect(() => { getBday() }, [getBday])

  const dayTillBirthday = () => {
    currentDateInDay.current = 0;

    const daysInMonth = [
      31, // January
      28, // February (non-leap year)
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31, // December
    ];

    // Check if the current year is a leap year
    const currentYear = new Date().getFullYear();
    const isLeapYear = currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0);

    // Adjust the number of days in February for leap years
    if (isLeapYear) {
      daysInMonth[1] = 29;
    }

    // Calculating Current Day of Year
    for (let i = 0; i < currentMonth - 1; i++) {
      currentDateInDay.current += daysInMonth[i];
    }
    currentDateInDay.current += currentDay;

    for (let i = 0; i < usersLength; i++) {
      userBdayInDate.current = 0;

      if (userBday[i].date_birth === null || userBday[i].date_birth === undefined) {
        userBdayInDate.current = 30;
      } else {
        const birthMonth = Number(userBday[i].date_birth.split('-')[1]);
        const birthDay = Number(userBday[i].date_birth.split('-')[2]);

        for (let j = 0; j < birthMonth - 1; j++) {
          userBdayInDate.current += daysInMonth[j];
        }
        userBdayInDate.current += birthDay;
      }

      setUserBdayToDays.push(userBdayInDate.current - 30);
      leftDays.push(setUserBdayToDays[i] - (currentDateInDay.current));
    }
  };

  dayTillBirthday()

  const greenBackground = {
    background: 'linear-Gradient(115deg, lightgreen, limegreen , limegreen, lightgreen)',
    color: 'var(--white)',
  }

  return (
    <Fragment>
      {wrongUser && <AnotherUser wrongUserData={wrongUserData} />}
      {isOpen && <PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      <div className={`container pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <h1 className="display-3 text-center">Birthdays</h1>
        <br />
        <br />
        {isPending && <div className="loaderr"></div>}

        {!isPending &&
          <div className={`${styles.birthdaysContainer}`} >
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Date Of Birth</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Day Left</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {userBday && userBday.map((user, index) => {
                  return (
                    user.accepted && (
                      <Table.Row key={user.id} style={leftDays[index] == 0 ? greenBackground : null}>
                        <Table.Cell>
                          <Avatar.Root className={styles.AvatarRoot}>
                            <Avatar.Image className={styles.AvatarImage} src={user.profile_photo ? user.profile_photo : defaultImage} alt="Colm Tuite" />
                            <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
                              CT
                            </Avatar.Fallback>
                          </Avatar.Root>
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.date_birth}</Table.Cell>
                        <Table.Cell>
                          <Code>Birthday!</Code>
                          {leftDays[index] <= 30 && leftDays[index] >= 1 ? <h5 className="text-info">{leftDays[index]} left</h5> :
                            leftDays[index] == 0 ? <h5 className={`${styles.TodayBirthDay} text-center`}>Happy Birthday 🎉</h5> : <h5 className="text-warning">long days</h5>}
                        </Table.Cell>
                      </Table.Row>
                    )
                  )
                })}
              </Table.Body>
            </Table.Root>
          </div>}
      </div>
    </Fragment>
  )
}
export default _Birthdays