import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../../../App.css'
// eslint-disable-next-line react/prop-types
function AddPhoneNumber({numbers, newNumber, setNewNumber, handleAddNewNumber, handleDelete ,changeProfile}) {

  return (
    <div className="form-control container d-flex flex-column align-items-center gap-2 bg-light">
      <h3>Add Number</h3>
      <div className="row d-flex align-items-start justify-content-around">
        <div className="col">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <label>
              <PhoneInput value={newNumber}
                country='uz'
                type="text"
                onChange={e => setNewNumber(e)}
                inputProps={{
                  required: true,
                }}
                disabled={!changeProfile}
              /></label>
            <button disabled={!changeProfile} onClick={handleAddNewNumber} className="btn btn-primary add-btn">Add</button>
          </div>
        </div>
        <div className="col">
           {/* eslint-disable-next-line react/prop-types */}
          { numbers.map(number => {
            return (
              <div className="form-control d-flex justify-content-between gap-2 mt-2" key={number.id}>
                <h3>{number.number}</h3>
                <button disabled={!changeProfile} className="btn btn-danger" onClick={() => handleDelete(number.id)}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AddPhoneNumber