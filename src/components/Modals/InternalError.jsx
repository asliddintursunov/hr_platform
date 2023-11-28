import "../../styles/PopUp.css"
function InternalError({ setCloseInternalErrorModal }) {
  return (
    <div>
      <div className="popupContainer open">
        <form className="popup open" onSubmit={(e) => e.preventDefault()}>
          <i className="bi bi-exclamation-circle warning"></i>
          <h2 className="text-center">
            <span
              className="text-danger"
              style={{
                fontSize: "3.5rem"
              }}
            >
              500
            </span>
            <br />
            Something went wrong in the server, please try again!
          </h2>
          <button
            className="sendBtn"
            type="submit"
            onClick={() => {
              window.location.reload()
              setCloseInternalErrorModal(false)
            }}
          >
            OK
          </button>
        </form>
      </div>
    </div>
  )
}

export default InternalError
