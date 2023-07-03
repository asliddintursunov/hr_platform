import { Fragment } from "react"

/* eslint-disable react/prop-types */
function Edit_FullName({ changeProfile, fullName, setFullName }) {
  return (
    <Fragment>
      <div className='fullname-changer input-container'>
        <label htmlFor="fullname"><b>Full Name</b></label>
        <input
          disabled={!changeProfile}
          className='form-control bg-light'
          type='text'
          id='fullname'
          name='fullname'
          placeholder='Full Name'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default Edit_FullName