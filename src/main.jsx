import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Layouts
import SignUpLayout from './layouts/SignUpLayout'
import SignInLayout from './layouts/SignInLayout'

// Pages
import Home from './components/Home/Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path='/'>
        <Route index element={<Home />} />
        <Route path='/signup' element={<SignUpLayout />} />
        <Route path='/signin' element={<SignInLayout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
