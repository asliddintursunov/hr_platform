import { createSlice } from "@reduxjs/toolkit";

const headers = {
  userId: null,
  userRole: null,
}

export const userDataSlice = createSlice({
  initialState: headers,
  name: 'headers',
  reducers: {
    fetchUserIdHeader: (state, action) => {
      state.userId = action.payload
      console.log(action.payload);
    },
    fetchUserRoleHeader: (state, action) => {
      state.userRole = action.payload
      console.log(action.payload);
    },
  }
})

export const { fetchUserIdHeader, fetchUserRoleHeader } = userDataSlice.actions
export default userDataSlice.reducer