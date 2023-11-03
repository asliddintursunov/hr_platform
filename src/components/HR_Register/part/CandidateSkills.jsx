import { PlusIcon } from "@radix-ui/react-icons"
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import styles from '../../../styles/EditProfile.module.css'
import { useState } from "react"
function CandidateSkills({ customTechList, setCustomTechList }) {
  const [customTech, setCustomTech] = useState("Pascal")

  const handleAddCustomTech = () => {
    if (customTech && !customTechList.includes(customTech)) {
      setCustomTechList((prev) => [...prev, customTech])
    } else {
      alert('This technology already exists')
    }
    setCustomTech("Pascal")
  }

  return (
    <div className={styles.CustomTechContainer}>
      <Text as="label" style={{ fontSize: '1.8rem' }}>
        Custom Technalogies
      </Text>
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
              <TextField.Input
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                placeholder="Enter one technalogy name" />
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
      <Text as='div' className={styles.TechListContainer}>
        {customTechList.length > 0 && customTechList.map((tech) => {
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
                  setCustomTechList(customTechList.filter((item) => item !== tech))
                }}>
                &times;
              </Button>
            </Text>
          )
        })}
      </Text>
    </div>
  )
}

export default CandidateSkills

const PlusIconStyle = {
  backgroundColor: "royalblue",
  color: "#fff",
  borderRadius: "50%"
}