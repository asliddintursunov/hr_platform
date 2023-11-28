
function Username({ usernameValue, setUsernameValue, validUsernameChecker, usernameFocus, setUsernameFocus, usernameTrue, setUsernameTrue, usernameChecker, usernameInputStyle }) {
  //* ########################################################################################
  return (
    <>
      <label style={{ maxWidth: "min-content", lineHeight: "1.2rem" }}>
        <input
          style={usernameValue.length >= 1 && usernameTrue ? usernameInputStyle : null}
          value={usernameValue}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsernameValue(e.target.value)}
          onKeyUp={() => {
            usernameChecker()
            setUsernameTrue(true)
          }}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          required
        />
        {usernameValue.length >= 1 && usernameFocus && validUsernameChecker === "Valid Username" && <i style={{ color: "green", fontSize: "1rem" }}>{validUsernameChecker}</i>}
        {usernameValue.length >= 1 && usernameFocus && validUsernameChecker !== "Valid Username" && <i style={{ color: "red", fontSize: "1rem" }}>{validUsernameChecker}</i>}
      </label>
    </>
  )
}

export default Username
