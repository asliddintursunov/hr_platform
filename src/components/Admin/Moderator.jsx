import axios from "axios"
import './Admin.css'
import { Fragment, useCallback, useEffect, useState } from "react"
import _PopUp from "../_PopUp"
import { useNavigate } from "react-router-dom"

function Moderator() {

  const navigate = useNavigate()

  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU'
  const users_data = 'http://192.168.3.140:1000/users'
  const user_data = 'http://192.168.3.140:1000/user'

  const [datas, setDatas] = useState('')
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = 'Bearer ' + token;

    return config;
  });
  // Token Expired Validation
  const tokenExpired = useCallback((info) => {
    setIsOpen(true)
    setErrorOccured(true)
    setPopupInfo(info)
    setTimeout(() => {
      localStorage.removeItem('token')
      navigate('/signin')
    }, 1500);
  }, [navigate])

  const fetchData = useCallback(() => {
    setIsPending(true)
    axios.get(users_data)
      .then((req) => {
        setIsPending(false)
        setDatas(req.data)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setIsPending(false)

      })
  }, [users_data, tokenExpired])

  useEffect(() => { fetchData() }, [fetchData])
  
  const handleDelete = (id) => {
    setDatas(prev => {
      return prev.filter(data => data.id !== id)
    })

    axios.delete(user_data + `/${id}`)
      .then((res) => {
        setErrorOccured(false)
        setPopupInfo(res.data)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setErrorOccured(true)
        setPopupInfo('Qandaydir xatolik ro\'y berdi!')
        setIsOpen(true)
      })
  }


  return (
    <Fragment>
      <div className="container">
        <h1>Moderator Page</h1>
        <hr />
        <br />
      </div>
      <div className="form-control container">
        <div className="text-center d-flex align-items-center justify-content-center">
          <div className="col-2"><h4>ID</h4></div>
          <div className="col-2"><h4>User</h4></div>
          <div className="col-2"><h4>Username</h4></div>
          <div className="col-2"><h4>E-mail</h4></div>
          <div className="col-2"><h4>Role</h4></div>
          <div className="col-2"><h4>Delete</h4></div>
        </div>
        {isPending && <div className="loader"></div>}
        {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
        {!isPending && <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
          <hr style={{ width: '100%' }} />
          {datas && datas.map(data => {
            return (data.accepted &&
              <div key={data.id} className="form-control d-flex align-items-center justify-content-between gap-2 bg-light">
                <div className="col-2 text-center">
                  <b>#{data.id}</b>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-start text-secondary gap-4">
                  {data.profile_photo ? <img className="user-image" src={data.profile_photo} /> : <img className="user-image" src={defaultImage} />}
                  <b className="text-wrap">{data.fullname}</b>
                </div>
                <div className="col-2 text-center text-secondary">
                  <b>{data.username}</b>
                </div>
                <div className="col-2 text-center text-secondary">
                  <b>{data.email}</b>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-around">
                  <b>{data.role}</b>
                </div>
                <div className="col-2 d-flex flex-column flex-sm-row align-items-center justify-content-center gap-sm-4 gap-2">
                  {data.role === 'user' && <button className="btn btn-danger" onClick={() => { handleDelete(data.id) }}>Delete</button>}
                </div>
              </div>
            )
          })}
        </div>}
      </div>
    </Fragment>
  )
}

export default Moderator