import { Fragment } from "react"
import "../../styles/User_Profile.css"
import { Text } from "@radix-ui/themes"
function LogOutModal({ toggleModal, logOut }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className="modal">
          <div>
            <div className="modal-description">
              <Text>Are you absolutely sure?</Text>
            </div>
            <div className="modal-description-2">
              <Text>This action cannot be undone. You account will be logged out from the server.</Text>
            </div>
            <div className='modal-options'>
              <button onClick={toggleModal} className="Button red">Cancel</button>
              <button onClick={() => {
                logOut()
                toggleModal()
              }} className="Button green">Yes, log out</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LogOutModal
