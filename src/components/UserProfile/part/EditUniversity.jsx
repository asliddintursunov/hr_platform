import { useEffect, useState } from "react"
import styles from "../../../styles/EditProfile.module.css"
import "@radix-ui/themes/styles.css"
import { Button, Checkbox, Flex, Select, Text, TextField } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"

function EditUniversity({ education, setEducation }) {
  const [degree, setDegree] = useState("bacheloer")
  const [universityMajor, setUniversityMajor] = useState("")
  const [fromYear, setFromYear] = useState(0)
  const [toYear, setToYear] = useState(0)
  const [stillStudying, setStillStudying] = useState(false)

  const [universityName, setUniversityName] = useState("")
  const [universityLocation, setUniversityLocation] = useState("")

  return (
    <div>
      <div className={styles.AddUniversityContainer}>
        <div className={styles.UniversityDegreeYearContainer}>
          <div className={styles.SelectDegree}>
            <Select.Root defaultValue={degree} onValueChange={(e) => setDegree(e)}>
              <Text as="label">Degree</Text>
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value="bacheloer">Bacheloer</Select.Item>
                <Select.Item value="master">Master</Select.Item>
                <Select.Item value="phd">PhD</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          <div className={styles.SelectMajor}>
            <Text as="label" htmlFor="university-major">
              Major
            </Text>
            <TextField.Input id="university-major" placeholder="Computer Science" onChange={(e) => setUniversityMajor(e.target.value)} value={universityMajor} />
          </div>
          <div className={styles.SelectStudiedYear}>
            <Text as="label">
              From
              <TextField.Input type="number" placeholder="2017" onChange={(e) => setFromYear(Number(e.target.value))} value={fromYear <= 0 ? "" : fromYear} />
            </Text>
            <Text as="label">
              To
              <TextField.Input
                type="number"
                placeholder="2021"
                disabled={stillStudying}
                onChange={(e) => setToYear(Number(e.target.value))}
                value={stillStudying ? Number(new Date().getFullYear()) : toYear <= 0 ? "" : toYear}
              />
              <Text as="label" size="2">
                <Flex gap="2">
                  <Checkbox
                    checked={stillStudying}
                    onCheckedChange={() => {
                      stillStudying ? setToYear(0) : setToYear(Number(new Date().getFullYear()))
                      setStillStudying(!stillStudying)
                    }}
                  />{" "}
                  Still Studying
                </Flex>
              </Text>
            </Text>
          </div>
        </div>
        <hr />
        <div className={styles.UniversityNameLocation}>
          <Text as="label">
            University Name
            <TextField.Input placeholder="Inha University in Tashkent" onChange={(e) => setUniversityName(e.target.value)} value={universityName} />
          </Text>
          <Text as="label">
            University Location
            <TextField.Input placeholder="Tashkent, Uzbekistan" onChange={(e) => setUniversityLocation(e.target.value)} value={universityLocation} />
          </Text>
        </div>
        <hr />
        <Button className={styles.AddEducationButton}><PlusIcon /></Button>
      </div>
    </div>
  )
}

export default EditUniversity
