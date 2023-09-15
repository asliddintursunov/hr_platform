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
import { useEffect, useState } from "react"

function App() {
  const userRole = localStorage.getItem('userRole');
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
      if (location.pathname === '/signin') navigate("/landing");
    }
  }, []);

  useEffect(() => {
    if (!authenticated) navigate("/signin");
    else if (authenticated)
      navigate('/landing')
    else if (location.pathname)
      navigate(location.pathname)
  }, [authenticated]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpLayout />} />
        <Route path="/signin" element={<SignInLayout />} />
        {authenticated ? (
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
        {!authenticated && < Route path="/landing" element={<_LandingPage />} />}
        <Route path="*" element={<_PageNotFound404 />} />
      </Routes>
    </div>
  );
}

export default App
