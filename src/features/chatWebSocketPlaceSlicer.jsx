import { createSlice } from "@reduxjs/toolkit";

const userData = {
  usersData: [],
  usersImage: [],
}


export const getData = createSlice({
  name: 'usersdata',
  initialState: userData,
  reducers: {
    setUsersData: (state, action) => {
      state.usersData = action.payload
    },
    setUsersImage: (state, action) => {
      state.usersImage = action.payload
    }
  }
})

export const { setUsersData, setUsersImage } = getData.actions
export default getData.reducer