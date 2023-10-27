import { Text } from "@radix-ui/themes"
import styles from "../../../styles/Additional.module.css"

function EditExperience({ changeProfile, experience, seeExperience }) {
  const experienceValue = ["1-3", "3-6", "6+"]

  return (
    <div className={styles.experienceContainer}>
      <Text style={{ fontSize: "1.8rem" }}>Expericence</Text>
      <div className={styles.mappedExperiences}>
        {experienceValue &&
          experienceValue.map((exValue) => {
            return (
              <div key={exValue} className={`${styles.radioWrapper}`}>
                <label className={`${styles.radioButton}`}>
                  <input
                    onChange={(e) => seeExperience(e.target.value)}
                    disabled={changeProfile ? false : true}
                    type="radio"
                    name="experience-group"
                    value={exValue}
                    checked={experience === exValue}
                  />
                  <span className={`${styles.radioCheckmark}`}></span>
                  <span className={`${styles.radioLabel}`}>{exValue} years</span>
                </label>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default EditExperience
