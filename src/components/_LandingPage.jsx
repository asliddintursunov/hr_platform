import { NavLink, Outlet, useLocation } from "react-router-dom"
import styles from "../css/Landing.module.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { connect } from "../features/socketConnectionSlice"

function _LandingPage() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connect())

  }, [])


  const userRole = localStorage.getItem("userRole")
  const [navbarAppear, setNavbarAppear] = useState(true)

  const location = useLocation()

  const defaultPath = "/" + location.pathname.split("/")[1] + "/"

  const style_nav_appear = {
    position: "fixed",
    left: 0,
    transform: "translateX(-101%)"
  }
  const style_nav_disappear = {
    minWidth: "21.5rem"
  }
  const navbarColor = {
    color: "var(--white)",
    backgroundColor: "var(--dark)"
  }

  useEffect(() => {
    onresize = (event) => {
      if (event.target.innerWidth >= 991) {
        setNavbarAppear(true)
      } else {
        setNavbarAppear(false)
      }
    }
  }, [navbarAppear])

  return (
    <div className={styles.landingContainer}>
      <div className={styles.sidebarContainer} style={navbarAppear ? style_nav_disappear : style_nav_appear}>
        <aside className={styles.sidebar}>
          {!navbarAppear && (
            <button onClick={() => setNavbarAppear(!navbarAppear)} className={styles.hamburgerBtn}>
              <i className="bi bi-arrow-bar-right"></i>
            </button>
          )}

          {navbarAppear && (
            <button onClick={() => setNavbarAppear(!navbarAppear)} className={styles.hamburgerBtn}>
              <i className="bi bi-arrow-bar-left"></i>
            </button>
          )}

          <nav>
            <div className={styles.navbarOptions}>
              {(userRole === "admin") || (userRole === "moderator") ? (
                <NavLink to="./" style={location.pathname === defaultPath + "" ? navbarColor : null}>
                  <i className="bi bi-house-door-fill"></i>
                  &#160; Dashboard
                </NavLink>
              ) : null}

              {userRole === "moderator" && (
                <NavLink style={location.pathname === defaultPath + "moderator" ? navbarColor : null} to="moderator">
                  <i className="bi bi-alexa"></i>
                  &#160; Moderator
                </NavLink>
              )}

              {userRole === "admin" && (
                <NavLink style={location.pathname.startsWith(defaultPath + "admin") ? navbarColor : null} to="admin">
                  <i className="bi bi-shield-shaded"></i>
                  &#160; Admin Page
                </NavLink>
              )}

              <NavLink style={location.pathname === defaultPath + "birthdays" ? navbarColor : null} to="birthdays">
                <i className="bi bi-bookmark-star-fill"></i>
                &#160; Birthdays
              </NavLink>

              <NavLink style={location.pathname === defaultPath + "profile" ? navbarColor : null} to="profile">
                <i className="bi bi-person-circle"></i>
                &#160; Profile
              </NavLink>

              {userRole === "admin" && (
                <NavLink style={location.pathname === defaultPath + "resumes" ? navbarColor : null} to="resumes">
                  <i className="bi bi-file-person"></i>
                  &#160; Resumes
                </NavLink>
              )}

              <NavLink style={location.pathname === defaultPath + "chat" ? navbarColor : null} to="chat">
                <i className="bi bi-chat-dots-fill"></i>
                &#160; Chat
              </NavLink>
            </div>
            <div className={styles.logout}>
              <button className="btn btn-dark">HR Platform</button>
            </div>
          </nav>
        </aside>
      </div>
      <main className={styles.landingMain}>
        <Outlet />
      </main>
    </div>
  )
}

export default _LandingPage
