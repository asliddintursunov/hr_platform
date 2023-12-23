import { DownloadIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../../../utils/api"

function DownloadResume() {
  const [datas, setDatas] = useState({})
  const userId = localStorage.getItem("userId")
  const userRole = localStorage.getItem("userRole")

  const downloadResume = (content, filename, contentType) => {
    if (!contentType) contentType = "application/octet-stream"
    var a = document.createElement("a")
    var blob = new Blob([content], { type: contentType })
    a.href = window.URL.createObjectURL(blob)
    a.download = filename
    a.click()
  }

  const generateResume = (userData) => {
    const { fullname, email, about, address, date_birth, major, experience, skills, phone_number, degree_general } = userData

    const resumeContent = `
			Name: ${fullname}
			Email: ${email}
			About: ${about}
			Address: ${address}
			Date of Birth: ${date_birth}
			Major: ${major}
			Experience: ${experience}
			Skills: ${skills.map((skill) => {
        return `${skill}`
      })}
			Phone Number: ${phone_number.map((number) => {
        return `- ${number}`
      })}
			Education: ${degree_general.map((edu) => {
        return `- ${edu.degree} - ${edu.universityMajor} at ${edu.universityName} (${edu.fromYear} - ${edu.toYear})`
      })}
		`
    console.log(resumeContent)

    downloadResume(resumeContent, "resume.txt", "text/plain")
  }

  const getUserData = () => {
    axios
      .get(`${baseUrl}/user/${userId}`, {
        headers: {
          "X-UserRole": userRole,
          "X-UserId": userId
        }
      })
      .then((res) => {
        generateResume(res.data)
        // setDatas(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Button variant="outline" color="orange" size="2" onClick={() => getUserData()}>
        Download your resume <DownloadIcon />
      </Button>
    </div>
  )
}

export default DownloadResume
