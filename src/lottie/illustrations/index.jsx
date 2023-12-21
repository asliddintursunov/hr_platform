import Lottie from "lottie-react"
import SpinnerData from "../json/loader.json"
import PageNotFoundData from "../json/404NotFound.json"
import EmptyMsgPlaceData from "../json/EmptyMsgPlace.json"
import SelectChatData from "../json/SelectChat.json"
import ChatUserSidebarLoaderData from "../json/ChatUserSidebarLoader.json"

export const Spinner = () => {
  return <Lottie loop autoPlay style={{ height: 200 }} animationData={SpinnerData} />
}

export const PageNotFound = () => {
  return <Lottie loop autoPlay style={{ height: 400 }} animationData={PageNotFoundData} />
}

export const EmptyMsgPlace = () => {
  return <Lottie loop autoPlay style={{ height: 400 }} animationData={EmptyMsgPlaceData} />
}

export const SelectChat = () => {
  return <Lottie loop={false} autoPlay style={{ height: 400 }} animationData={SelectChatData} />
}

export const ChatUserSidebarLoader = () => {
  return <Lottie loop autoPlay style={{ height: 400 }} animationData={ChatUserSidebarLoaderData} />
}
