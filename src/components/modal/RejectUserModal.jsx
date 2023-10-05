function RejectUserModal({ toggleRejectModal, RejectUser }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className="modal">
          <div style={modalStyle}>
            <h3 className="text-center">Are you sure you want to reject this user?</h3>
            <div className='modal-options'>
              <button onClick={toggleRejectModal} className="btn btn-success">No</button>
              <button onClick={() => {
                toggleRejectModal()
                RejectUser()
              }} className="btn btn-danger">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RejectUserModal
const modalStyle = {
  width: '30rem',
}