import styles from '../../css/Charts.module.css'
import useUserData from './useUserData'

function CardChart() {
  const { backendDev,
    frontendDev,
    fullstackDev,
    MobileDev,
    DesktopDev,
    DesignDev } = useUserData()

  return (
    <div className="container mt-4">
      {backendDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Backend</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {backendDev.map(item => {
            return (
              <div key={item.count}>
                <span>{item.experience} years of experience - </span>
                <b>{item.count}</b>
              </div>
            )
          })}
        </div>
      </div>}
      {frontendDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Frontend</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {frontendDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count}</b>
              </div>
            )
          })}
        </div>
      </div>}
      {fullstackDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>FullStack</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {fullstackDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count}</b>
              </div>
            )
          })}
        </div>
      </div>}
      {MobileDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Mobile</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {MobileDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count}</b>
              </div>
            )
          })}
        </div>
      </div>}
      {DesktopDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Desktop</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {DesktopDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count}</b>
              </div>
            )
          })}
        </div>
      </div>}
      {DesignDev.length > 0 && <div className={styles.majorCardContainer}>
        <div className={styles.majorType}>
          <h3>Design</h3>
          <h3>Developer</h3>
        </div>
        <div className={styles.usersMajorInfo}>
          {DesignDev.map(item => {
            return (
              <div key={item.count}>
                <p>{item.experience} years of experience - </p>
                <b>{item.count}</b>
              </div>
            )
          })}
        </div>
      </div>}
    </div >
  )
}

export default CardChart