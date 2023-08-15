import { NavLink, Outlet } from 'react-router-dom'
// import './Admin.css'
import styles from '../../css/Admin.module.css'
function Admin() {

  return (
    <div className={`container ${styles.adminContainer} pageAnimation`}>
      <br />
      <h1 className="display-3 text-dark text-center">Admin Panel</h1>
      <br />
      <nav className={`container ${styles.adminNav}`}>
        <NavLink to='accepted'>Accepted Users</NavLink>
        <NavLink to='waitingusers'>Waiting Users</NavLink>
        <br />
      </nav>
      <Outlet />
    </div>
  )
}

export default Admin