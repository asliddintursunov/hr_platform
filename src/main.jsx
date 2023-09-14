import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './components/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='1097136097584-gjpjibr99lc3d50u13mjl18vr9n618gm.apps.googleusercontent.com'>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  </GoogleOAuthProvider>
)
