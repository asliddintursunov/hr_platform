import { googleLogout } from "@react-oauth/google";
import { createSlice } from "@reduxjs/toolkit";

const userRole = localStorage.getItem("userRole")
const userId = localStorage.getItem("userId")

const headers = {
  'X-UserRole': userRole,
  'X-UserId': userId
}

export const userDataSlice = createSlice({
  initialState: headers,
  name: 'headers',
  reducers: {
    sendHeaders: (state) => {
      state["X-UserId"] = localStorage.getItem("userId")
      state["X-UserRole"] = localStorage.getItem("userRole")
    },
    logoutUser: () => {

      googleLogout()
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userId")
      setTimeout(() => {
        // location.assign('/signin')
      }, 1000);

    }
  }
})

export const { sendHeaders, logoutUser } = userDataSlice.actions
export default userDataSlice.reducer