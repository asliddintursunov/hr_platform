import { Button } from '@radix-ui/themes'
import styles from '../../styles/ResumeDetails.module.css'
import { Cross1Icon } from '@radix-ui/react-icons'

function ResumeFile({ resume, setOpenResume }) {
  console.log(resume)
  return (
    <div className={styles.ResumeFileBackdrop}>
      <div className={`${styles.ResumeFileContainer}`}>
        <embed
          type='application/pdf'
          src={resume}
          height='900px'
          width='100%'
        />
        {/* <iframe src={resume} width='100%' height='100%'>{resume}</iframe> */}
        <Button color='red' onClick={() => setOpenResume(false)}><Cross1Icon /></Button>
      </div>
    </div>
  )
}

export default ResumeFile