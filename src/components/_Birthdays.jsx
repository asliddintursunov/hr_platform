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

  const getBday = useCallback(() => {
    axios.get('http://192.168.3.140:1000/users')
      .then(res => {
        setUserBday(res.data)
        setUsersLength(res.data.length)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => { getBday() }, [getBday])

  const dayTillBirthday = () => {
    currentDateInDay.current = 0

    // Calculating Current Day of Year
    for (let i = 0; i < currentMonth; i++) {
      if (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12)
        currentDateInDay.current += 31
      else if (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)
        currentDateInDay.current += 30
      else {
        if (new Date().getFullYear % 4 == 0)
          currentDateInDay.current += 29
        else
          currentDateInDay.current += 28
      }
    }
    currentDateInDay.current += currentDay

    for (let i = 0; i < usersLength; i++) {
      userBdayInDate.current = 0
      if (userBday[i].birth_date === null) {
        userBdayInDate.current = 30
      } else {
        for (let j = 0; j < Number(userBday[i].birth_date.split('').slice(5, 7).join('')); j++) {
          if (Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 1 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 3 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 5 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 7 ||
            Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 8 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 10 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 12) {
            userBdayInDate.current += 31
          } else if (Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 4 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 6 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 9 || Number(userBday[i].birth_date.split('').slice(5, 7).join('')) == 11) {
            userBdayInDate.current += 30
          } else {
            if (new Date().getFullYear % 4 == 0)
              userBdayInDate.current += 29
            else
              userBdayInDate.current += 28
          }
        }
        userBdayInDate.current += Number(userBday[i].birth_date.split('').slice(8).join(''))
      }

      setUserBdayToDays.push(userBdayInDate.current - 30)

      leftDays.push(setUserBdayToDays[i] - (currentDateInDay.current + 8))
    }
  }
  dayTillBirthday()

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
      </div>
    </div>
  )
}
export default _Birthdays