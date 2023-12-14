import { NavLink } from "react-router-dom"
import "../../app/App.css"
function _PageNotFound404() {
  return (
    <div style={{ height: '100vh' }} className="container d-flex flex-column align-items-center justify-content-center gap-4">
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <i className="bi bi-emoji-frown sad-emoji"></i>
        <h1 className="display-4 text-danger">404 - PAGE NOT FOUND</h1>
      </div>
      <h3>Siz Izlayotgan sahifa mavjud emas!</h3>
      <button className="btn btn-primary p-2"><NavLink to='signin' className='text-light text-decoration-none ' style={{ fontSize: 'medium' }}>GO TO MAIN</NavLink></button>
    </div>
  )
}

export default _PageNotFound404