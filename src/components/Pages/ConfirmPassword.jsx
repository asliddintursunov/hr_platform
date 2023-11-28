function _ConfirmPassword({
  passwordValue,
  setPasswordValue,
  validPasswordChecker,
  passwordTrue,
  setPasswordTrue,
  passwordType,
  setPasswordType,
  passwordChecker,
  passwordInputStyle,
  passwordMatchValue,
  setPasswordMatchValue,
  validPasswordMatchChecker,
  passwordMatchTrue,
  setPasswordMatchTrue,
  passwordCheckType,
  setPasswordCheckType,
  passwordMatchChecker,
  passwordInputMatchStyle
}) {
  //* ########################################################################################
  return (
    <>
      <label style={{ position: "relative", maxWidth: "min-content", lineHeight: "1.2rem" }}>
        <input
          style={passwordValue.length >= 1 && passwordTrue ? passwordInputStyle : null}
          value={passwordValue}
          // className="form-control"
          type={passwordType ? "password" : "text"}
          placeholder="Password"
          onChange={(e) => setPasswordValue(e.target.value)}
          onKeyUp={() => {
            passwordChecker()
            setPasswordTrue(true)
          }}
          required
        />
        {/* ====== Password Type Changes ====== */}
        <div
          className="show-password"
          onClick={() => {
            passwordType ? setPasswordType(false) : setPasswordType(true)
          }}
        >
          {passwordType ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
        </div>
        {/* ==================================== */}

        {/* ====== Password Validation Starts ====== */}
        {passwordValue.length >= 1 && validPasswordChecker === "Valid Password" && <i style={{ color: "green", fontSize: "1rem" }}>{validPasswordChecker}</i>}
        {passwordValue.length >= 1 && validPasswordChecker !== "Valid Password" && <i style={{ color: "red", fontSize: "1rem" }}>{validPasswordChecker}</i>}
        {/* ==================================== */}
      </label>
      <label style={{ position: "relative", maxWidth: "min-content", lineHeight: "1.2rem" }}>
        <input
          style={passwordMatchValue.length >= 1 && passwordMatchTrue ? passwordInputMatchStyle : null}
          value={passwordMatchValue}
          // className="form-control"
          type={passwordCheckType ? "password" : "text"}
          placeholder="Confirm Password"
          onChange={(e) => setPasswordMatchValue(e.target.value)}
          onKeyUp={() => {
            passwordMatchChecker()
            setPasswordMatchTrue(true)
          }}
          required
        />
        {/* ====== Password Checker Type Changes ======= */}
        <div
          className="show-password"
          onClick={() => {
            passwordCheckType ? setPasswordCheckType(false) : setPasswordCheckType(true)
          }}
        >
          {passwordCheckType && <i className="bi bi-eye-fill"></i>}
          {!passwordCheckType && <i className="bi bi-eye-slash-fill"></i>}
        </div>
        {/* ======================== */}

        {/* ====== Password Chekcer Validation Starts ====== */}
        {passwordMatchValue.length >= 1 && validPasswordMatchChecker === "Password Mos Keldi" && <i style={{ color: "green", fontSize: "1rem" }}>{validPasswordMatchChecker}</i>}
        {passwordMatchValue.length >= 1 && validPasswordMatchChecker !== "Password Mos Keldi" && <i style={{ color: "red", fontSize: "1rem" }}>{validPasswordMatchChecker}</i>}
        {/* ==================================== */}
      </label>
    </>
  )
}

export default _ConfirmPassword
