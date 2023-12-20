import { googleLogout } from "@react-oauth/google";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}
export const userDataSlice = createSlice({
  initialState,
  name: 'logoutUser',
  reducers: {
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

export const { logoutUser } = userDataSlice.actions
export default userDataSlice.reducer