import axios from "axios"
import { useCallback, useEffect, useState, useRef, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import _PopUp from "./_PopUp"
import styles from '../css/Birthdays.module.css'
import { baseUrl } from "../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { sendHeaders, logoutUser } from "../features/userDataSlice"
import AnotherUser from "./modal/AnotherUser"

function _Birthdays() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [wrongUser, setWrongUser] = useState(false)
  const [wrongUserData, setWrongUserData] = useState('')

  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)

  useEffect(
    () => {
      if (isConnected) {
        console.log(isConnected + " Disconnected");
        socketInstance.disconnect();
      }
    }, []
  )

  useEffect(
    () => {
      dispatch(sendHeaders())
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
    setIsOpen(true)
    setErrorOccured(true)
    setPopupInfo(info)
    setTimeout(() => {
      localStorage.removeItem('token')
      navigate('/signin')
    }, 1500);
  }, [navigate])


  const getBday = useCallback(() => {
    setIsPending(true)
    axios.get(`${baseUrl}/users`, {
      headers: head
    })
      .then(res => {
        setIsPending(false)
        setUserBday(res.data)
        setUsersLength(res.data.length)
      })
      .catch(err => {
        if (err.response.status === 401) {
          setWrongUser(true)
          setWrongUserData(err.response.data)
          // alert(err.response.data)
          dispatch(logoutUser())
        }

        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
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
      leftDays.push(setUserBdayToDays[i] - (currentDateInDay.current) - 1);
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
      <div className={`container pageAnimation`} style={{ filter: wrongUser ? "blur(4px)" : "blur(0)" }}>
        <br />
        <h1 className="display-3 text-center">Birthdays</h1>
        <br />
        {isPending && <div className="loaderr"></div>}
        {!isPending &&
          <div className={`form-control container ${styles.birthdaysContainer}`} >
            {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
            <div className="text-center d-flex align-items-center justify-content-between">
              <div className="col-2"><h4>Image</h4></div>
              <div className="col-2"><h4>Username</h4></div>
              <div className="col-2"><h4>Date Of Birth</h4></div>
              <div className="col-2"><h4>Day Left</h4></div>
            </div>
            <div className={`row-7 ${styles.userCardContainer}`}>
              <hr style={{ width: '100%' }} />
              {userBday && userBday.map((user, index) => {
                return user.accepted &&
                  <div key={user.id} className={`form-control ${styles.userCard}`} style={leftDays[index] == 0 ? greenBackground : null}>
                    <div className="col-2">
                      {user.profile_photo ? <img className="user-image" src={user.profile_photo} /> : <img className="user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU" alt="Selected" />}
                    </div>
                    <div className="col-2">{user.username}</div>
                    <div className="col-2">{user.date_birth}</div>
                    <div className={`col-2 ${styles.bDayInfoContainer}`}>
                      <h5>Birthday!</h5>
                      {leftDays[index] <= 30 && leftDays[index] >= 1 ? <h5 className="text-info">{leftDays[index]} left</h5> :
                        leftDays[index] == 0 ? <h5 className={`${styles.TodayBirthDay}`}>Happy Birthday 🎉</h5> : <h5 className="text-warning">long days</h5>}
                    </div>
                  </div>
              })}
            </div>
          </div>}
      </div>
    </Fragment>
  )
}
export default _Birthdays