import { Text } from "@radix-ui/themes"
import { Fragment } from "react"

function ConfirmModal({ toggleRemoveUserModal, handleDelete }) {
  return (
    <Fragment>
      <div className="modal-backdrop">
        <div className="modal">
          <div>
            <div className="modal-description">
              <Text>Are you absolutely sure?</Text>
            </div>
            <div className="modal-description-2">
              <Text>This action cannot be undone. This user will be deleted.</Text>
            </div>
            <div className="modal-options">
              <button onClick={toggleRemoveUserModal} className="Button red">
                No
              </button>
              <button
                onClick={() => {
                  handleDelete()
                  toggleRemoveUserModal()
                }}
                className="Button green"
              >
                Yes, delete user
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmModal
