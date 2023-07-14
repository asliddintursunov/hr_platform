import { Fragment } from "react"

function _UploadImage({ selectedImage, handleImageChange, changeProfile }) {
  return (
    
    <Fragment>
      <div className='d-flex flex-column align-items-center justify-content-center text-center p-2 gap-2 profile_img'>
        {selectedImage ? <img src={selectedImage} alt="Selected" /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU" alt="Selected" />}
        <input className="form-control btn btn-secondary" type="file" accept="image/*" onChange={(file) => handleImageChange(file)} disabled={!changeProfile} />
      </div>
    </Fragment>
  )
}

export default _UploadImage