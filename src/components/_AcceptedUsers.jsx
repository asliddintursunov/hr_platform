import axios from "axios"
import { useCallback, useEffect, useState } from "react"

function _AcceptedUsers() {

  const url = 'http://localhost:3000/users'

  const [datas, setDatas] = useState('')
  
  const fetchData = useCallback(() => {
    axios.get(url)
      .then((req) => setDatas(req.data))
      .catch((err) => console.error(err))
  }, [url])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <div className="container row-6 d-flex flex-column align-items-center justift-content-center gap-3 mb-4">
      {datas && datas.map(data => {
        return (
          data.accepted &&
          <div key={data.id} className="form-control d-flex align-items-center justift-content-between gap-2">
            <div className="d-flex flex-column align-items-center justift-content-between gap-1">
              <h4>Username: <i>{data.username}</i></h4>
              <h5>Password <i>{data.password}</i></h5>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default _AcceptedUsers