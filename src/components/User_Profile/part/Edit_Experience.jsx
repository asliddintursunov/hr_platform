import styles from '../../../css/Additional.module.css'
// eslint-disable-next-line react/prop-types
function Edit_Experience({changeProfile, experience, setExperience}) {
  const seeExperience = (value) => {
    setExperience(value)
    console.log(value);
    console.log(experience);
  }
  return (
    <div className={`form-control ${styles.experienceContainer}`}>
      <h3>Expericence</h3>
      <div className={`${styles.radioWrapper}`}>
        <label className={`${styles.radioButton}`}>
          <input onChange={e => seeExperience(e.target.value)} disabled={changeProfile ? false : true} type="radio" name="radio-group" id="option1" value='1-3' />
          <span className={`${styles.radioCheckmark}`}></span>
          <span className={`${styles.radioLabel}`}>1-3 years</span>
        </label>
      </div>

      <div className={`${styles.radioWrapper}`}>
        <label className={`${styles.radioButton}`}>
          <input onChange={e => seeExperience(e.target.value)} disabled={changeProfile ? false : true} type="radio" name="radio-group" id="option2" value='3-6' />
          <span className={`${styles.radioCheckmark}`}></span>
          <span className={`${styles.radioLabel}`}>3-6 years</span>
        </label>
      </div>

      <div className={`${styles.radioWrapper}`}>
        <label className={`${styles.radioButton}`}>
          <input onChange={e => seeExperience(e.target.value)} disabled={changeProfile ? false : true} type="radio" name="radio-group" id="option3" value='6+' />
          <span className={`${styles.radioCheckmark}`}></span>
          <span className={`${styles.radioLabel}`}>6+ years</span>
        </label>
      </div>
    </div>
  )
}

export default Edit_Experience