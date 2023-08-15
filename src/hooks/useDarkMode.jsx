import { useState } from "react"

export function useDarkMode() {

  const [isDark, setIsDark] = useState(false)
  
  const lightNavbar = {
    background: 'var(--white)',
    color: 'var(--dark)',
  }

  const darkNavbar= {
    background: 'var(--darkBackground)',
    color: 'var(--lightTextColor)',
  }

  const lightBody = {
    backgroundColor: 'var(--lightGrayBackground)',
    color: 'var(--dark)',
  }
  const darkBody = {
    background: 'var(--darkBackground)',
    color: 'var(--lightTextColor)',
  }

  const lightText = {
    color: 'var(--lightTextColor)',
  }
  
  const darkText = {
    color: 'var(--dark)',
  }

  const toggleButton = {
    border: '1px solid var(--lightTextColor)',
    color: 'var(--lightTextColor)',
    background: 'var(--darkBackground)',
  }
  return {
    isDark, setIsDark, lightNavbar, darkNavbar, lightBody, darkBody, lightText, darkText,
    toggleButton,
  }
}
