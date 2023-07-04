import { Link } from 'react-router-dom'
import '../App.css'
function _LandingPage() {

  const userRole = localStorage.getItem('userRole')
  const linkStyle = {
    'padding': '.4rem 1.8rem',
    'background-color': 'lightgray',
    'border': '1px solid gray',
    'border-radius': '4px',
    'text-decoration': 'none',
    'color': '#000',
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center landing-page">
      <header>
        <nav className="w-full d-flex flex-column flex-sm-row align-items-end align-items-sm-center justify-content-end gap-2">
          {userRole === 'moderator' && <Link style={linkStyle} to='/moderator'>Moderator Page <i className="bi bi-alexa"></i></Link>}
          {userRole === 'admin' && <Link style={linkStyle} to='/admin'>Admin Page <i className="bi bi-shield-shaded"></i></Link>}
          <Link style={linkStyle} to='/profile' className='text-primary'>Profile <i className="bi bi-person-circle"></i></Link>
        </nav>
      </header>
      <main className='landing-body text-light'>
        <h1 className='display-1'>Hello My Friend!</h1>
      </main>
    </div>
  )
}

export default _LandingPage