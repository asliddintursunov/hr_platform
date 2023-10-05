import { Fragment } from "react"

function ConfirmModal({ toggleRemoveUserModal, handleDelete }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className="modal">
          <div style={modalStyle}>
            <h3 className="text-center">Are you sure you want to remove this user?</h3>
            <div className='modal-options'>
              <button onClick={toggleRemoveUserModal} className="btn btn-success">No</button>
              <button onClick={() => {
                handleDelete()
                toggleRemoveUserModal()
              }} className="btn btn-danger">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmModal

const modalStyle = {
  width: '30rem',
}