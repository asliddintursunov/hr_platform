import { Fragment, useCallback, useRef, useState } from "react"
// import '../User_Profile.css'
import styles from '../../../styles/EditProfile.module.css'
import useURL from "../../../hooks/useURL"
function UploadImage({ selectedImage, handleImageChange, changeProfile }) {

  const { defaultImage } = useURL()

  const [percentage, setPercentage] = useState(0)
  const full = useRef(null)
  const value = useRef(0)
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
        console.log('Progress Done!');
      }
      else {
        setPercentage(value.current)
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
      <div className={styles.EditImgComponentContainer}>
        <div className={styles.uploadImageComponent}>
          {selectedImage ? <img src={selectedImage} alt="Selected" /> : <img src={defaultImage} alt="Selected" />}
          <input className="form-control btn btn-secondary" type="file" accept="image/*"
            onChange={(file) => {
              handleImageChange(file)
              full.current = null
              value.current = 0
              setIsOnProgress(false)
              setPercentage(0)
              setTimeout(() => {
                progressBar()
              }, 100)
            }} disabled={!changeProfile}
          />
          {isOnProgress && <div className="p-bar-container">
            <div className="p-bar" style={{ width: percentage + '%' }}></div>
          </div>}
        </div>
      </div>
    </Fragment>
  )
}

export default UploadImage