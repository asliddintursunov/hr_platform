import axios from "axios"
import '../Admin.css'
import { useCallback, useEffect, useState } from "react"
import _PopUp from "../../_PopUp"
import { useNavigate } from "react-router-dom"
import useURL from "../../../hooks/useURL"
import styles from '../../../css/Admin.module.css'
import { baseUrl } from "../../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, sendHeaders } from "../../../features/userDataSlice"

function _NotAcceptedUsers() {
  const head = useSelector((state) => state.headers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { defaultImage } = useURL()

  const [datas, setDatas] = useState('')
  const [isPending, setIsPending] = useState(false)

  // Pop Up States
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState('')
  const [errorOccured, setErrorOccured] = useState('')

  useEffect(
    () => {
      dispatch(sendHeaders())
    }, []
  )
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
    axios.get(`${baseUrl}/users`, { headers: head })
      .then((req) => {
        setDatas(req.data)
        setIsPending(false)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data)
          dispatch(logoutUser())
        }
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setIsPending(false)
      })
  }, [tokenExpired])

  useEffect(() => { fetchData() }, [fetchData])

  const AddUser = (id) => {

    setDatas(prev => {
      return prev.filter(e => e.id !== id)
    })

    axios.patch(`${baseUrl}/user/${id}`, {
      accepted: true,
    }, { headers: head })
      .then((res) => {
        setPopupInfo(res.data)
        setErrorOccured(false)
        setIsOpen(true)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data)
          dispatch(logoutUser())
        }
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

    axios.delete(`${baseUrl}/user/${id}`, { headers: head })
      .then((res) => {
        console.log(res);
        setPopupInfo(res.data)
        setIsOpen(true)
        setErrorOccured(false)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data)
          dispatch(logoutUser())
        }
        if (err.response.data.msg) {
          tokenExpired(err.response.data.msg)
        }
        setPopupInfo('Qandaydir xatolik ro\'y berdi!')
        setErrorOccured(true)
        setIsOpen(true)
      })

  }
  return (
    <div className={`form-control container ${styles.acceptedUsersContainer}`}>
      <div className="text-center d-flex align-items-center justify-content-center">
        <div className="col-1"><h4>ID</h4></div>
        <div className="col-3"><h4>User</h4></div>
        <div className="col-3"><h4>Username</h4></div>
        <div className="col-3"><h4>E-mail</h4></div>
        <div className="col-2"><h4>Accepted</h4></div>
      </div>
      {isPending && <div className="loaderr"></div>}
      {isOpen && <_PopUp errorOccured={errorOccured} popupInfo={popupInfo} setIsOpen={setIsOpen} />}
      {!isPending && <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
        <hr style={{ width: '100%' }} />
        {datas && datas.map(data => {
          return (!data.accepted &&
            <div key={data.id} className={`form-control ${styles.userDataContainerDiv}`}>
              <div className="col-1 text-center">
                <b>#{data.id}</b>
              </div>
              <div className={`col-3 ${styles.userImgName}`}>
                {data.profile_photo ? <img className="user-image" src={data.profile_photo} /> : <img className="user-image" src={defaultImage} />}
                <p className="text-wrap">{data.fullname}</p>
              </div>
              <div className="col-3 text-center">
                <p>{data.username}</p>
              </div>
              <div className="col-3 text-center">
                <p>{data.email}</p>
              </div>
              {<div className={`col-2 ${styles.changeDeleteBtn}`}>
                {!data.accepted && <button className="btn btn-outline-success" onClick={() => AddUser(data.id)}><i className="bi bi-check-square-fill"></i></button>}
                {!data.accepted && <button className="btn btn-outline-danger" onClick={() => RejectUser(data.id)}><i className="bi bi-trash3-fill"></i></button>}
              </div>}
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default _NotAcceptedUsers