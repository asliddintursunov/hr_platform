import { configureStore } from "@reduxjs/toolkit"
import userConnectionSlice from "./features/socketConnectionSlice"
import chartsSlice from "./features/chartsSlice"
import chatMsgCountSlice from "./features/chatMsgCountSlice"
import resumeUsernameSlice from "./features/resumeUsernameSlice"

export const store = configureStore({
  reducer: {
    connection: userConnectionSlice,
    charts: chartsSlice,
    chatMsgCount: chatMsgCountSlice,
    resumeUsername: resumeUsernameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
