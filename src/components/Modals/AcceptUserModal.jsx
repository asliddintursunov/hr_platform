import { Text } from "@radix-ui/themes"
import { Fragment } from "react"

function AcceptUserModal({ AddUser, toggleAcceptModal }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className="modal">
          <div>
            <div className="modal-description">
              <Text>Are you absolutely sure?</Text>
            </div>
            <div className="modal-description-2">
              <Text>This action cannot be undone. This user will be added to the accepting users list</Text>
            </div>
            <div className='modal-options'>
              <button onClick={toggleAcceptModal}
                className="Button red">Cancle</button>
              <button onClick={() => {
                toggleAcceptModal()
                AddUser()
              }} className="Button green">Yes, accept</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AcceptUserModal