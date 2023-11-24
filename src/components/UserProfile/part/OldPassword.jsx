import { Text } from '@radix-ui/themes'
import styles from '../../../styles/EditProfile.module.css'
import { useState } from 'react'
function OldPassword({ oldPassword, setOldPassword, changeProfile }) {
  const [oldPasswordType, setOldPasswordType] = useState(true)
  return (
    <div className={`${styles.passwordChanger} ${styles.inputContainer}`}>
      <label htmlFor="oldPassword"><Text style={labelStyle}>Old password</Text></label>
      <div onClick={() => {
        oldPasswordType ? setOldPasswordType(false) : setOldPasswordType(true)
      }}>
        {oldPasswordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
      </div>
      <input
        // disabled={!changeProfile}
        value={oldPassword}
        type={oldPasswordType ? "password" : "text"}
        placeholder='••••••••'
        onChange={e => setOldPassword(e.target.value)}
        id="oldPassword"
        name='oldPassword'
        required
      />
    </div>
  )
}
const labelStyle = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#444'
}
export default OldPassword