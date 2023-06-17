import axios from "axios"
import { useCallback, useEffect, useState } from "react"

function _NotAcceptedUsers() {
  const url = 'http://localhost:3000/users'

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
    <div>
      <div className="container row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
        {datas && datas.map(data => {
          return (!data.accepted &&
            <div key={data.id} className="form-control d-flex align-items-center justift-content-between gap-2">
              <div className="d-flex flex-column align-items-center justift-content-between gap-1">
                <h4>Username: <i>{data.username}</i></h4>
                <h5>Password <i>{data.password}</i></h5>
              </div>
              {<div className="d-flex align-items-center justift-content-between gap-1">
                {!data.accepted && <button className="btn btn-success" onClick={() => AddUser(data.id)}>✓</button>}
                {!data.accepted && <button className="btn btn-danger" onClick={() => RejectUser(data.id)}>✕</button>}
              </div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default _NotAcceptedUsers