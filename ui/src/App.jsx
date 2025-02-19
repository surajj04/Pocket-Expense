import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {
  BarChart2,
  FileText,
  Home,
  MessageSquare,
  PlusCircle,
  Target,
  User,
  Wallet
} from 'lucide-react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './secure/Dashboard'
import AddExpense from './secure/AddExpense'
import Budget from './secure/Budget'
import Expenses from './secure/Expenses'
import Reports from './secure/Reports'
import Goals from './secure/Goals'
import Assistant from './secure/Assistant'
import Profile from './secure/Profile'
import Register from './pages/Register'
import BudgetSetupPage from './secure/BudgetSetup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/userSlice'
import NotFound from './components/NotFound'

function App () {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      dispatch(login(storedUser))
    }
  }, [dispatch])

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/add-expense', icon: PlusCircle, label: 'Add Expense' },
    { href: '/budget', icon: Wallet, label: 'Budget' },
    { href: '/expenses', icon: FileText, label: 'Expenses' },
    { href: '/reports', icon: BarChart2, label: 'Reports' },
    { href: '/goals', icon: Target, label: 'Savings Goals' },
    { href: '/assistant', icon: MessageSquare, label: 'Assistant' },
    { href: '/profile', icon: User, label: 'Profile' }
  ]
  return (
    <div className=''>
      <div className=''>
        <div className='flex h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
          {user && <Navbar navItems={navItems} />}
          <main className='flex-1 overflow-y-auto p-8 max-sm:p-0 pb-20 md:pb-8'>
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Login />} />
              <Route
                path='/add-expense'
                element={user ? <AddExpense /> : <Login />}
              />
              <Route path='/budget' element={user ? <Budget /> : <Login />} />
              <Route
                path='/expenses'
                element={user ? <Expenses /> : <Login />}
              />
              <Route path='/reports' element={user ? <Reports /> : <Login />} />
              <Route path='/goals' element={user ? <Goals /> : <Login />} />
              <Route
                path='/assistant'
                element={user ? <Assistant /> : <Login />}
              />
              <Route path='/profile' element={user ? <Profile /> : <Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/budget-setup'
                element={user ? <BudgetSetupPage /> : <Login />}
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
