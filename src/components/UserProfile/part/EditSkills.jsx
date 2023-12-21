/* eslint-disable react/prop-types */
import additional from "../../../styles/Additional.module.css"
import { PlusIcon } from "@radix-ui/react-icons"
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import styles from "../../../styles/EditProfile.module.css"
import hrstyle from "../../../styles/HR_Register.module.css"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { useState } from "react"
function EditSkills({ changeProfile, customTechList, setCustomTechList, skills, setSkills, customTech, setCustomTech, UserSkills }) {
  const [openToast, setOpenToast] = useState(false)
  const [toastInfo, setToastInfo] = useState("")
  const [skillLimit, setSkillLimit] = useState(24)

  const seeSkills = (value) => {
    if (skills.includes(value)) {
      setSkills((prev) => prev.filter((skill) => skill !== value))
    } else {
      setSkills((prev) => [...prev, value])
    }
  }

  const handleAddCustomTech = () => {
    if (customTech && !customTechList.includes(customTech) && !UserSkills.includes(customTech.toLowerCase())) {
      setCustomTechList((prev) => [...prev, customTech])
      setSkills((prev) => [...new Set([...prev, customTech])])
      setCustomTech("")
      setSkillLimit(30)
    } else {
      setOpenToast(false)
      setTimeout(() => {
        setOpenToast(true)
        setToastInfo("This technology already exists or is invalid")
      }, 100)
    }
  }

  const handleDeleteCustomTech = (tech) => {
    setCustomTechList((prev) => prev.filter((t) => t !== tech))
    const updatedSkills = skills.filter((skill) => skill !== tech)

    setSkills(updatedSkills)
  }

  return (
    <>
      {openToast && (
        <div className={styles.toastContainer}>
          <span>{toastInfo}</span>
          <button onClick={() => setOpenToast(false)}>undo</button>
        </div>
      )}
      <div className={additional.skillsContainier}>
        <div className={styles.CustomTechContainer}>
          <Text as="label" style={{ fontSize: "1.8rem" }}>
            Custom Technologies
          </Text>
          <Flex direction="row" align="center" gap="4" wrap="wrap">
            {UserSkills.map((skill) => {
              return (
                <Flex key={skill} mb="2" style={{ width: "150px" }}>
                  <Checkbox.Root className={hrstyle.CheckboxRoot} id={skill} onClick={(e) => seeSkills(e.target.id)} checked={skills.includes(skill)} disabled={!changeProfile}>
                    <Checkbox.Indicator className={hrstyle.CheckboxIndicator}>
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Text as="label" className={hrstyle.Label} htmlFor={skill} style={{ textTransform: "capitalize" }}>
                    {skill}
                  </Text>
                </Flex>
              )
            })}
          </Flex>
          <br />
          <Dialog.Root>
            <Dialog.Trigger>
              <Button radius="full" variant="outline" disabled={!changeProfile}>
                <PlusIcon style={PlusIconStyle} width="18" height="18" /> Create Custom Skill
              </Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>More Technology</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make additional changes to the your skills.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Custom Tech
                  </Text>
                  <TextField.Input value={customTech} onChange={(e) => {
                    if (e.target.value.length <= 30) {
                      setCustomTech(e.target.value)
                      setSkillLimit(30 - e.target.value.length)
                    }
                  }} placeholder="Enter one Technology name" />
                  <span>{skillLimit}/30</span>
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleAddCustomTech}>Add</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
          <Text as="div" mt="4" className={styles.TechListContainer}>
            {customTechList.length > 0 &&
              customTechList.map((tech) => {
                return (
                  <Text as="div" key={tech} className={styles.techCard} style={{ border: !changeProfile && "1px solid gray" }}>
                    <Text as="span" size="3" weight="bold">
                      {tech}
                    </Text>
                    {changeProfile && (
                      <Button
                        color="red"
                        size="small"
                        className={styles.CustomTechDeleteButton}
                        onClick={() => {
                          handleDeleteCustomTech(tech)
                        }}
                      >
                        &times;
                      </Button>
                    )}
                  </Text>
                )
              })}
          </Text>
        </div>
      </div>
    </>
  )
}

export default EditSkills
const PlusIconStyle = {
  backgroundColor: "royalblue",
  color: "#fff",
  borderRadius: "50%"
}
