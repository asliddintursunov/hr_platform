import { useState } from "react"
import styles from "../../../styles/EditProfile.module.css"
import { Text } from "@radix-ui/themes"

function EditEmail({ emailValue, setEmailValue, changeProfile }) {
  const [validEmailChecker, setValidEmailChecker] = useState("")
  const emailChecker = () => {
    return /^(?!.*\s)[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(emailValue) ? setValidEmailChecker("Valid Email") : setValidEmailChecker("Invalid Email format")
  }
  const emailInputStyle = {
    border: "none",
    borderBottom: "1px solid",
    borderColor: /^(?!.*\s)[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(emailValue) ? "#333" : "red"
  }
  return (
    <>
      <div className={`${styles.emailChanger} ${styles.inputContainer}`}>
        <label htmlFor="email">
          <Text className="underlined-label">Email</Text>
        </label>
        <input
          style={emailInputStyle}
          disabled={!changeProfile}
          value={emailValue}
          type="email"
          placeholder="user@example.com"
          onChange={(e) => {
            if (e.target.value.length <= 40) {
              setEmailValue(e.target.value)
            } else {
              setValidEmailChecker("Email 40 ta belgidan oshmasligi kerak")
            }
          }}
          onKeyUp={() => {
            emailChecker()
          }}
          id="email"
          name="email"
          required
        />
        {emailValue.length >= 1 && validEmailChecker === "Valid Email" && <i style={{ color: "green", fontSize: "1rem" }}>{validEmailChecker}</i>}
        {emailValue.length >= 1 && validEmailChecker !== "Valid Email" && <i style={{ color: "red", fontSize: "1rem" }}>{validEmailChecker}</i>}
        {(emailValue === "" || emailValue.includes(" ")) && validEmailChecker !== "Valid Email" && (
          <i style={{ color: "red", fontSize: "1rem", position: "absolute", bottom: "-1.5rem" }}>{validEmailChecker}</i>
        )}
      </div>
    </>
  )
}

export default EditEmail
