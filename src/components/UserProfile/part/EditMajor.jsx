import { Text } from '@radix-ui/themes'
import styles from '../../../styles/Additional.module.css'

function EditMajor({ changeProfile, major, seeMajor }) {
  const majorValues = [
    'Frontend', 'Backend', 'FullStack', 'Mobile', 'Desktop', 'Design'
  ]
  const majorValues2 = [
    'Data Science', 'DevOps', 'QA', 'Security', 'Intern', 'Other'
  ]

  return (
    <div className={`${styles.majorContainer}`}>
      <Text className='underlined-label'>Major</Text>
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
      <div className={styles.radioInput}>
        {majorValues2 && majorValues2.map(majorValue2 => {
          return (
            <div key={majorValue2}>
              <input
                onChange={(e) => seeMajor(e.target.value)}
                disabled={changeProfile ? false : true}
                type="radio"
                id={majorValue2}
                name="major"
                value={majorValue2}
                checked={major == majorValue2}
              />
              <label htmlFor={majorValue2}>{majorValue2}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EditMajor