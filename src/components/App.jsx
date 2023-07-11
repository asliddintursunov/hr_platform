import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import '../App.css'


// Layouts
import SignUpLayout from '../layouts/SignUpLayout'
import SignInLayout from '../layouts/SignInLayout'

// Pages
import Home from './Home/Home'
import UpdateProfile from './User_Profile/UpdateProfile'
import Admin from './Admin/Admin'
import _AcceptedUsers from './Admin/part/_AcceptedUsers'
import _NotAcceptedUsers from './Admin/part/_NotAcceptedUsers'
import Moderator from './Admin/Moderator'
import _LandingPage from './_LandingPage'
import _Birthdays from './_Birthdays'

function App() {

  const routest = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='signup' element={<SignUpLayout />} />
        <Route path='signin' element={<SignInLayout />} />
        <Route path='profile' element={<UpdateProfile />} />
        <Route path='admin' element={<Admin />}>
          <Route path='accepted' element={<_AcceptedUsers />} />
          <Route path='waitingusers' element={<_NotAcceptedUsers />} />
        </Route>
        <Route path='moderator' element={<Moderator />} />
        <Route path='landing' element={<_LandingPage />} />
        <Route path='birthdays' element={<_Birthdays />} />
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider router={routest} />
    </div>
  )
}

export default App