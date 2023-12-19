import "./Home.css"
import * as Avatar from "@radix-ui/react-avatar"
function UserInfo({ userData }) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image className="AvatarImage" src={userData.profile_photo} alt="Pedro Duarte" />
        <Avatar.Fallback className="AvatarFallback" delayMs={100}>
          Dev
        </Avatar.Fallback>
      </Avatar.Root>
      <div>
        <h3 className="text-center">Software Developer</h3>
        <br />
        <h2
          style={{
            color: "gray",
            textAlign: "start",
            fontWeight: 400
          }}
        >
          @{userData.username}
        </h2>
        <span
          style={{
            fontSize: "1.8rem",
            color: "gray"
          }}
        >
          Joined {userData.joined}
        </span>
      </div>
    </div>
  )
}

export default UserInfo
