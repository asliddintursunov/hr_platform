import { configureStore } from "@reduxjs/toolkit";
import userConnectionSlice from "./features/socketConnectionSlice";
import chartsSlice from "./features/chartsSlice";
import chatWebSocketPlaceSlicer from "./features/chatWebSocketPlaceSlicer";
import userDataSlice from "./features/userDataSlice";

export const store = configureStore({
  reducer: {
    connection: userConnectionSlice,
    charts: chartsSlice,
    usersData: chatWebSocketPlaceSlicer,
    headers: userDataSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})