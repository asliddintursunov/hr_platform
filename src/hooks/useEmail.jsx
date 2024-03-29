import { useState } from "react"

export function useEmail() {
  // =========== Variables for Email Input ===========
  const [emailValue, setEmailValue] = useState("")
  const [validEmailChecker, setValidEmailChecker] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)
  const [emailTrue, setEmailtrue] = useState(false)
  // =================================================

  // =========== Email Input Validation ===========
  const emailChecker = () => (/^(?!.*\s)[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(emailValue) ? setValidEmailChecker("Valid Email") : setValidEmailChecker("Invalid Email format"))

  // ==============================================

  // =========== Email Input Style ===========
  const emailInputStyle = {
    border: "none",
    borderBottom: "1px solid",
    borderColor: /^(?!.*\s)[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,}$/i.test(emailValue) ? "green" : "red"
  }
  // ==========================================

  return {
    emailValue,
    setEmailValue,
    validEmailChecker,
    setValidEmailChecker,
    emailFocus,
    setEmailFocus,
    emailTrue,
    setEmailtrue,
    emailChecker,
    emailInputStyle
  }
}
