import { useEffect, useState } from "react"
import useURL from '../useURL'
import axios from "axios"
function useUserData() {
  const { usersStatsUrl } = useURL()

  const [byDate, setByDate] = useState([])
  const [userCount, setUserCount] = useState([])

  const [userMajor, setUserMajor] = useState([])
  const [userMajorCount, setUserMajorCount] = useState([])

  const [backendDev, setBackendDev] = useState([])
  const [frontendDev, setFrontendDev] = useState([])
  const [fullstackDev, setFullstackDev] = useState([])
  const [MobileDev, setMobileDev] = useState([])
  const [DesktopDev, setDesktopDev] = useState([])
  const [DesignDev, setDesignDev] = useState([])

  useEffect(
    () => {
      axios.get(usersStatsUrl)
        .then((res) => {
          const experienceFilter = res.data[res.data.length - 1].experience

          setFrontendDev(experienceFilter.filter(item => item.major === 'Frontend'))
          setBackendDev(experienceFilter.filter(item => item.major === 'Backend'))
          setFullstackDev(experienceFilter.filter(item => item.major === 'FullStack'))
          setMobileDev(experienceFilter.filter(item => item.major === 'Mobile'))
          setDesktopDev(experienceFilter.filter(item => item.major === 'Desktop'))
          setDesignDev(experienceFilter.filter(item => item.major === 'Design'))

          // Getting User type keys
          const userTypeUserCount = res.data.filter(item => item.type === 'user_count')
          const userTypeDeveloperCount = res.data.filter(item => item.type === 'developer_count')

          // Getting users data
          const dates = userTypeUserCount.map(item => item.date.slice(0, 10))
          setByDate(dates)

          // Getting users number
          const userNumbers = userTypeUserCount.map(item => item.count)
          setUserCount(userNumbers)

          // Getting Users' major
          const major = userTypeDeveloperCount.map(item => item.major)
          setUserMajor(major)

          // Getting Users' major count
          const majorCount = userTypeDeveloperCount.map(item => item.count)
          setUserMajorCount(majorCount)


        })
        .catch((err) => {
          console.log(err);
        })
    }, [usersStatsUrl]
  )
  return { byDate, userCount, userMajor, userMajorCount, 
    backendDev,
    frontendDev,
    fullstackDev,
    MobileDev,
    DesktopDev,
    DesignDev }
}

export default useUserData