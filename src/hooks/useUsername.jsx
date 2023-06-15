import { useState, useEffect, useCallback } from "react"

export function useUsername() {
  // =========== Variables for Username Input ===========
  const [usernameValue, setUsernameValue] = useState('')
  const [emptyCharacter, setEmptyCharacter] = useState([])
  const [validUsernameChecker, setValidUsernameChecker] = useState('')
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [usernameTrue, setUsernameTrue] = useState(false)
  // ====================================================

  // =========== Username Input Validation ===========
  const usernameValidation = useCallback(() => {
    if (/[^a-zA-Z0-9]/.test(usernameValue)) {
      setEmptyCharacter(prev => [...prev, false])
    } else if (!/[^a-zA-Z0-9]/.test(usernameValue)) {
      setEmptyCharacter([])
    }
  }, [usernameValue])

  useEffect(() => {
    usernameValidation()
  }, [usernameValidation])
  const usernameChecker = () => !/^[0-9]/.test(usernameValue.split('')[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1 ? setValidUsernameChecker('Valid Username') : setValidUsernameChecker('Invalid Username')
  // =================================================

  // =========== Username Input Style ===========
  const usernameInputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: !/^[0-9]/.test(usernameValue.split('')[0]) && new Set(emptyCharacter).size === 0 && usernameValue.length >= 1 ? 'green' : 'red',
  }
  // ============================================

  return {
    usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus,
    usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle
  }
}
