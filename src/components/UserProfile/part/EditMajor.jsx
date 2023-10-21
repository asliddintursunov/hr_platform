import styles from '../../../styles/Additional.module.css'

function EditMajor({ changeProfile, major, seeMajor }) {
  const majorValues = [
    'Frontend', 'Backend', 'FullStack', 'Mobile', 'Desktop', 'Design'
  ]

  return (
    <div className={`form-control ${styles.majorContainer}`}>
      <h3>Major</h3>
      <div className={styles.radioInput}>
        {majorValues && majorValues.map(majorValue => {
          return (
            <div key={majorValue}>
              <input
                onChange={(e) => seeMajor(e.target.value)}
                disabled={changeProfile ? false : true}
                type="radio"
                id={majorValue}
                name="major"
                value={majorValue}
                checked={major == majorValue}
              />
              <label htmlFor={majorValue}>{majorValue}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EditMajor