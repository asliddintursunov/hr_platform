import { configureStore } from "@reduxjs/toolkit";
import userConnectionSlice from "../features/socketConnectionSlice";
import chartsSlice from "../features/chartsSlice";
import chatWebSocketPlaceSlicer from "../features/chatWebSocketPlaceSlicer";


export const store = configureStore({
  reducer: {
    connection: userConnectionSlice,
    charts: chartsSlice,
    usersData: chatWebSocketPlaceSlicer,
  }
})