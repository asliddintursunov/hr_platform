import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
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
import _PageNotFound404 from './_PageNotFound404'
import _About from './_About'
import _Resumes from './_Resumes'


function App() {

  const routest = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='signup' element={<SignUpLayout />} />
        <Route path='signin' element={<SignInLayout />} />

        <Route path='landing' element={<_LandingPage />}>
          <Route index element={<_About />} />
          <Route path='profile' element={<UpdateProfile />} />
          {localStorage.getItem('userRole') == 'admin' && <Route path='admin' element={<Admin />}>
            <Route path='accepted' element={<_AcceptedUsers />} />
            <Route path='waitingusers' element={<_NotAcceptedUsers />} />
          </Route>}

          {localStorage.getItem('userRole') == 'moderator' && <Route path='moderator' element={<Moderator />} />}

          <Route path='birthdays' element={<_Birthdays />} />
          <Route path='resumes' element={<_Resumes />} />

        </Route>
        <Route path='*' element={<_PageNotFound404 />} />

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