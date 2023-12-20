import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  resumeUsername: "",
  resumeId: null
}

export const resumeUsernameSlice = createSlice({
  initialState,
  name: "resumeUsername",
  reducers: {
    resumeUsername: (state, action) => {
      state.resumeUsername = action.payload
      console.log("resumeUsername worked")
    },
    resumeId: (state, action) => {
      state.resumeId = action.payload
      console.log("resumeId worked")
    }
  }
})

export const { resumeUsername, resumeId } = resumeUsernameSlice.actions
export default resumeUsernameSlice.reducer
