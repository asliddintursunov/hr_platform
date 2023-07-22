import { Fragment } from "react"

/* eslint-disable react/prop-types */
function Edit_Address({ changeProfile, address, setAddress }) {
  return (
    <Fragment>
      <div className='address-changer input-container'>
        <label htmlFor="address"><b>Address</b></label>
        <input
          disabled={!changeProfile}
          className='form-control bg-light'
          type="text"
          id='address'
          name='address'
          placeholder='Address'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default Edit_Address