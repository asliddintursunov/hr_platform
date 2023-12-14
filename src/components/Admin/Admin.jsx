import { NavLink, Outlet, useLocation } from 'react-router-dom'
import styles from '../../styles/Admin.module.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
function Admin() {
  const location = useLocation()
  const defaultPath = '/' + location.pathname.split('/')[1] + '/' + location.pathname.split('/')[2] + '/'

  const navbarColor = {
    color: 'var(--white)',
    backgroundColor: 'var(--dark)'
  }
  const socketInstance = useSelector((state) => state.connection.socketInstance)
  const isConnected = useSelector((state) => state.connection.isConnected)
  useEffect(
    () => {
      if (isConnected) {
        console.log(isConnected + " Disconnected");
        socketInstance.disconnect();
      }
    }, []
  )

  return (
    <div className={`${styles.adminContainer} pageAnimation`}>
      <br />
      <h1 className="display-3 text-dark text-center">Admin Panel</h1>
      <br />
      <nav className={`container ${styles.adminNav}`}>
        <NavLink
          style={location.pathname === defaultPath + 'accepted' ? navbarColor : null}
          to='admin/accepted'>Accepted Users</NavLink>
        <NavLink
          style={location.pathname === defaultPath + 'waitingusers' ? navbarColor : null}
          to='admin/waitingusers'>Waiting Users</NavLink>
        <br />
      </nav>
      <Outlet />
    </div>
  )
}

export default Admin