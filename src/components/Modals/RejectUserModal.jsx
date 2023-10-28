import { Text } from "@radix-ui/themes"
import { Fragment } from "react"

function RejectUserModal({ toggleRejectModal, RejectUser }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className="modal">
          <div>
            <div className="modal-description">
              <Text>Are you absolutely sure?</Text>
            </div>
            <div className="modal-description-2">
              <Text>This action cannot be undone. This user will be removed from the list.</Text>
            </div>
            <div className='modal-options'>
              <button onClick={toggleRejectModal} className="Button red">Cancle</button>
              <button onClick={() => {
                toggleRejectModal()
                RejectUser()
              }} className="Button green">Yes, remove user</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RejectUserModal