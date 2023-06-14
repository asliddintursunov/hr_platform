import Sign_In_Addition from "../components/Sign_In/pages/Sign_In_Addition"
import Sign_In_Form from "../components/Sign_In/pages/Sign_In_Form"

function SignInLayout() {
  return (
    <div className='d-flex flex-column flex-md-row' style={{ height: '100vh', rowGap: '5rem', }}>
      <Sign_In_Form />
      <Sign_In_Addition />
    </div>
  )
}

export default SignInLayout