import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from '../../../css/EditProfile.module.css'
import '../../../App.css'
// eslint-disable-next-line react/prop-types
function AddPhoneNumber({ numbers, newNumber, setNewNumber, handleAddNewNumber, handleDelete, changeProfile }) {
  return (
    <div className={`form-control container ${styles.PhoneNumberInputContainer}`}>
      <div className={styles.userPhoneNumber}>
        <div className="col">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <label>
              <h3><b>Phone Number</b></h3>
              <PhoneInput
                value={newNumber}
                country='uz'
                type="text"
                onChange={e => setNewNumber(e)}
                inputProps={{
                  required: true,
                }}
                disabled={!changeProfile}
              /></label>
            <button disabled={!changeProfile} onClick={handleAddNewNumber} className={`btn btn-primary ${styles.addBtn}`}>Add</button>
          </div>
        </div>
        <div className={`col ${styles.userPhoneNumberList}`}>
          {/* eslint-disable-next-line react/prop-types */}
          {numbers && numbers.map(number => {
            return (
              <div className={`form-control ${styles.userPhoneNumberListItem}`} key={number}>
                <h3>{number}</h3>
                {changeProfile && <button className={styles.deleteBtn} disabled={!changeProfile} onClick={() => handleDelete(number)}><i className="bi bi-trash-fill" ></i></button>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default AddPhoneNumber
