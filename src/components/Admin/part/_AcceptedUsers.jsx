import axios from "axios"
import '../Admin.css'
import { useCallback, useEffect, useState } from "react"

function _AcceptedUsers() {

  const url = 'http://localhost:3000/users'

  const [datas, setDatas] = useState('')
  const [userRole, setUserRole] = useState('user')

  const fetchData = useCallback(() => {
    axios.get(url)
      .then((req) => {
        setDatas(req.data)
      })
      .catch((err) => console.error(err))
  }, [url])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = (id) => {

    setDatas(prev => {
      return prev.filter(data => data.id !== id)
    })

    axios.delete(url + `/${id}`)
      .then(() => alert('User has been deleted!'))
      .catch(() => alert('Error occured!'))
  }

  const handleEdit = (id) => {
    axios.patch(url + `/${id}`, {
      role: userRole,
    })
      .then(() => alert('User Role has been Changed!'))
      .catch(() => alert('Somthing went wrong!'))
  }

  return (
    <div className="form-control container">
      <div className="text-center d-flex align-items-center justify-content-center">
        <div className="col-1"><h4>ID</h4></div>
        <div className="col-3"><h4>User</h4></div>
        <div className="col-2"><h4>Username</h4></div>
        <div className="col-3"><h4>E-mail</h4></div>
        <div className="col-1"><h4>Role</h4></div>
        <div className="col-2"><h4>Edit</h4></div>
      </div>
      <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
        <hr style={{ width: '100%' }} />
        {datas && datas.map(data => {
          return (data.accepted &&
            <div key={data.id} className="form-control d-flex align-items-center justift-content-between gap-2">
              <div className="col-1 text-center">
                <b>#{data.id}</b>
              </div>
              <div className="col-3 d-flex align-items-center justify-content-center text-secondary gap-4">
                <img className="user-image" src={data.profile_photo} />
                <p className="text-wrap">{data.fullname}</p>
              </div>
              <div className="col-2 text-center text-secondary">
                <p>{data.username}</p>
              </div>
              <div className="col-3 text-center text-secondary">
                <p>{data.email}</p>
              </div>
              <div className="col-1 d-flex align-items-center justify-content-around">
                <select className="form-select text-center user-role" name="userRole" onChange={e => { setUserRole(e.target.value) }}>
                  <option selected value='user'></option>
                  <option value='user'>User</option>
                  <option value='superuser'>Super User</option>
                </select>
              </div>
              <div className="col-1 text-left admin-edit">
                <button className="btn btn-success" onClick={() => handleEdit(data.id)}>Change</button>
              </div>
              <div className="col-1 text-left admin-edit">
                <button className="btn btn-danger" onClick={() => { handleDelete(data.id) }}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default _AcceptedUsers