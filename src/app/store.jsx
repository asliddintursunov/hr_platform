import { configureStore } from "@reduxjs/toolkit";
import userConnectionSlice from "../features/socketConnectionSlice";
import chartsSlice from "../features/chartsSlice";

export const store = configureStore({
  reducer: {
    connection: userConnectionSlice,
    charts: chartsSlice,
  }
})