// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import Sidebar from './Sidebar'
import DownloadExpenseData from './DownloadExpense'

const AdminDashboard = ({ setAdmin }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ])

  const [tab, setTab] = useState('Home')

  const [newUser, setNewUser] = useState({ name: '', email: '' })

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }])
      setNewUser({ name: '', email: '' })
    }
  }

  const switchTab = t => {
    setTab(t)
  }

  useEffect(() => {
    const removeNavbar = () => {
      setAdmin(true)
    }

    removeNavbar()
  }, [setAdmin])

  return (
    <>
      {/* component */}
      <div className='min-h-screen '>
        <Sidebar switchTab={switchTab} />
        <div className=''>
          {tab === 'Home' && <AdminHome />}
          {tab === 'Download' && <DownloadExpenseData />}
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
