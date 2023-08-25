import styles from '../../css/Charts.module.css'
function CardChart() {
  return (
    <div className="container">
      <br />
      <br />
      <hr />
      <div className={styles.majorCardContainer}>
        <div>Frontend</div>
        <div className={styles.usersMajorInfo}>
          User Info
        </div>
      </div>
      <div className={styles.majorCardContainer}></div>
      <div className={styles.majorCardContainer}></div>
      <div className={styles.majorCardContainer}></div>
    </div>
  )
}

export default CardChart