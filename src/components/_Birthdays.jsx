import axios from "axios"
import { useCallback, useEffect, useState, useRef } from "react"
import '../components/Admin/Admin.css'

function _Birthdays() {

  const [userBday, setUserBday] = useState([]) // Shows User's B-day in table
  var setUserBdayToDays = [] // Users' B-day in days in array
  var leftDays = [] // Left Days
  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDate()
  const currentDateInDay = useRef(0)
  const userBdayInDate = useRef(0)
  const [usersLength, setUsersLength] = useState(null) // Numbers of Users
  const [isPending, setIsPending] = useState(false) // Loader

  const getBday = useCallback(() => {
    setIsPending(true)
    axios.get('http://192.168.3.140:1000/users')
      .then(res => {
        setIsPending(false)
        setUserBday(res.data)
        setUsersLength(res.data.length)
      })
      .catch(err => {
        setIsPending(false)
        console.error(err)
      })
  }, [])

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

      if (userBday[i].birth_date === null) {
        userBdayInDate.current = 30;
      } else {
        const birthMonth = Number(userBday[i].birth_date.split('-')[1]);
        const birthDay = Number(userBday[i].birth_date.split('-')[2]);

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

  return (
    <div className="container">
      <h1>Users&#39; Birthday</h1>
      <hr />
      <br />
      {isPending && <div className="loader"></div>}
      {!isPending && <div className="form-control container">
        <div className="text-center d-flex align-items-center justify-content-between">
          <div className="col-2"><h4>Image</h4></div>
          <div className="col-2"><h4>Username</h4></div>
          <div className="col-2"><h4>Date Of Birth</h4></div>
          <div className="col-2"><h4>Day Left</h4></div>
        </div>
        <div className="row-7 d-flex flex-column align-items-center justift-content-between gap-3 mb-4">
          <hr style={{ width: '100%' }} />
          {userBday && userBday.map((user, index) => {
            return <div key={user.id} className="form-control d-flex align-items-center justify-content-between gap-2 bg-light">
              <div className="col-2 text-center text-secondary">
                <img className="user-image" src={user.profile_photo} />
              </div>
              <div className="col-2 text-center text-secondary">{user.username}</div>
              <div className="col-2 text-center text-secondary">{user.birth_date}</div>
              <div className="col-2 text-center">
                <h5 className="text-primary">Birthday!</h5>
                {leftDays[index] <= 30 && leftDays[index] >= 0 ? (<h5 className="text-success">{leftDays[index]} left</h5>) : (<h5 className="text-warning">long days</h5>)}
              </div>
            </div>
          })}
        </div>
      </div>}
    </div>
  )
}
export default _Birthdays