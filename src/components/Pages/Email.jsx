function _Email({ emailValue, setEmailValue, validEmailChecker, emailFocus, setEmailFocus, emailTrue, setEmailtrue, emailChecker, emailInputStyle }) {
  return (
    <>
      <label style={{ maxWidth: "min-content", lineHeight: "1.2rem" }}>
        <input
          style={emailValue.length >= 1 && emailTrue ? emailInputStyle : null}
          value={emailValue}
          // className="form-control"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmailValue(e.target.value)}
          onKeyUp={() => {
            emailChecker()
            setEmailtrue(true)
          }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          required
        />
        {emailValue.length >= 1 && emailFocus && validEmailChecker === "Valid Email" && <i style={{ color: "green", fontSize: "1rem" }}>{validEmailChecker}</i>}
        {emailValue.length >= 1 && emailFocus && validEmailChecker !== "Valid Email" && <i style={{ color: "red", fontSize: "1rem" }}>{validEmailChecker}</i>}
      </label>
    </>
  )
}

export default _Email
