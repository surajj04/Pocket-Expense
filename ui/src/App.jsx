import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddExpense from './components/Addexpense'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Profile from './components/Profile'
import TrackExpense from './components/Trackexpense'
import NewUserPage from './components/NewUser'
import UserRegister from './components/Register'
import Home from './components/Home'
import RegistrationSuccess from './components/RegistrationSuccess'
import axios from 'axios'
import BudgetSetupPage from './components/BudgetSetupPage'
import LoadingPage from './components/Loading'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  )
  const [user, setUser] = useState(localStorage.getItem('userToken'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post(`http://localhost:8080/validtoken/${user}`)
        if (res.data) {
          setIsLoggedIn(true)
          localStorage.setItem('isLoggedIn', 'true')
        } else {
          setIsLoggedIn(false)
          localStorage.setItem('isLoggedIn', 'false')
          localStorage.removeItem('userToken')
        }
      } catch (error) {
        console.error('Error validating token:', error)
        setIsLoggedIn(false)
        localStorage.setItem('isLoggedIn', 'false')
      }
    }

    if (user) {
      checkToken()
    }
  }, [user])

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Do you want to logout?')
    if (confirmLogout) {
      try {
        await axios.post(`http://localhost:8080/logout/${user}`)
        setIsLoggedIn(false)
        localStorage.setItem('isLoggedIn', 'false')
        localStorage.removeItem('userToken')
        setUser(null)
      } catch (err) {
        window.alert(err)
      }
    }
  }

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className='container mx-auto p-6'>
          <Routes>
            <Route
              path='/dashboard'
              element={isLoggedIn ? <Dashboard /> : <Navigate to='/login' />}
            />
            <Route
              path='/add-expense'
              element={isLoggedIn ? <AddExpense /> : <Navigate to='/login' />}
            />
            <Route
              path='/track-expense'
              element={isLoggedIn ? <TrackExpense /> : <Navigate to='/login' />}
            />
            <Route
              path='/profile'
              element={isLoggedIn ? <Profile /> : <Navigate to='/login' />}
            />
            <Route
              path='/newuser'
              element={isLoggedIn ? <NewUserPage /> : <Navigate to='/login' />}
            />
            <Route
              path='/setup'
              element={
                isLoggedIn ? <BudgetSetupPage /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/registrationSuccess'
              element={<RegistrationSuccess />}
            />
            <Route
              path='/'
              element={isLoggedIn ? <Dashboard /> : <Navigate to='/login' />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<UserRegister />} />
            <Route path='/home' element={<Home isLoggedIn={isLoggedIn} />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
