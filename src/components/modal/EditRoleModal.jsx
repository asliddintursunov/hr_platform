import { Fragment } from "react"

function EditRoleModal({ toggleEditRoleModal, handleEdit }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className="modal">
          <div style={modalStyle}>
            <h3 className="text-center">Are you sure you want to edit this user's role?</h3>
            <div className='modal-options'>
              <button onClick={toggleEditRoleModal} className="btn btn-success">No</button>
              <button onClick={() => {
                handleEdit()
                toggleEditRoleModal()
              }} className="btn btn-danger">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditRoleModal

const modalStyle = {
  width: '30rem',
}