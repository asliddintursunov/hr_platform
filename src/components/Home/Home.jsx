import { Fragment } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <Fragment>
      <header>
        <nav className='container d-flex align-items-center justify-content-between'>
          <div>
            <h1>Choices</h1>
          </div>
          <div className='d-flex align-items-center justify-content-between link-container'>
            <Link to='signup'>Sign Up</Link>
            <Link to='signin'>Sign In</Link>
          </div>
        </nav>
      </header>
      <main>
        <div className='main'></div>
      </main>
      <footer></footer>
    </Fragment>
  )
}

export default Home