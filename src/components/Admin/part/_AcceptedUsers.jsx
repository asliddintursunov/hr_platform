import axios from "axios"
import styles from '../../../css/Admin.module.css'
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import _PopUp from "../../_PopUp"
import useURL from "../../../hooks/useURL"
import { baseUrl } from "../../../utils/api"
function _AcceptedUsers() {

  const navigate = useNavigate()

  const { defaultImage } = useURL()

  const [datas, setDatas] = useState(null)
  const [userRole, setUserRole] = useState('user')
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

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
    axios.get(`${baseUrl}/users`)
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
  }, [tokenExpired])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/user/${id}`)
      .then((res) => {
        setDatas(prev => {
          return prev.filter(data => data.id !== id)
        })
        setErrorOccured(false)
        setPopupInfo(res.data)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setIsPending(false)
        setErrorOccured(true)
        setPopupInfo('Qandaydir xatolik ro\'y berdi!')
        setIsOpen(true)

        console.log(err);
      })
  }

  const handleEdit = (id) => {
    axios.patch(`${baseUrl}/user/${id}`, {
      role: userRole,
    })
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
    <div className={`form-control container ${styles.acceptedUsersContainer}`}>
      <div className="text-center d-flex align-items-center">
        <div className="col-2"><h4>ID</h4></div>
        <div className="col-2"><h4>User</h4></div>
        <div className="col-2"><h4>Username</h4></div>
        <div className="col-2"><h4>E-mail</h4></div>
        <div className="col-2"><h4>Role</h4></div>
        <div className="col-2"><h4>Edit</h4></div>
      </div>
      {isPending && <div className="loaderr"></div>}
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {!isPending && <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
        <hr style={{ width: '100%' }} />
        {datas && datas.map(data => {
          return (
            data.accepted &&
            <div key={data.id} className={`form-control ${styles.userDataContainerDiv}`}>
              <div className="col-2 text-center">
                <b>#{data.id}</b>
              </div>
              <div className={`col-2 ${styles.userImgName}`}>
                {data.profile_photo ? <img className="user-image" src={data.profile_photo} /> : <img className="user-image" src={defaultImage} />}
                <p className="text-wrap">{data.fullname}</p>
              </div>
              <div className="col-2 text-center">
                <p>{data.username}</p>
              </div>
              <div className="col-2 text-center">
                <p>{data.email}</p>
              </div>
              <div className={`col-2 ${styles.changeRoleContainer}`}>
                {data.role !== 'admin' && <select className={`form-select ${styles.selectRole}`} onChange={e => { setUserRole(e.target.value) }}>
                  <option selected={data.role === 'user' && true} value='user'>User</option>
                  <option selected={data.role === 'moderator' && true} value='moderator'>Moderator</option>
                </select>}
                {data.role === 'admin' && <b>{data.role}</b>}
              </div>
              <div className={`col-2 ${styles.changeDeleteBtn}`}>
                <button disabled={data.role === 'admin'} className="btn btn-outline-success" onClick={() => { handleEdit(data.id) }}><i className="bi bi-pen-fill"></i></button>
                <button disabled={data.role === 'admin'} className="btn btn-outline-danger" onClick={() => { handleDelete(data.id) }}><i className="bi bi-trash3-fill"></i></button>
              </div>
            </div>
          )
        })}
      </div>}
    </div >
  )
}

export default _AcceptedUsers