import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import TeamCreation from './pages/TeamCreation'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NoPage from './pages/NoPage'
import HackerSearch from './pages/HackerSearch'
import TeamManagement from './pages/TeamManagement'
import Technologies from './pages/Technologies'
import Teams from './pages/Teams'

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
          <Route path="/Teams" element={<Teams/>}/>
          <Route path="/TeamManagement" element={<TeamManagement/>}/>
          <Route path="/Technologies" element={<Technologies/>}/>
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
