import { Fragment } from "react"

/* eslint-disable react/prop-types */
function Edit_Address({ changeProfile }) {
  return (
    <Fragment>
      <div className='address-changer input-container'>
        <label htmlFor="address"><b>Address</b></label>
        <input
          disabled={!changeProfile}
          className='form-control'
          type="text"
          id='address'
          name='address'
          placeholder='Address'
        />
      </div>
    </Fragment>
  )
}

export default Edit_Address