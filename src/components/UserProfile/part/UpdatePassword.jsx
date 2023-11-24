import EditPassword from "./EditPassword"
import OldPassword from "./OldPassword"
import styles from '../../../styles/Modal.module.css'
import { Button } from "@radix-ui/themes"
import axios from "axios"
import { baseUrl } from "../../../utils/api"
import { Cross1Icon } from "@radix-ui/react-icons"
import PopUp from "../../Modals/PopUp"
import { useState } from "react"

function UpdatePassword({
  passwordValue, setPasswordValue,
  validPasswordChecker, passwordTrue, setPasswordTrue,
  passwordType, setPasswordType,
  passwordChecker, passwordInputStyle,
  oldPassword, setOldPassword,
  changeProfile, setChangePassword
}) {
  const memberId = localStorage.getItem('userId')
  const memberRole = localStorage.getItem('userRole')

  const [isOpened, setIsOpened] = useState(false)
  const [popUpInfo, setPopUpInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState(false)

  const handleChangePassword = function (e) {
    e.preventDefault();
    axios.post(
      baseUrl + '/change_password/' + memberId, {
      old_password: oldPassword,
      new_password: passwordValue
    },
      {
        headers: {
          "X-UserRole": memberRole,
          "X-UserId": memberId
        },
      })
      .then((res) => {
        setTimeout(() => {
          setChangePassword(false)
        }, 1200);
        setOldPassword('')
        setPasswordValue('')

        setPopUpInfo(res.data)
        setIsOpened(true)
        setErrorOccured(false)
      })
      .catch((err) => {
        setChangePassword(true)
        setOldPassword('')
        setPasswordValue('')

        setIsOpened(true)
        setErrorOccured(true)
        setPopUpInfo(err.response.data)
      })
  }
  return (
    <>
      {isOpened && <PopUp setIsOpen={setIsOpened} errorOccured={errorOccured} popupInfo={popUpInfo} />}
      {!isOpened && <div className={styles.PopUpWrapper}>
        <div className={styles.PopUpContainer}>
          <div className={styles.PopUpHeader}>
            <span>Update password</span>
            <span>Update your password here. Click save when you're done.</span>
          </div>
          <form onSubmit={handleChangePassword} className={styles.InputContainer}>
            <OldPassword
              oldPassword={oldPassword}
              setOldPassword={setOldPassword}
              changeProfile={changeProfile}
            />
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
            <Button>Update</Button>
            <Button
              type="button"
              color="red"
              onClick={() => setChangePassword(false)}
            ><Cross1Icon /></Button>
          </form>
        </div>
      </div>}
    </>
  )
}

export default UpdatePassword