import { configureStore } from "@reduxjs/toolkit";
import userConnectionSlice from "./features/socketConnectionSlice";
import chartsSlice from "./features/chartsSlice";
import userDataSlice from "./features/userDataSlice";

export const store = configureStore({
  reducer: {
    connection: userConnectionSlice,
    charts: chartsSlice,
    headers: userDataSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})