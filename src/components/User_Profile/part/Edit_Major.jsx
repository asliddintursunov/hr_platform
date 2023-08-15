import styles from '../../../css/Additional.module.css'
// eslint-disable-next-line react/prop-types
function Edit_Major({changeProfile, major, setMajor}) {
  const seeMajor = (value) => {
    setMajor(value)
    console.log(major);
    console.log(value);
  }
  return (
    <div className={`form-control ${styles.majorContainer}`}>
      <h3>Major</h3>
      <div className={styles.radioInput}>
        <input onClick={(e) => seeMajor(e.target.value)} disabled={changeProfile ? false : true} type="radio" id="frontend" name="major" value="frontend" />
        <label htmlFor="frontend">Frontend</label>

        <input onClick={(e) => seeMajor(e.target.value)} disabled={changeProfile ? false : true} type="radio" id="backend" name="major" value="backend" />
        <label htmlFor="backend">Backend</label>

        <input onClick={(e) => seeMajor(e.target.value)} disabled={changeProfile ? false : true} type="radio" id="mobile" name="major" value="mobile" />
        <label htmlFor="mobile">Mobile</label>

        <input onClick={(e) => seeMajor(e.target.value)} disabled={changeProfile ? false : true} type="radio" id="desktop" name="major" value="desktop" />
        <label htmlFor="desktop">Desktop</label>
        
        <input onClick={(e) => seeMajor(e.target.value)} disabled={changeProfile ? false : true} type="radio" id="design" name="major" value="design" />
        <label htmlFor="design">UI/UX</label>
      </div>
    </div>
  )
}

export default Edit_Major