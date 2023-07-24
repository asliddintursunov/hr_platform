import axios from "axios"
import '../Admin.css'
import { useCallback, useEffect, useState } from "react"
import _PopUp from "../../_PopUp"
import { useNavigate } from "react-router-dom"
function _NotAcceptedUsers() {

  const navigate = useNavigate()

  const users_data = 'http://192.168.3.140:1000/users'
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU'

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
        setDatas(req.data)
        setIsPending(false)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setIsPending(false)
      })
  }, [users_data, tokenExpired])

  useEffect(() => { fetchData() }, [fetchData])

  const AddUser = (id) => {

    setDatas(prev => {
      return prev.filter(e => e.id !== id)
    })

    axios.patch(user_data + `/${id}`, {
      accepted: true,
    })
      .then((res) => {
        setPopupInfo(res.data)
        setErrorOccured(false)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setPopupInfo('Qandaydir xatolik ro\'y berdi!')
        setErrorOccured(true)
        setIsOpen(true)
      })
  }

  const RejectUser = (id) => {
    setDatas(prev => {
      return prev.filter(e => e.id !== id)
    })

    axios.delete(user_data + `/${id}`)
      .then((res) => {
        setPopupInfo(res.data)
        setErrorOccured(false)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setPopupInfo('Qandaydir xatolik ro\'y berdi!')
        setErrorOccured(true)
        setIsOpen(true)
      })

  }
  return (
    <div className="form-control container">
      <div className="text-center d-flex align-items-center justify-content-center">
        <div className="col-1"><h4>ID</h4></div>
        <div className="col-3"><h4>User</h4></div>
        <div className="col-3"><h4>Username</h4></div>
        <div className="col-3"><h4>E-mail</h4></div>
        <div className="col-2"><h4>Accepted</h4></div>
      </div>
      {isPending && <div className="loader"></div>}
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {!isPending && <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
        <hr style={{ width: '100%' }} />
        {datas && datas.map(data => {
          return (!data.accepted &&
            <div key={data.id} className="form-control d-flex align-items-center justift-content-between gap-2 bg-light">
              <div className="col-1 text-center">
                <b>#{data.id}</b>
              </div>
              <div className="col-3 d-flex align-items-center justify-content-center text-secondary gap-4 text-secondary">
                {data.profile_photo ? <img className="user-image" src={data.profile_photo} /> : <img className="user-image" src={defaultImage} />}
                <p className="text-wrap">{data.fullname}</p>
              </div>
              <div className="col-3 text-center text-secondary">
                <p>{data.username}</p>
              </div>
              <div className="col-3 text-center text-secondary">
                <p>{data.email}</p>
              </div>
              {<div className=" col-2 d-flex align-items-center justify-content-evenly gap-2 accept-reject">
                {!data.accepted && <button className="btn btn-success" onClick={() => AddUser(data.id)}>Accept</button>}
                {!data.accepted && <button className="btn btn-danger" onClick={() => RejectUser(data.id)}>Reject</button>}
              </div>}
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default _NotAcceptedUsers