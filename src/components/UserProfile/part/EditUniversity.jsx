import { useState, useEffect } from "react"
import styles from "../../../styles/EditProfile.module.css"
import "@radix-ui/themes/styles.css"
import { Button, Checkbox, Flex, Select, Table, Text, TextField } from "@radix-ui/themes"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"

function EditUniversity({ education, setEducation, changeProfile }) {
  const [degree, setDegree] = useState("bacheloer")
  const [universityMajor, setUniversityMajor] = useState("")
  const [fromYear, setFromYear] = useState(0)
  const [toYear, setToYear] = useState(0)
  const [stillStudying, setStillStudying] = useState(false)

  const [universityName, setUniversityName] = useState("")
  const [universityLocation, setUniversityLocation] = useState("")
  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    if (degree !== "" && universityMajor !== "" && fromYear !== 0 && toYear !== 0 && universityName !== "" && universityLocation !== "") {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, [degree, universityMajor, fromYear, toYear, universityName, universityLocation])

  const addEducation = () => {
    if (universityMajor !== "" && fromYear !== 0 && toYear !== 0 && universityName !== "" && universityLocation !== "") {
      setEducation((prev) => [
        ...prev,
        {
          degree,
          universityMajor,
          fromYear,
          toYear,
          universityName,
          universityLocation
        }
      ])
      setDegree("bacheloer")
      setUniversityMajor("")
      setFromYear(0)
      setToYear(0)
      setUniversityName("")
      setUniversityLocation("")
      setStillStudying(false)
    }
  }
  const handleEducationDelete = (index) => {
    const newEducation = [...education]
    newEducation.splice(index, 1)
    setEducation(newEducation)
  }
  return (
    <div>
      <div className={styles.AddUniversityContainer}>
        <div className={styles.UniversityDegreeYearContainer}>
          <div className={styles.SelectDegree}>
            <Select.Root defaultValue={degree} onValueChange={(e) => setDegree(e)} disabled={!changeProfile}>
              <Text as="label">Degree</Text>
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value="highschool">No degree</Select.Item>
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
            <TextField.Input
              id="university-major"
              placeholder="Computer Science"
              onChange={(e) => {
                if (e.target.value.length <= 20) {
                  setUniversityMajor(e.target.value)
                }
              }}
              value={universityMajor}
              disabled={!changeProfile}
            />
          </div>
          <div className={styles.SelectStudiedYear}>
            <Text as="label">
              From
              <TextField.Input
                type="number"
                placeholder="2017"
                onChange={(e) => {
                  if (Number(e.target.value) <= new Date().getFullYear()) {
                    setFromYear(Number(e.target.value))
                  }
                }}
                value={fromYear <= 0 ? "" : fromYear}
                disabled={!changeProfile}
              />
            </Text>
            <Text as="label">
              To
              <TextField.Input
                type={stillStudying ? "text" : "number"}
                placeholder="2021"
                disabled={stillStudying ? true : !changeProfile}
                onChange={(e) => {
                  if (Number(e.target.value) <= new Date().getFullYear() + 10) {
                    setToYear(Number(e.target.value))
                  }
                }}
                value={stillStudying ? "still studying" : toYear <= 0 ? "" : toYear}
              />
              <Text as="label" size="2">
                <Flex gap="2">
                  <Checkbox
                    checked={stillStudying}
                    onCheckedChange={() => {
                      stillStudying ? setToYear(0) : setToYear("still studying")
                      setStillStudying(!stillStudying)
                    }}
                    disabled={!changeProfile}
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
            <TextField.Input
              placeholder="Inha University in Tashkent"
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setUniversityName(e.target.value)
                }
              }}
              value={universityName}
              disabled={!changeProfile}
            />
          </Text>
          <Text as="label">
            University Location
            <TextField.Input
              placeholder="Tashkent, Uzbekistan"
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setUniversityLocation(e.target.value)
                }
              }}
              value={universityLocation}
              disabled={!changeProfile}
            />
          </Text>
        </div>
        <hr />
        <Button className={styles.AddEducationButton} onClick={addEducation} disabled={!isFilled}>
          <PlusIcon />
        </Button>
      </div>

      {education.length > 0 && (
        <Table.Root variant="surface" mt="6">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Major</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Education Year</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>University Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>University Location</Table.ColumnHeaderCell>
              {changeProfile && <Table.ColumnHeaderCell>Remove</Table.ColumnHeaderCell>}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {education.map((edu, index) => (
              <Table.Row key={index}>
                <Table.Cell>{edu.degree}</Table.Cell>
                <Table.Cell>{edu.universityMajor}</Table.Cell>
                <Table.Cell>
                  {edu.fromYear} - {edu.toYear}
                </Table.Cell>
                <Table.Cell>{edu.universityName}</Table.Cell>
                <Table.Cell>{edu.universityLocation}</Table.Cell>
                {changeProfile && (
                  <Table.Cell>
                    <Button color="red" variant="soft" onClick={() => handleEducationDelete(index)}>
                      <TrashIcon />
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  )
}

export default EditUniversity
