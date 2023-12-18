import { createSlice } from "@reduxjs/toolkit"

const chatMsgCount = {
  count: 0
}
export const chatMsgCountSlice = createSlice({
  name: "chatMsgCount",
  initialState: chatMsgCount,
  reducers: {
    setCount: (state, action) => {
      return {
        ...state,
        count: action.payload
      }
    }
  }
})

export const { setCount } = chatMsgCountSlice.actions
export default chatMsgCountSlice.reducer