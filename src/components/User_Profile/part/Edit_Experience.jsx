import styles from '../../../css/Additional.module.css'
// eslint-disable-next-line react/prop-types
function Edit_Experience({ changeProfile, experience, seeExperience }) {
  const experienceValue = [
    '1-3', '3-6', '6+'
  ]

  return (
    <div className={`form-control ${styles.experienceContainer}`}>
      <h3>Expericence</h3>
      {experienceValue && experienceValue.map(exValue => {
        return (
          <div key={exValue} className={`${styles.radioWrapper}`}>
            <label className={`${styles.radioButton}`}>
              <input
                onChange={e => seeExperience(e.target.value)}
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
  )
}

export default Edit_Experience