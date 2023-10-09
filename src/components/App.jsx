import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import "../App.css"

// Layouts
import SignUpLayout from "../layouts/SignUpLayout"
import SignInLayout from "../layouts/SignInLayout"
import ChatLayout from "../layouts/ChatLayout"

// Pages
import Home from "./Home/Home"
import UpdateProfile from "./User_Profile/UpdateProfile"
import Admin from "./Admin/Admin"
import _AcceptedUsers from "./Admin/part/_AcceptedUsers"
import _NotAcceptedUsers from "./Admin/part/_NotAcceptedUsers"
import Moderator from "./Admin/Moderator"
import _LandingPage from "./_LandingPage"
import _Birthdays from "./_Birthdays"
import _PageNotFound404 from "./_PageNotFound404"
import _About from "./_About"
import _Resumes from "./_Resumes"
import _ResumeDetails from "./_ResumeDetails"
import { useEffect } from "react"

function App() {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, only allow navigation to signin or signup pages
      if (location.pathname !== '/signin' && location.pathname !== '/signup') {
        navigate('/signin');
      }
    } else {
      // If authenticated, prevent navigation to signin and signup pages
      if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname.split('').reverse()[0] === '/') {
        navigate('/landing');
      }
    }
  }, [isAuthenticated, location.pathname]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpLayout />} />
        <Route path="/signin" element={<SignInLayout />} />
        {isAuthenticated ? (
          <Route path="/landing" element={<_LandingPage />}>
            {userRole == 'admin' && <Route index element={<_About />} />}
            {userRole == 'moderator' && <Route index element={<_About />} />}
            {userRole == 'user' && <Route index element={<UpdateProfile />} />}

            <Route path="profile" element={<UpdateProfile />} />
            {userRole === 'admin' && (
              <>
                <Route path="admin" element={<Admin />}>
                  <Route path="admin/accepted" element={<_AcceptedUsers />} />
                  <Route path="admin/waitingusers" element={<_NotAcceptedUsers />} />
                </Route>
              </>
            )}
            {userRole === 'moderator' && <Route path="moderator" element={<Moderator />} />}
            <Route path="birthdays" element={<_Birthdays />} />
            {userRole === 'admin' && (
              <>
                <Route path="resumes" element={<_Resumes />} />
                <Route path="resumes/userResume" element={<_ResumeDetails />} />
              </>
            )}
            <Route path="chat" element={<ChatLayout />} />
          </Route>
        ) : (
          <Route path="/signin" element={<SignInLayout />} />
        )}
        {(!isAuthenticated) && <Route path="/landing" element={<_LandingPage />} />}

        <Route path="*" element={<_PageNotFound404 />} />
      </Routes>
    </div>
  );
}

export default App
