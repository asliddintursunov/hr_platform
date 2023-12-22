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
    !/^[0-9]/.test(usernameValue.split("")[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1 && usernameValue.length <= 30
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
          onChange={(e) => {
            if (e.target.value.length <= 30) {
              setUsernameValue(e.target.value)
            }
          }}
          id="username"
          name="username"
          required
          onKeyUp={() => {
            if (usernameValue.length >= 30) {
              setValidUsernameChecker("Username 30 ta belgidan oshmasligi kerak")
            } else {
              usernameChecker()
            }
          }}
        />
        {(usernameValue === "" || usernameValue.includes(" ")) && validUsernameChecker !== "Valid Username" && (
          <i style={{ color: "red", fontSize: "1rem", position: "absolute", bottom: "-1.5rem" }}>{validUsernameChecker}</i>
        )}
        {/* <span
          style={{
            position: "absolute",
            right: "0",
            bottom: "4px"
          }}
        >
          {30 - usernameValue.length} / 30
        </span> */}
      </div>
    </>
  )
}

export default EditUserName
