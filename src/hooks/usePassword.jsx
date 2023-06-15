import { useState } from "react"
export function usePassword() {

  // =========== Variables for Password Input ===========
  const [passwordValue, setPasswordValue] = useState('')
  const [validPasswordChecker, setValidPasswordChecker] = useState('')
  const [passwordTrue, setPasswordTrue] = useState(false)
  const [passwordType, setPasswordType] = useState(true)
  // ====================================================

  // =========== Password Input Validation ===========
  const passwordChecker = () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? setValidPasswordChecker('Valid Password') : setValidPasswordChecker('Invalid Password')
  // =================================================

  // =========== Password Input Style ===========
  const passwordInputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? 'green' : 'red',
  }
  // ============================================

  return {
    passwordValue, setPasswordValue, validPasswordChecker,
    setValidPasswordChecker, passwordTrue, setPasswordTrue,
    passwordType, setPasswordType, passwordChecker, passwordInputStyle
  }
}
