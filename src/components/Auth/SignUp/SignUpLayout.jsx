import SignUpAddition from "./pages/SignUpAddition"
import SignUpForm from "./pages/SignUpForm"
import '../../../styles/Sign_Up.css'

function SignUpLayout() {
  return (
    <div className='d-flex flex-column flex-md-row' style={{ height: '100vh', rowGap: '5rem', }}>
      <SignUpAddition />
      <SignUpForm />
    </div>
  )
}

export default SignUpLayout