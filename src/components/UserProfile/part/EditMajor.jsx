import { Text } from '@radix-ui/themes'
import styles from '../../../styles/Additional.module.css'

function EditMajor({ changeProfile, major, seeMajor }) {
  const majorValues = [
    'Frontend', 'Backend', 'FullStack', 'Mobile', 'Desktop', 'Design', '|', 'Data Science', 'DevOps', 'QA', 'Security', 'Game', 'Other'
  ]

  return (
    <div className={`${styles.majorContainer}`}>
      <Text style={{ fontSize: '1.8rem' }}>Major</Text>
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