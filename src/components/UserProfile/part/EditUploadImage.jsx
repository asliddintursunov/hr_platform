import { useCallback, useRef, useState } from "react"
// import '../User_Profile.css'
import styles from "../../../styles/EditProfile.module.css"
import { Button } from "@radix-ui/themes"
import { CameraIcon } from "@radix-ui/react-icons"

function UploadImage({ handleImageChange, changeProfile, setOpenDeleteImageModal }) {
  const [percentage, setPercentage] = useState(0)
  const full = useRef(null)
  const value = useRef(0)
  const [isOnProgress, setIsOnProgress] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const progressBar = useCallback(() => {
    let progress = setInterval(() => {
      setIsOnProgress(true)
      full.current = Math.floor(Math.random() * 10 + 1)

      value.current += full.current

      if (value.current >= 100) {
        value.current = 100
        setPercentage(value.current)
        clearInterval(progress)
        setIsDone(true)
        setTimeout(() => {
          setIsDone(false), setIsOnProgress(false)
        }, 1500)
        console.log("Progress Done!")
      } else {
        setPercentage(value.current)
      }
    }, 100)

    return () => {
      if (value.current) {
        clearInterval(progress)
        value.current = null
      }
    }
  }, [])

  return (
    <div className={styles.uploadImageComponent}>
      <input
        type="file"
        accept="image/*"
        onChange={(file) => {
          handleImageChange(file)
          full.current = null
          value.current = 0
          setIsOnProgress(false)
          setPercentage(0)
          setTimeout(() => {
            progressBar()
          }, 100)
        }}
        disabled={!changeProfile}
      />
      <div>
        <Button type="button" disabled={!changeProfile}>
          <CameraIcon />
          Change Photo
        </Button>
        <Button
          disabled={!changeProfile}
          onClick={() => setOpenDeleteImageModal(true)}
          variant="outline"
          color="red"
          style={{
            marginLeft: "1rem"
          }}
        >
          Remove Photo
        </Button>
      </div>
      {isOnProgress && (
        <div className="p-bar-container">
          <div className="p-bar" style={{ width: percentage + "%" }}></div>
        </div>
      )}
      {isDone && <span>Done😀</span>}
    </div>
  )
}

export default UploadImage
