import React from "react"
import ReactDOM from "react-dom/client"
import App from './app/App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Theme } from "@radix-ui/themes"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
)
