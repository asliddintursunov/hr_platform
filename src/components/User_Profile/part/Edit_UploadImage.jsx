import { Fragment, useCallback, useRef, useState } from "react"
import '../User_Profile.css'
function _UploadImage({ selectedImage, handleImageChange, changeProfile }) {

  const [percentage, setPercentage] = useState(0)
  const full = useRef(null)
  const value = useRef(0)
  const [seeProgress, setSeeProgress] = useState(0)
  const [isOnProgress, setIsOnProgress] = useState(false)

  const progressBar = useCallback(() => {

    let progress = setInterval(() => {
      setIsOnProgress(true)
      full.current = Math.floor(Math.random() * 10 + 1)

      value.current += full.current

      if (value.current >= 100) {
        value.current = 100
        setPercentage(value.current)
        clearInterval(progress)
        setSeeProgress(value.current)
        console.log('Progress Done!');
      }
      else {
        setPercentage(value.current)
        setSeeProgress(value.current)
      }

    }, 100);

    return () => {
      if (value.current) {
        clearInterval(progress)
        value.current = null
      }
    }
  }, [])
  return (
    <Fragment>
      <div className='d-flex flex-column align-items-center justify-content-center text-center p-2 gap-2 profile_img'>
        {selectedImage ? <img src={selectedImage} alt="Selected" /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU" alt="Selected" />}
        <input className="form-control btn btn-secondary" type="file" accept="image/*" onChange={(file) => {
          handleImageChange(file)
          full.current = null
          value.current = 0
          setIsOnProgress(false)
          setSeeProgress(0)
          setPercentage(0)
          setTimeout(() => {
            progressBar()
          }, 100)
        }} disabled={!changeProfile} />
        {isOnProgress && <div className="p-bar-container">
          <div className="bg-primary p-bar" style={{ width: percentage + '%' }}></div>
          <span className="text-primary">{seeProgress}% done!</span>
        </div>}
      </div>
    </Fragment>
  )
}

export default _UploadImage