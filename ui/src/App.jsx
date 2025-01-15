import React, { useEffect, useState } from 'react'
import Login from './pages/auth/Login'
import Dashboard from './pages/home/Dashboard'
import AddExpense from './pages/home/Addexpense'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Profile from './pages/home/Profile'
import TrackExpense from './pages/home/Trackexpense'
import UserRegister from './pages/auth/Register'
import Home from './pages/home/Home'
import RegistrationSuccess from './components/RegistrationSuccess'
import axios from 'axios'
import BudgetSetupPage from './pages/home/BudgetSetupPage'
import LoadingPage from './components/Loading'
import Settings from './pages/home/Settings'
import ExpenseReport from './pages/report/ExpenseReport'

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
        localStorage.clear() // Clears all items in localStorage
        setUser(null)
      } catch (err) {
        window.alert(err)
      }
    }
  }

  if (loading) {
    return <LoadingPage />
  }
  // localStorage.clear() // Clears all items in localStorage
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
            <Route
              path='/settings'
              element={isLoggedIn ? <Settings /> : <Navigate to='/login' />}
            />
            <Route
              path='/report'
              element={
                isLoggedIn ? <ExpenseReport /> : <Navigate to='/login' />
              }
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
