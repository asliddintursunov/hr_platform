function useURL() {

  const BirthDayURL = 'http://192.168.5.130:1000/users'
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU'
  const AllUsersData = 'http://192.168.5.130:1000/users'
  const OneUserData = 'http://192.168.5.130:1000/user'
  const ProfileUpdate = 'http://192.168.5.130:1000/update_profile'
  const ConfirmCode = 'http://192.168.5.130:1000/register/code'
  const RegisterUrl = 'http://192.168.5.130:1000/register'
  const LogoutUrl = 'http://192.168.3.140:1000/logout'
  const LoginUrl = 'http://192.168.5.130:1000/login'
  const RegisterByGoogle = 'http://192.168.5.130:1000/register_gmail'

  return { BirthDayURL, defaultImage, AllUsersData, OneUserData, ProfileUpdate, ConfirmCode, LoginUrl, LogoutUrl, RegisterUrl, RegisterByGoogle }
}

export default useURL
