import '../css/_PopUp.css'
function _PopUp({ popupInfo, setIsOpen, errorOccured, }) {
  return (
    <div>
      <div className="popupContainer open">
        <div className="popup open">
          {errorOccured && <i className="bi bi-x-circle reject"></i>}
          {!errorOccured && <i className="bi bi-check-circle confirm"></i>}
          <h3 className='text-center'>{popupInfo}</h3>
          <button className='sendBtn' onClick={() => setIsOpen(false)}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default _PopUp