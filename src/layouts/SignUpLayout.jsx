import Sign_Up_Addition from "../components/Sign_Up/pages/Sign_Up_Addition"
import Sign_Up_Form from "../components/Sign_Up/pages/Sign_Up_Form"

function SignUpLayout() {
  return (
    <div className='d-flex flex-column flex-md-row' style={{ height: '100vh', rowGap: '5rem', }}>
      <Sign_Up_Addition />
      <Sign_Up_Form />
    </div>
  )
}

export default SignUpLayout