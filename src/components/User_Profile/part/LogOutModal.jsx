/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import '../User_Profile.css'
function LogOutModal({ toggleModal, logOut }) {
  return (
    <Fragment>
      <div className='log-out-modal'>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center la-la-la">
        <h3>Do You Really Want To Log Out?</h3>
        <div>
          <button onClick={toggleModal} className="btn btn-success">No</button>
          <button onClick={logOut} className="btn btn-danger">Yes</button>
        </div>
      </div>
    </Fragment>
  )
}

export default LogOutModal