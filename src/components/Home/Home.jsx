import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
      <Link to='signup'>Sign Up</Link>
      <Link to='signin'>Sign In</Link>
    </div>
  )
}

export default Home