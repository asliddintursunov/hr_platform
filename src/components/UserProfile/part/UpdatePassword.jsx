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
  const [isPending, setIsPending] = useState(false)

  const handleChangePassword = function (e) {
    e.preventDefault();
    setIsPending(true)
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
        setIsPending(false)
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
        setIsPending(false)
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
      {isPending && <div className={styles.Loader}>
        <div></div>
      </div>}
      {isOpened && !isPending && <PopUp setIsOpen={setIsOpened} errorOccured={errorOccured} popupInfo={popUpInfo} />}
      {!isOpened && !isPending && <div className={styles.PopUpWrapper}>
        <div className={styles.PopUpContainer} style={{
          blur: isPending ? 'blur(5px)' : 'none',
        }}>
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