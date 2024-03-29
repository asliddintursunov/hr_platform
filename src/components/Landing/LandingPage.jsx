import { NavLink, Outlet, useLocation } from "react-router-dom"
import styles from "../../styles/Landing.module.css"
import LogOut from "../UserProfile/part/LogOut"
import { useSelector } from "react-redux"

function _LandingPage() {
  const userRole = localStorage.getItem("userRole")
  const count = useSelector((state) => state.chatMsgCount.count)

  const location = useLocation()
  const defaultPath = "/" + location.pathname.split("/")[1] + "/"
  const navbarColor = {
    color: "var(--white)",
    backgroundColor: "var(--dark)"
  }
  return (
    <div className={styles.landingContainer}>
      <div className={styles.sidebarContainer}>
        <aside className={styles.sidebar}>
          <nav
            style={{
              width: "21.5rem"
            }}
          >
            <div
              className={styles.navbarOptions}
              style={{
                width: "21.5rem"
              }}
            >
              <div
                style={{
                  width: "21.5rem"
                }}
              >
                <img
                  src="/src/img/hr-platform-high-resolution-logo-transparent.svg"
                  alt="Description of the SVG"
                  style={{
                    objectFit: "contain",
                    margin: "0 auto",
                    width: "100%",
                    height: "80px"
                  }}
                />
              </div>
              {userRole === "user" && (
                <NavLink to="." style={location.pathname + "/" === defaultPath ? navbarColor : null}>
                  <i className="bi bi-house-door-fill"></i>
                  &#160; Home
                </NavLink>
              )}
              {userRole === "admin" || userRole === "moderator" ? (
                <NavLink to="." style={location.pathname + "/" === defaultPath ? navbarColor : null}>
                  <i className="bi bi-pie-chart-fill"></i>
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
                <NavLink style={location.pathname.startsWith(defaultPath + "admin") ? navbarColor : null} to="admin/accepted">
                  <i className="bi bi-people-fill"></i>
                  &#160; Users
                </NavLink>
              )}

              <NavLink style={location.pathname === defaultPath + "birthdays" ? navbarColor : null} to="birthdays">
                <i className="bi bi-bookmark-star-fill"></i>
                &#160; Birthdays
              </NavLink>

              {userRole === "admin" && (
                <NavLink style={location.pathname === defaultPath + "resumes" ? navbarColor : null} to="resumes">
                  <i className="bi bi-file-person"></i>
                  &#160; Resumes
                </NavLink>
              )}

              <NavLink style={location.pathname === defaultPath + "chat" ? navbarColor : null} to="chat" className={styles.chatSidebar}>
                <i className="bi bi-chat-dots-fill"></i>
                &#160; Chat{" "}
                {count > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      right: "2rem",
                      fontWeight: "bold",
                      textDecoration: "underline"
                    }}
                  >
                    {count}
                  </span>
                )}
              </NavLink>

              {userRole === "admin" && (
                <NavLink style={location.pathname === defaultPath + "hr_register" ? navbarColor : null} to="hr_register">
                  <i className="bi bi-clipboard-plus-fill"></i>
                  &#160; HR Register
                </NavLink>
              )}
            </div>
            <div
              className={styles.navbarOptions}
              style={{
                width: "100%",
                marginBottom: "2rem"
              }}
            >
              <NavLink style={location.pathname === defaultPath + "profile" ? navbarColor : null} to="profile">
                <i className="bi bi-person-circle"></i>
                &#160; Profile
              </NavLink>
              <LogOut />
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
