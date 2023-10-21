import '../../styles/PopUp.css'
function PopUp({ popupInfo, setIsOpen, errorOccured }) {
  return (
    <div>
      <div className="popupContainer open">
        <form className="popup open" onSubmit={e => e.preventDefault()}>
          {errorOccured && <i className="bi bi-x-circle reject"></i>}
          {!errorOccured && <i className="bi bi-check-circle confirm"></i>}
          <h3 className='text-center'>{popupInfo}</h3>
          <button className='sendBtn' type='submit' onClick={() => { setIsOpen(false) }}>OK</button>
        </form>
      </div>
    </div>
  )
}

export default PopUp