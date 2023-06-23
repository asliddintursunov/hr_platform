/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import '../User_Profile.css'
import { Link } from 'react-router-dom'
function LogOutModal({ toggleModal, logOut }) {
  return (
    <Fragment>
      <div className='modal-backdrop'>
        <div className=" modal">
          <div>
            <h3>Do You Really Want To Log Out?</h3>
            <div className='modal-options'>
              <button onClick={toggleModal} className="btn btn-success">No</button>
              <button onClick={logOut} className="btn btn-danger"><Link to='/signin'>Yes</Link></button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LogOutModal