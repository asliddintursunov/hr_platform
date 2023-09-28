import { createSlice } from "@reduxjs/toolkit"
import { io } from "socket.io-client"
import { baseUrl } from "../utils/api"

const userConnection = {
  isConnected: false,
  socketInstance: {},
}

export const userConnectionSlice = createSlice({
  name: "connection",
  initialState: userConnection,
  reducers: {
    connect: (state) => {
      const newSocket = io(baseUrl)
      if (newSocket) {
        return {
          ...state,
          isConnected: true,
          socketInstance: newSocket,
        }
      }
      return state
    },
  }
})

export const { connect } = userConnectionSlice.actions
export default userConnectionSlice.reducer
