import { PlusIcon } from "@radix-ui/react-icons"
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import styles from "../../../styles/EditProfile.module.css"
import hrstyle from "../../../styles/HR_Register.module.css"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { useState } from "react"

function CandidateSkills({ customTechList, setCustomTechList, skills, setSkills, customTech, setCustomTech, CandidateInitialSkills }) {
  const [openToast, setOpenToast] = useState(false)
  const [toastInfo, setToastInfo] = useState("")

  const seeSkills = (value) => {
    if (skills.includes(value)) {
      setSkills((prev) => prev.filter((skill) => skill !== value))
    } else {
      setSkills((prev) => [...prev, value])
    }
  }

  const handleAddCustomTech = () => {
    if (customTech && !customTechList.includes(customTech) && !CandidateInitialSkills.includes(customTech.toLowerCase())) {
      setCustomTechList((prev) => [...prev, customTech])
      setSkills((prev) => [...new Set([...prev, customTech])])
      setCustomTech("")
    } else {
      setOpenToast(false)
      setTimeout(() => {
        setOpenToast(true)
        setToastInfo("This technology already exists or is invalid")

        // setTimeout(() => {
        //   setOpenToast(false);
        // }, 1500);
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
      <div
        className={styles.CustomTechContainer}
        style={{
          position: "relative"
        }}
      >
        {openToast && (
          <div className={styles.toastContainer}>
            <span>{toastInfo}</span>
            <button onClick={() => setOpenToast(false)}>undo</button>
          </div>
        )}
        <Text as="label" style={{ fontSize: "1.8rem" }}>
          Custom Technalogies
        </Text>
        <Flex direction="row" align="center" gap="4" wrap="wrap">
          {CandidateInitialSkills.map((skill) => {
            return (
              <Flex key={skill} mb="2" style={{ width: "150px" }}>
                <Checkbox.Root className={hrstyle.CheckboxRoot} id={skill} onClick={(e) => seeSkills(e.target.id)} checked={skills.includes(skill)}>
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
        <Dialog.Root>
          <Dialog.Trigger>
            <Button radius="full" variant="outline">
              <PlusIcon style={PlusIconStyle} width="18" height="18" /> Create Custom Skill
            </Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>More technalogy</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Make additional changes to the candidate's skills.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Custom Tech
                </Text>
                <TextField.Input value={customTech} onChange={(e) => setCustomTech(e.target.value)} placeholder="Enter one technalogy name" />
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
        <Text as="div" className={styles.TechListContainer}>
          {customTechList.length > 0 &&
            customTechList.map((tech) => {
              return (
                <Text as="div" key={tech} className={styles.techCard}>
                  <Text as="span" size="3" weight="bold">
                    {tech}
                  </Text>
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
                </Text>
              )
            })}
        </Text>
      </div>
    </>
  )
}

export default CandidateSkills

const PlusIconStyle = {
  backgroundColor: "royalblue",
  color: "#fff",
  borderRadius: "50%"
}
