import { useState } from "react"
import styles from "../../../styles/EditProfile.module.css"
import { Text } from "@radix-ui/themes"

function EditPassword({
  passwordValue,
  setPasswordValue,
  validPasswordChecker,
  passwordTrue,
  setPasswordTrue,
  passwordType,
  setPasswordType,
  passwordChecker,
  passwordInputStyle,
  passwordMatchValue,
  setPasswordMatchValue
}) {
  const [showPasswordMatchInfo, setShowPasswordMatchInfo] = useState(false)
  const [showPasswordMatch, setShowPasswordMatch] = useState(true)

  return (
    <>
      <div className={`${styles.passwordChanger} ${styles.inputContainer}`}>
        <label htmlFor="password">
          <Text style={labelStyle}>New password</Text>
        </label>
        <div
          onClick={() => {
            passwordType ? setPasswordType(false) : setPasswordType(true)
          }}
        >
          {passwordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
        </div>
        <input
          style={passwordValue.length >= 1 && passwordTrue ? passwordInputStyle : {}}
          value={passwordValue}
          type={passwordType ? "password" : "text"}
          placeholder="••••••••"
          onChange={(e) => setPasswordValue(e.target.value)}
          onKeyUp={() => {
            passwordChecker()
            setPasswordTrue(true)
          }}
          id="password"
          name="password"
          required
        />
        {passwordValue.length >= 1 && validPasswordChecker === "Valid Password" && <i style={{ color: "green", fontSize: "1.2rem" }}>{validPasswordChecker}</i>}
        {passwordValue.length >= 1 && validPasswordChecker !== "Valid Password" && <i style={{ color: "red", fontSize: "1.2rem" }}>{validPasswordChecker}</i>}
      </div>

      <div className={`${styles.passwordChanger} ${styles.inputContainer}`}>
        <label htmlFor="passwordMatch">
          <Text style={labelStyle}>Confirm Password</Text>
        </label>
        <div
          onClick={() => {
            showPasswordMatch ? setShowPasswordMatch(false) : setShowPasswordMatch(true)
          }}
        >
          {showPasswordMatch ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
        </div>
        <input
          value={passwordMatchValue}
          type={showPasswordMatch ? "password" : "text"}
          placeholder="••••••••"
          onChange={(e) => setPasswordMatchValue(e.target.value)}
          onKeyUp={() => {
            setShowPasswordMatchInfo(true)
          }}
          id="passwordMatch"
          name="passwordMatch"
          required
        />
        {passwordMatchValue === passwordValue && showPasswordMatchInfo === true ? (
          <i style={{ color: "green", fontSize: "1.2rem" }}>Password Matches</i>
        ) : (passwordMatchValue !== passwordValue && passwordMatchValue.length === passwordValue.length) | (showPasswordMatchInfo === true) ? (
          <i style={{ color: "red", fontSize: "1.2rem" }}>Password Does Not Match</i>
        ) : null}
      </div>
    </>
  )
}
const labelStyle = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
  color: "#444"
}
export default EditPassword
