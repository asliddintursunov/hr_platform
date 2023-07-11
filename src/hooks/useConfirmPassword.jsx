import { useState } from "react"

export function useConfirmPassword() {
  // =========== Variables for Password Input ===========
  const [passwordValue, setPasswordValue] = useState('')
  const [validPasswordChecker, setValidPasswordChecker] = useState('')
  const [passwordTrue, setPasswordTrue] = useState(false)
  const [passwordType, setPasswordType] = useState(true)
  // ====================================================

  // =========== Password Input Validation ===========
  const passwordChecker = () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? 
  setValidPasswordChecker('Valid Password') : 
  setValidPasswordChecker('Parol kamida bittadan [a-zA-Z0-9] qabul qilishi va uzunligi 8 belgidan ko\'p bo\'lishi kerak')
  // =================================================

  // =========== Password Input Style ===========
  const passwordInputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(passwordValue) ? 'green' : 'red',
  }
  // ============================================

  //* ########################################################################################

  // =========== Variables for Password Match Input ===========
  const [passwordMatchValue, setPasswordMatchValue] = useState('')
  const [validPasswordMatchChecker, setValidPasswordMatchChecker] = useState('')
  const [passwordMatchTrue, setPasswordMatchTrue] = useState(false)
  const [passwordCheckType, setPasswordCheckType] = useState(true)
  // ==========================================================

  // =========== Password Match Input Validation ===========
  const passwordMatchChecker = () => passwordMatchValue === passwordValue ? 
  setValidPasswordMatchChecker('Password Matches') : 
  setValidPasswordMatchChecker('Password does not Match')

  // =======================================================

  // =========== Password Match Input Style ===========
  const passwordInputMatchStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: passwordMatchValue === passwordValue ? 'green' : 'red',
  }
  // ==================================================



  return {
    passwordValue, setPasswordValue, validPasswordChecker, setValidPasswordChecker,
    passwordTrue, setPasswordTrue, passwordType, setPasswordType,
    passwordChecker, passwordInputStyle, passwordMatchValue, setPasswordMatchValue,
    validPasswordMatchChecker, setValidPasswordMatchChecker,
    passwordMatchTrue, setPasswordMatchTrue, passwordCheckType, setPasswordCheckType,
    passwordMatchChecker, passwordInputMatchStyle
  }
}

