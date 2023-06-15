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
import UpdateProfile from './components/User_Profile/UpdateProfile'
import AddPhoneNumber from './components/AddPhoneNumber'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path='/'>
        <Route index element={<Home />} />
        <Route path='/signup' element={<SignUpLayout />} />
        <Route path='/signin' element={<SignInLayout />} />
        <Route path='/profile' element={<UpdateProfile />} />
        <Route path='/number' element={<AddPhoneNumber />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
