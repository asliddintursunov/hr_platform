import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../utils/api"
const userRole = localStorage.getItem("userRole")
const userId = localStorage.getItem("userId")

export const fetchMajors = createAsyncThunk("charts/fetchMajors", async () => {
  const response = await axios.get(`${baseUrl}/stat`, {
    headers: {
      "X-UserRole": userRole,
      "X-UserId": userId
    }
  })
  return response.data
})

const initialChars = {
  major: {
    byDate: [],
    userCount: [],
    userMajor: [],
    userMajorCount: [],
    backendDev: [],
    frontendDev: [],
    fullstackDev: [],
    MobileDev: [],
    DesktopDev: [],
    DesignDev: []
  },
  status: "idle",
  error: null
}

const chartsSlice = createSlice({
  name: "charts",
  initialState: initialChars,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMajors.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchMajors.fulfilled, (state, action) => {
        state.status = "succeeded"

        const experienceFilter = action.payload[action.payload.length - 1].experience

        state.major.frontendDev = experienceFilter.filter((item) => item.major === "Frontend")
        state.major.backendDev = experienceFilter.filter((item) => item.major === "Backend")
        state.major.fullstackDev = experienceFilter.filter((item) => item.major === "FullStack")
        state.major.MobileDev = experienceFilter.filter((item) => item.major === "Mobile")
        state.major.DesktopDev = experienceFilter.filter((item) => item.major === "Desktop")
        state.major.DesignDev = experienceFilter.filter((item) => item.major === "Design")

        // Getting User type keys
        const userTypeUserCount = action.payload.filter((item) => item.type === "user_count")
        const userTypeDeveloperCount = action.payload.filter((item) => item.type === "developer_count")

        // Getting users data
        const dates = userTypeUserCount.map((item) => item.date.slice(0, 10))
        state.major.byDate = dates

        // Getting users number
        const userNumbers = userTypeUserCount.map((item) => item.count)
        state.major.userCount = userNumbers

        // Getting Users' major
        const major = userTypeDeveloperCount.map((item) => item.major)
        state.major.userMajor = major

        // Getting Users' major count
        const majorCount = userTypeDeveloperCount.map((item) => item.count)
        state.major.userMajorCount = majorCount
      })
      .addCase(fetchMajors.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  }
})

export const allMajors = (state) => state.charts.major

export default chartsSlice.reducer
