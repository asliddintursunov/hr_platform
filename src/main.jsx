import React from "react"
import ReactDOM from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from './app/App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Theme } from "@radix-ui/themes"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1097136097584-gjpjibr99lc3d50u13mjl18vr9n618gm.apps.googleusercontent.com">
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
    {/* </React.StrictMode>, */}
  </GoogleOAuthProvider>
)
