
import { Text } from '@radix-ui/themes'
import candidateMajor from '../../../styles/Additional.module.css'
function CandidateMajor({ major, setMajor }) {
  const majorValues = [
    'Frontend', 'Backend', 'FullStack', 'Mobile', 'Desktop', 'Design'
  ]
  const majorValues2 = [
    'Data Science', 'DevOps', 'QA', 'Security', 'Intern', 'Other'
  ]
  // For Major
  const seeMajor = (value) => {
    setMajor(value)
  }

  return (
    <div className={`${candidateMajor.majorContainer}`}>
      <Text style={{ fontSize: '1.8rem' }}>Major</Text>
      <div className={candidateMajor.radioInput}>
        {majorValues && majorValues.map(majorValue => {
          return (
            <div key={majorValue}>
              <input
                onChange={(e) => seeMajor(e.target.value)}
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
      <div className={candidateMajor.radioInput}>
        {majorValues2 && majorValues2.map(majorValue2 => {
          return (
            <div key={majorValue2}>
              <input
                onChange={(e) => seeMajor(e.target.value)}
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

export default CandidateMajor