import { useState } from "react"
export function usePassword() {
  // =========== Variables for Password Input ===========
  const [passwordValue, setPasswordValue] = useState("")
  const [validPasswordChecker, setValidPasswordChecker] = useState("")
  const [passwordTrue, setPasswordTrue] = useState(false)
  const [passwordType, setPasswordType] = useState(true)
  // ====================================================

  // =========== Password Input Validation ===========
  const passwordChecker = () =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue)
      ? setValidPasswordChecker("Valid Password")
      : setValidPasswordChecker("Parol kamida bittadan [a-zA-Z0-9] qabul qilishi va uzunligi 8 belgidan ko'p bo'lishi kerak")
  // =================================================

  // =========== Password Input Style ===========
  const passwordInputStyle = {
    border: "none",
    borderBottom: "1px solid",
    borderColor: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? "green" : "red"
  }
  // ============================================

  return {
    passwordValue,
    setPasswordValue,
    validPasswordChecker,
    setValidPasswordChecker,
    passwordTrue,
    setPasswordTrue,
    passwordType,
    setPasswordType,
    passwordChecker,
    passwordInputStyle
  }
}
