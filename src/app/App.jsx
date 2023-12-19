import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import "./App.css"

// Layouts
import SignUpLayout from "../components/Auth/SignUp/SignUpLayout"
import SignInLayout from "../components/Auth/SignIn/SignInLayout"
import ChatLayout from "../components/Chat/ChatLayout"

// Pages
import LandingPage from "../components/Landing/LandingPage"

import Home from "../components/Home/Home"
import UpdateProfile from "../components/UserProfile/UpdateProfile"
import Admin from "../components/Admin/Admin"
import AcceptedUsers from "../components/Admin/part/AcceptedUsers"
import NotAcceptedUsers from "../components/Admin/part/NotAcceptedUsers"
import Moderator from "../components/Admin/Moderator"
import Birthdays from "../components/Pages/Birthdays"
import PageNotFound404 from "../components/Pages/PageNotFound404"
import About from "../components/Pages/About"
import Resumes from "../components/Resumes/Resumes"
import ResumeDetails from "../components/Resumes/ResumeDetails"
import { useEffect } from "react"
import HR_Register from "../components/HR_Register/HR_Register"

function App() {
  const userRole = localStorage.getItem("userRole")
  const isAuthenticated = localStorage.getItem("token")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname !== "/signin" && location.pathname !== "/signup") {
        navigate("/signin")
      }
    } else {
      if (location.pathname === "/signin" || location.pathname === "/signup" || location.pathname.split("").reverse()[0] === "/") {
        navigate("/landing")
      }
    }
  }, [isAuthenticated, location.pathname])

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpLayout />} />
        <Route path="/signin" element={<SignInLayout />} />
        {isAuthenticated ? (
          <Route path="/landing" element={<LandingPage />}>
            {userRole === "user" && <Route index element={<Home />} />}
            {userRole === "admin" || userRole === "moderator" ? <Route index element={<About />} /> : null}
            <Route element={<UpdateProfile />} />

            <Route path="profile" element={<UpdateProfile />} />
            {userRole === "admin" && (
              <>
                <Route path="admin" element={<Admin />}>
                  <Route path="accepted" element={<AcceptedUsers />} />
                  <Route path="waitingusers" element={<NotAcceptedUsers />} />
                </Route>
              </>
            )}
            {userRole === "moderator" && <Route path="moderator" element={<Moderator />} />}
            <Route path="birthdays" element={<Birthdays />} />
            {userRole === "admin" && (
              <>
                <Route path="resumes" element={<Resumes />} />
                <Route path="resumes/userResume" element={<ResumeDetails />} />
              </>
            )}
            <Route path="chat" element={<ChatLayout />} />
            {userRole === "admin" && <Route path="hr_register" element={<HR_Register />} />}
          </Route>
        ) : (
          <Route path="/signin" element={<SignInLayout />} />
        )}
        {!isAuthenticated && <Route path="/landing" element={<LandingPage />} />}

        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </div>
  )
}

export default App
