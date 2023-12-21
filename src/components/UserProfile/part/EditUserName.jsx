import { useState, useCallback, useEffect } from "react"
import styles from "../../../styles/EditProfile.module.css"
import { Text } from "@radix-ui/themes"

/* eslint-disable react/prop-types */
function EditUserName({ usernameValue, setUsernameValue, changeProfile }) {
  const [emptyCharacter, setEmptyCharacter] = useState([])
  const [validUsernameChecker, setValidUsernameChecker] = useState("")

  // =========== Username Input Validation ===========
  const usernameValidation = useCallback(() => {
    if (/[^a-zA-Z0-9]/.test(usernameValue)) {
      setEmptyCharacter((prev) => [...prev, false])
    } else if (!/[^a-zA-Z0-9]/.test(usernameValue)) {
      setEmptyCharacter([])
    }
  }, [usernameValue])

  useEffect(() => {
    usernameValidation()
  }, [usernameValidation])

  const usernameChecker = () => {
    !/^[0-9]/.test(usernameValue.split("")[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1
      ? setValidUsernameChecker("Valid Username")
      : setValidUsernameChecker("Birinchi belgi harfdan iborat bo'lishi va faqat harf va raqamlar qatnashishi kerak")
  }

  // =========== Username Input Style ===========
  const usernameInputStyle = {
    border: "none",
    borderBottom: "1px solid",
    borderColor: !/^[0-9]/.test(usernameValue.split("")[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1 ? "#333" : "red"
  }
  // ============================================
  return (
    <>
      <div className={`${styles.inputContainer} ${styles.usernameInputContainer}`}>
        <label htmlFor="username">
          <Text className="underlined-label">User Name</Text>
        </label>
        <input
          style={usernameInputStyle}
          disabled={!changeProfile}
          value={usernameValue}
          type="text"
          placeholder="User123"
          onChange={(e) => setUsernameValue(e.target.value)}
          id="username"
          name="username"
          required
          onKeyUp={() => {
            usernameChecker()
          }}
        />
        {(usernameValue === "" || usernameValue.includes("")) && validUsernameChecker !== "Valid Username" && (
          <i style={{ color: "red", fontSize: "1rem", position: "absolute", bottom: "-1.5rem" }}>{validUsernameChecker}</i>
        )}
      </div>
    </>
  )
}

export default EditUserName
