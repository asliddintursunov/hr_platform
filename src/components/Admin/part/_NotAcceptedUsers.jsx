import axios from "axios"
import '../Admin.css'
import { useCallback, useEffect, useState } from "react"

function _NotAcceptedUsers() {
  const url = 'http://192.168.3.140:1000/users'

  const [datas, setDatas] = useState('')

  const fetchData = useCallback(() => {
    axios.get(url)
      .then((req) => setDatas(req.data))
      .catch((err) => console.error(err))
  }, [url])

  useEffect(() => { fetchData() }, [fetchData])

  const AddUser = (id) => {
    setDatas(prev => {
      return prev.filter(e => e.id !== id)
    })

    axios.patch(url + `/${id}`, {
      accepted: true,
    })
      .then(() => alert('New User Added!'))
      .catch(() => alert('Error Occured On Adding New User'))
  }

  const RejectUser = (id) => {
    setDatas(prev => {
      return prev.filter(e => e.id !== id)
    })

    axios.delete(url + `/${id}`)
      .then(() => alert('User Is Rejected'))
      .catch(() => alert('Error Occured On Rejecting New User'))
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
      <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
        <hr style={{ width: '100%' }} />
        {datas && datas.map(data => {
          return (!data.accepted &&
            <div key={data.id} className="form-control d-flex align-items-center justift-content-between gap-2 bg-light">
              <div className="col-1 text-center">
                <b>#{data.id}</b>
              </div>
              <div className="col-3 d-flex align-items-center text-secondary gap-4 text-secondary">
                <img className="user-image" src={data.profile_photo} />
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
      </div>
    </div>
  )
}

export default _NotAcceptedUsers