import { useEffect, useState } from "react"
import styles from "../../../styles/EditProfile.module.css"
import { Text } from "@radix-ui/themes"

function EditFullName({ changeProfile, fullName, setFullName }) {
  const limitLength = 30
  const [hasFullName, setHasFullName] = useState(false)
  useEffect(() => {
    if (fullName) {
      setHasFullName(true)
    }
  }, [])
  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor="fullname">
          <Text className="underlined-label">Full Name</Text>
        </label>
        <input
          style={{
            borderBottomColor: hasFullName && limitLength - fullName.length === 0 ? "red" : "#333"
          }}
          disabled={!changeProfile}
          type="text"
          id="fullname"
          name="fullname"
          placeholder="John Smith"
          value={fullName ? fullName : ""}
          onChange={(e) => {
            if (e.target.value.length <= limitLength) {
              setFullName(e.target.value)
              setHasFullName(true)
            }
          }}
        />
        {!hasFullName || limitLength - fullName.length > 0 ? null : (
          <i
            style={{
              color: "red",
              fontSize: "1.4rem",
              position: "absolute",
              top: "6rem"
            }}
          >
            Fullname limit 30
          </i>
        )}
      </div>
    </>
  )
}

export default EditFullName
