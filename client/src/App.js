import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import TeamCreation from './pages/TeamCreation'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NoPage from './pages/NoPage'
<<<<<<< HEAD
=======
import User from './pages/User'
>>>>>>> 57878d329495b69a768769db08ecc7214cd03f05
import HackerSearch from './pages/HackerSearch'
import TeamManagement from './pages/TeamManagement'
import Technologies from './pages/Technologies'
import Teams from './pages/Teams'
import OtherProfile from './pages/OtherProfile'
import TeammateProfile from './pages/TeammateProfile'

function App() {
  return (
    <div>
      {/* Route Components must be encapsulated by both BrowserRouter and Routes. */}
      <BrowserRouter>
        <Routes>
          {/* Route index is root route */}
          <Route index element={<Login />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/CreateAccount" element={<CreateAccount />}/>
          <Route path="/CreateTeam" element={<TeamCreation />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/HackerSearch" element={<HackerSearch/>}/>
          <Route path="TeamManagement" element={<TeamManagement/>}/>
          <Route path="/Technologies" element={<Technologies/>}/>
          <Route path="/Teams" element={<Teams/>}/>
          <Route path="/OtherProfile" element={<OtherProfile/>}/>
          <Route path="/TeammateProfile" element={<TeammateProfile/>}/>
<<<<<<< HEAD
=======
          <Route path="/User" element={<User/>}/>
>>>>>>> 57878d329495b69a768769db08ecc7214cd03f05
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
