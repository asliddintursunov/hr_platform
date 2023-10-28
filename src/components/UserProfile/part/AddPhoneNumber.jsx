import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import styles from "../../../styles/EditProfile.module.css"
import { Code, Text } from "@radix-ui/themes"
import { Cross2Icon } from "@radix-ui/react-icons"

function AddPhoneNumber({ numbers, newNumber, setNewNumber, handleAddNewNumber, handleDelete, changeProfile }) {
  return (
    <div className={styles.PhoneNumberInputContainer}>
      <div className={styles.userPhoneNumber}>
        <div className="col">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <label>
              <Text className='underlined-label'>
                Phone Number
              </Text>
              <PhoneInput
                style={{ marginTop: "1.6rem" }}
                value={newNumber}
                country="uz"
                type="text"
                onChange={(e) => setNewNumber(e)}
                inputProps={{
                  required: true
                }}
                disabled={!changeProfile}
              />
            </label>
            <button disabled={!changeProfile} onClick={handleAddNewNumber} className={`btn btn-primary ${styles.addBtn}`}>
              Add
            </button>
          </div>
        </div>
        <div className={`col ${styles.userPhoneNumberList}`}>
          {numbers &&
            numbers.map((number) => {
              return (
                <div className={styles.userPhoneNumberListItem} key={number}>
                  <Text className={styles.PhoneNumber}>
                    <Code>
                      &#43;{number}&#160;
                      {changeProfile && <Cross2Icon className={styles.deleteIcon} disabled={!changeProfile} onClick={() => handleDelete(number)} />}
                    </Code>
                  </Text>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
export default AddPhoneNumber
