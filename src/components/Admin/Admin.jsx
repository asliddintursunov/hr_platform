import { NavLink, Outlet } from 'react-router-dom'
import './Admin.css'
function Admin() {

  return (
    <div>
      <nav className='container'>
        <h1>Admin Page</h1>
        <hr />
        <br />
        <nav className='container d-flex align-items-center justify-content-around admin-nav'>
          <NavLink to='accepted'>Accepted Users</NavLink>
          <NavLink to='waitingusers'>Waiting Users</NavLink>
        </nav>
      </nav>
      <Outlet />
    </div>
  )
}

export default Admin