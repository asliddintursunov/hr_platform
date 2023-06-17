import { NavLink, Outlet } from 'react-router-dom'
import './Admin.css'
function Admin() {
  return (
    <div>
      <nav>
        <h2>Hello Admin</h2>
        <NavLink to='accepted'>Accepted</NavLink>
        <NavLink to='waitingusers'>Waiting Users</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default Admin