import { useState } from "react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../App.css'

function AddPhoneNumber() {
  const [numbers, setNumbers] = useState([])
  const [newNumber, setNewNumber] = useState('998')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setNumbers(prev => [...prev, {id: numbers.length + 1, number: newNumber}])
    setNewNumber('998')
    console.log(numbers);
  }

  const handleDelete = (id) => {
    setNumbers(prev => {
      return prev.filter(e => e.id !== id)
    })
  }

  return (
    <div className="form-control container d-flex flex-column align-items-center gap-2">
      <h3>Add Number</h3>
      <div className="row d-flex align-items-start justify-content-around">
        <div className="col">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <label>
              {/* <h3>Add Number</h3> */}
              <PhoneInput value={newNumber}
                country='uz'
                type="text"
                onChange={e => setNewNumber(e)}
                inputProps={{
                  required: true,
                }}
              /></label>
            <button onClick={handleSubmit} className="btn btn-primary add-btn">Add</button>
          </div>
        </div>
        <div className="col">
          {numbers.map(number => {
            return (
              <div className="form-control d-flex justify-content-between gap-2 mt-2" key={number.id}>
                <h3>{number.number}</h3>
                <button className="btn btn-danger" onClick={() => handleDelete(number.id)}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AddPhoneNumber