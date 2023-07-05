import axios from "axios"
import './Admin.css'
import { Fragment, useCallback, useEffect, useState } from "react"

function Moderator() {

  const url = 'http://192.168.3.140:1000/users'

  const [datas, setDatas] = useState('')

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
      .then((res) => alert(res.data))
      .catch(() => alert('Error occured!'))
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
          <div className="col-1"><h4>ID</h4></div>
          <div className="col-3"><h4>User</h4></div>
          <div className="col-2"><h4>Username</h4></div>
          <div className="col-3"><h4>E-mail</h4></div>
          <div className="col-1"><h4>Role</h4></div>
          <div className="col-2"><h4>Delete</h4></div>
        </div>
        <div className="row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
          <hr style={{ width: '100%' }} />
          {datas && datas.map(data => {
            return (data.accepted &&
              <div key={data.id} className="form-control d-flex align-items-center justift-content-between gap-2 bg-light">
                <div className="col-1 text-center">
                  <b>#{data.id}</b>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center text-secondary gap-4">
                  <img className="user-image" src={data.profile_photo} />
                  <b className="text-wrap">{data.fullname}</b>
                </div>
                <div className="col-2 text-center text-secondary">
                  <b>{data.username}</b>
                </div>
                <div className="col-3 text-center text-secondary">
                  <b>{data.email}</b>
                </div>
                <div className="col-1 d-flex align-items-center justify-content-around text-secondary">
                  <b>{data.role}</b>
                </div>
                <div className="col-2 d-flex flex-column flex-sm-row align-items-center justify-content-center gap-sm-4 gap-2">
                  {data.role === 'user' && <button className="btn btn-danger" onClick={() => { handleDelete(data.id) }}>Delete</button>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

export default Moderator