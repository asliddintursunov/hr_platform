import { useNavigate } from "react-router-dom"

function AnotherUser({ wrongUserData }) {
  const navigate = useNavigate()
  if (wrongUserData) {
    setTimeout(() => {
      localStorage.clear()
      navigate('/signin')
    }, 1500);
  }
  return (
    <div>
      <div className="popupContainer open">
        <div className="popup open">
          <h1 className='text-center text-danger'>{wrongUserData}</h1>
        </div>
      </div>
    </div>
  )
}

export default AnotherUser