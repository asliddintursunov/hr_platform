import styles from '../css/Landing.module.css'
function _About() {
  return (
    <div className={`text-center ${styles.aboutPage} pageAnimation`}>
      <div>
        <h1 className="display-2">This is <code>about</code> Page</h1>
        <h1 className='display-1'>
          Hello dear <code>{localStorage.getItem('userRole')}</code>! Enjoy your HR platform...
        </h1>
      </div>
    </div>
  )
}

export default _About