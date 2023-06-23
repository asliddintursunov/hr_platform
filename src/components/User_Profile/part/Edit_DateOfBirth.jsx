import { Fragment } from "react"

/* eslint-disable react/prop-types */
function Edit_DateOfBirth({ changeProfile, dateOfBirth, setDateOfBirth }) {
  return (
    <Fragment>
      <div className='birth-date-changer input-container'>
        <label htmlFor="dateofbirth"><b>Date of Bitrh</b></label>
        <input
          className='form-control'
          disabled={!changeProfile}
          type="date"
          name="dateofbirth"
          id="dateofbirth"
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
        />
      </div>
    </Fragment>
  )
}

export default Edit_DateOfBirth