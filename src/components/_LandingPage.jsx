import { NavLink, Outlet } from 'react-router-dom'
import styles from '../css/Landing.module.css'

function _LandingPage() {
  const userRole = localStorage.getItem('userRole')
  
  return (
    <div className={styles.landingContainer}>
      <div className={styles.sidebarContainer}>
        <aside className={styles.sidebar} >
          <nav>
            <div className={styles.navbarOptions}>
              <NavLink to='./'><i className="bi bi-house-door-fill"></i> &#160; About</NavLink>
              {userRole === 'moderator' && <NavLink to='moderator'> <i className="bi bi-alexa"></i> &#160; Moderator</NavLink>}
              {userRole === 'admin' && <NavLink to='admin'><i className="bi bi-shield-shaded"></i> &#160; Admin Page </NavLink>}
              <NavLink to='birthdays'><i className="bi bi-bookmark-star-fill"></i> &#160; Birthdays </NavLink>
              <NavLink to='profile'><i className="bi bi-person-circle"></i> &#160; Profile </NavLink>
              <NavLink to='resumes'><i className="bi bi-file-person"></i> &#160; Resumes </NavLink>
            </div>
            <div className={styles.logout}>
              <button className='btn btn-dark'>HR Platform</button>
            </div>
          </nav>
        </aside>
      </div>
      <main className={styles.landingMain}>
        <Outlet />
      </main>
    </div>
  )
}

export default _LandingPage