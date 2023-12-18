import { configureStore } from "@reduxjs/toolkit";
import userConnectionSlice from "./features/socketConnectionSlice";
import chartsSlice from "./features/chartsSlice";
import userDataSlice from "./features/userDataSlice";
import chatMsgCountSlice from "./features/chatMsgCountSlice";

export const store = configureStore({
  reducer: {
    connection: userConnectionSlice,
    charts: chartsSlice,
    headers: userDataSlice,
    chatMsgCount: chatMsgCountSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})