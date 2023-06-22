import { Fragment } from "react"

/* eslint-disable react/prop-types */
function Edit_FullName({ changeProfile }) {
  return (
    <Fragment>
      <div className='fullname-changer input-container'>
        <label htmlFor="fullname"><b>Full Name</b></label>
        <input
          disabled={!changeProfile}
          className='form-control'
          type='text'
          id='fullname'
          name='fullname'
          placeholder='Full Name'
        />
      </div>
    </Fragment>
  )
}

export default Edit_FullName