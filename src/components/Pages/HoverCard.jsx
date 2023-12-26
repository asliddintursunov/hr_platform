import React from "react"
import * as Avatar from "@radix-ui/react-avatar"
import styles from "../../styles/HoverImage.module.css"
import { TriangleLeftIcon } from "@radix-ui/react-icons"
const HoverCard = (props) => {
  const TriangleLeftIconStyle = {
    width: "3rem",
    height: "3rem",
    position: "absolute",
    left: "-1.8rem",
    top: props.datasLength - props.index <= 2 ? "80%" : "25%",
    color: "#333"
  }
  return (
    <div className={`${props.datasLength - props.index <= 2 ? styles.HoverLastThreeImageCardContainer : styles.HoverImageCardContainer} `}>
      <Avatar.Root className={styles.HoverAvatarRoot}>
        <Avatar.Image
          className={styles.HoverAvatarImage}
          src={props.profile_photo}
          style={{
            aspectRatio: "3/4"
          }}
        />
        <Avatar.Fallback className={styles.HoverAvatarFallback}>{props.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
      </Avatar.Root>
      <div className={styles.HoverCardRole}>
        <span>{props.role}</span>
      </div>
      <div className={styles.HoverCardUsername}>
        <span>@{props.username}</span>
      </div>
      <div className={styles.HoverCardEmail}>
        <a target="_blank" href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${props.email}`}>
          {props.email}
        </a>
      </div>
      {props.major && (
        <div className={styles.HoverCardMajor}>
          <span>{props.major}</span>
        </div>
      )}
      <TriangleLeftIcon style={TriangleLeftIconStyle} />
    </div>
  )
}

export default HoverCard
