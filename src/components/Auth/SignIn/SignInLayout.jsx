import SignInAddition from "./pages/SignInAddition"
import SignInForm from "./pages/SignInForm"
import '../../../styles/Sign_In.css'

function SignInLayout() {
  return (
    <div className='d-flex flex-column flex-md-row' style={{ height: '100vh', rowGap: '5rem', }}>
      <SignInForm />
      <SignInAddition />
    </div>
  )
}

export default SignInLayout