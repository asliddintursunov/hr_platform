import { NavLink, Outlet, useLocation } from 'react-router-dom'
import styles from '../../styles/Admin.module.css'
function Admin() {
  const location = useLocation()
  localStorage.removeItem("receiverId")
  localStorage.removeItem("receiverUsername")
  
  const defaultPath = '/' + location.pathname.split('/')[1] + '/' + location.pathname.split('/')[2] + '/'

  const navbarColor = {
    color: 'var(--white)',
    backgroundColor: 'var(--dark)'
  }

  return (
    <div className={`${styles.adminContainer} pageAnimation`}>
      <br />
      <h1 className="display-3 text-dark text-center">All Users</h1>
      <br />
      <nav className={`container ${styles.adminNav}`}>
        <NavLink
          style={location.pathname === defaultPath + 'accepted' ? navbarColor : null}
          to='accepted'>Accepted Users</NavLink>
        <NavLink
          style={location.pathname === defaultPath + 'waitingusers' ? navbarColor : null}
          to='waitingusers'>Waiting Users</NavLink>
        <br />
      </nav>
      <Outlet />
    </div>
  )
}

export default Admin