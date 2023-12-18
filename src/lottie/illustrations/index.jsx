import Lottie from "lottie-react"
import SpinnerData from "../json/loader.json"
import PageNotFoundData from "../json/404NotFound.json"

export const Spinner = () => {
  return <Lottie loop autoPlay style={{ height: 200 }} animationData={SpinnerData} />
}

export const PageNotFound = () => {
  return <Lottie loop autoPlay style={{ height: 400 }} animationData={PageNotFoundData} />
}
