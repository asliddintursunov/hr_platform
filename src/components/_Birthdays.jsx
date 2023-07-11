import axios from "axios"
import { useCallback, useEffect, useState, useRef } from "react"
import '../components/Admin/Admin.css'

function _Birthdays() {

  const [userBday, setUserBday] = useState(null)

  //#region 
  // User's Birth Month/Day
  const userBirthMonth = useRef(null)
  const userBirthDay = useRef(null)

  // Current Month and Day
  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDate()

  // From User Date to Day
  const userDateInDay = useRef(0)
  // From Current Date to Day
  const currentDateInDay = useRef(0)

  // Difference between Current Day and User's Birthday
  const DifferenceOfDays = useRef(null)
  //#endregion

  const getBday = useCallback(() => {
    axios.get('http://192.168.3.140:1000/users')
      .then(res => setUserBday(res.data))
      .catch(err => console.error(err))
  }, [])
  useEffect(() => { getBday() }, [getBday])

  // Day Left until BirthDay
  const dayTillBirthday = () => {
    userBirthMonth.current = Number(dateOfBirth.split('').slice(5, 7).join(''))
    userBirthDay.current = Number(dateOfBirth.split('').slice(8).join(''))

    // Getting Current Date as Day
    for (let i = 0; i < currentMonth; i++) {
      if (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12) {
        currentDateInDay.current += 31
      } else if (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11) {
        currentDateInDay.current += 30
      } else {
        if (new Date().getFullYear % 4 == 0) {
          currentDateInDay.current += 29
        }
        else {
          currentDateInDay.current += 28
        }
      }
    }
    currentDateInDay.current += currentDay

    // Getting Current Date as Day
    for (let i = 0; i < userBirthMonth.current; i++) {
      if (userBirthMonth.current == 1 || userBirthMonth.current == 3 || userBirthMonth.current == 5 || userBirthMonth.current == 7 || userBirthMonth.current == 8 || userBirthMonth.current == 10 || userBirthMonth.current == 12) {
        userDateInDay.current += 31
      } else if (userBirthMonth.current == 4 || userBirthMonth.current == 6 || userBirthMonth.current == 9 || userBirthMonth.current == 11) {
        userDateInDay.current += 30
      } else {
        if (new Date().getFullYear % 4 == 0) {
          userDateInDay.current += 29
        }
        else {
          userDateInDay.current += 28
        }
      }
    }
    userDateInDay.current += userBirthDay.current

    DifferenceOfDays.current = userDateInDay.current - currentDateInDay.current
    console.log('Current Day', currentDateInDay.current);
    console.log('User BirthDay', userDateInDay.current);
    console.log('Difference', userDateInDay.current - currentDateInDay.current);

    userDateInDay.current = 0
    currentDateInDay.current = 0
  }

  return (
    <div className="container">
      <h1>Users&#39; Birthday</h1>
      <hr />
      <br />
      <div className="form-control container">
        <div className="text-center d-flex align-items-center justify-content-between">
          <div className="col-2"><h4>Image</h4></div>
          <div className="col-2"><h4>Username</h4></div>
          <div className="col-2"><h4>Date Of Birth</h4></div>
          <div className="col-2"><h4>Day Left</h4></div>
        </div>
        <div className="row-7 d-flex flex-column align-items-center justift-content-between gap-3 mb-4">
          <hr style={{ width: '100%' }} />
          {userBday && userBday.map(user => {
            return <div key={user.id} className="form-control d-flex align-items-center justify-content-between gap-2 bg-light">
              <div className="col-2 text-center text-secondary">
                <img className="user-image" src={user.profile_photo} />
              </div>
              <div className="col-2 text-center text-secondary">{user.username}</div>
              <div className="col-2 text-center text-secondary">{user.birth_date}</div>
              <div className="col-2 text-center">
                <h5>Birthday!</h5>
                <h5 className="text-success">Day Left</h5>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default _Birthdays