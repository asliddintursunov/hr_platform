import { useState } from "react"
import university from "../../../styles/EditProfile.module.css"
import { Button, Checkbox, Flex, Select, Table, Text, TextField } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import "@radix-ui/themes/styles.css"

function CandidateEducation({ candidateEducation, setCandidateEducation }) {
  const [degree, setDegree] = useState("bacheloer")
  const [universityMajor, setUniversityMajor] = useState("")
  const [fromYear, setFromYear] = useState(0)
  const [toYear, setToYear] = useState(0)
  const [stillStudying, setStillStudying] = useState(false)
  const [universityName, setUniversityName] = useState("")
  const [universityLocation, setUniversityLocation] = useState("")

  const addEducation = () => {
    setCandidateEducation([
      ...candidateEducation,
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
  }

  return (
    <>
      <div className={university.AddCandidateUniversityContainer}>
        <div className={university.UniversityDegreeYearContainer}>
          <div className={university.SelectDegree}>
            <Select.Root defaultValue={degree} onValueChange={(e) => setDegree(e)}>
              <Text as="label">Degree</Text>
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value="no degree">No degree</Select.Item>
                <Select.Item value="bacheloer">Bacheloer</Select.Item>
                <Select.Item value="master">Master</Select.Item>
                <Select.Item value="phd">PhD</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          <div className={university.SelectMajor}>
            <Text as="label" htmlFor="university-major">
              Major
            </Text>
            <TextField.Input id="university-major" placeholder="Computer Science" onChange={(e) => setUniversityMajor(e.target.value)} value={universityMajor} />
          </div>
          <div className={university.SelectStudiedYear}>
            <Text as="label">
              From
              <TextField.Input type="number" placeholder="2017" onChange={(e) => setFromYear(Number(e.target.value))} value={fromYear <= 0 ? "" : fromYear} />
            </Text>
            <Text as="label">
              To
              <TextField.Input
                type={stillStudying ? "text" : "number"}
                placeholder="2021"
                disabled={stillStudying ? true : false}
                onChange={(e) => setToYear(Number(e.target.value))}
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
                  />{" "}
                  Still Studying
                </Flex>
              </Text>
            </Text>
          </div>
        </div>
        <hr />
        <div className={university.UniversityNameLocation}>
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
        <Button className={university.AddEducationButton} onClick={addEducation}>
          <PlusIcon />
        </Button>
      </div>
      {candidateEducation.length > 0 && (
        <Table.Root variant="surface" mt="6">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Major</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Education Year</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>University Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>University Location</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateEducation.map((edu, index) => (
              <Table.Row key={index}>
                <Table.Cell>{edu.degree}</Table.Cell>
                <Table.Cell>{edu.universityMajor}</Table.Cell>
                <Table.Cell>
                  {edu.fromYear} - {edu.toYear}
                </Table.Cell>
                <Table.Cell>{edu.universityName}</Table.Cell>
                <Table.Cell>{edu.universityLocation}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  )
}

export default CandidateEducation
