import { useSelector } from 'react-redux'
import styles from '../../css/Charts.module.css'
import { allMajors } from '../../features/chartsSlice'


function CardChart() {
  const allMajorsData = useSelector(allMajors)


  return (
    <div className="container mt-4">
      {allMajorsData.backendDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Backend</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {allMajorsData.backendDev.map(item => {
            return (
              <div key={item.count}>
                <span>{item.experience} years of experience - </span>
                <b>{item.count} ta</b>
              </div>
            )
          })}
        </div>
      </div>}
      {allMajorsData.frontendDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Frontend</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {allMajorsData.frontendDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count} ta</b>
              </div>
            )
          })}
        </div>
      </div>}
      {allMajorsData.fullstackDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>FullStack</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {allMajorsData.fullstackDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count} ta</b>
              </div>
            )
          })}
        </div>
      </div>}
      {allMajorsData.MobileDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Mobile</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {allMajorsData.MobileDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count} ta</b>
              </div>
            )
          })}
        </div>
      </div>}
      {allMajorsData.DesktopDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Desktop</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {allMajorsData.DesktopDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count} ta</b>
              </div>
            )
          })}
        </div>
      </div>}
      {allMajorsData.DesignDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Design</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {allMajorsData.DesignDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count} ta</b>
              </div>
            )
          })}
        </div>
      </div>}
    </div >
  )
}

export default CardChart