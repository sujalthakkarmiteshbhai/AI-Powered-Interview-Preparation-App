import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { Dashboard } from './pages/Home/Dashboard'
import  InterviewPrep  from './pages/InterviewPrep/InterviewPrep'
import { LandingPage } from './pages/InterviewPrep/LandingPage'
import { Login } from './pages/auth/Login'
import { Signup } from "./pages/auth/Signup"
import UserProvider from './context/userContext'

export const App = () => {
  return (
    <div>
      <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
      <Toaster />
        </UserProvider>
      
    </div>
  
  )
}

export default App  