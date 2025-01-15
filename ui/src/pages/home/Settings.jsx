import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const [editingState, setEditingState] = useState({
    email: false,
    name: false,
    password: false,
    deletingAccount: false
  })
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const [name, setName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [user, setUser] = useState(localStorage.getItem('userToken'))
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:8080/userDetail/${user}`)
        localStorage.setItem('userData', JSON.stringify(res.data))
        setEmail(res.data.email)
        setName(res.data.name)
        setNewEmail(res.data.email)
        setNewName(res.data.name)
        setUserId(res.data.userId)
        setLoading(false)
      } catch (err) {
        setError('Error fetching user data')
        setLoading(false)
        console.error('Error fetching user data:', err)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const handleEmailChange = async () => {
    setLoading(true)
    try {
      await axios.put('http://localhost:8080/updateEmail', {
        userId: userId,
        email: newEmail
      })
      setEmail(newEmail)
      setEditingState(prev => ({ ...prev, email: false }))
      setLoading(false)
    } catch (error) {
      setError('Error updating email')
      setLoading(false)
      console.error('Error updating email:', error)
    }
  }

  const handleNameChange = async () => {
    setLoading(true)
    try {
      await axios.put('http://localhost:8080/updateName', {
        userId: userId, // Updated to use userId from state
        name: newName
      })
      setName(newName)
      setEditingState(prev => ({ ...prev, name: false }))
      setLoading(false)
    } catch (error) {
      setError('Error updating name')
      setLoading(false)
      console.error('Error updating name:', error)
    }
  }

  const handlePasswordChange = async () => {
    setLoading(true)
    try {
      await axios.put('http://localhost:8080/updatePassword', {
        userId: userId,
        oldPassword: currentPassword,
        newPassword: newPassword
      })
      setNewPassword('')
      setCurrentPassword('')
      setEditingState(prev => ({ ...prev, password: false }))
      setLoading(false)
    } catch (error) {
      setError('Error updating password')
      setLoading(false)
      console.error('Error updating password:', error)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:8080/delete/${user}`)
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      window.location.href = '/login'
      setLoading(false)
    } catch (error) {
      setError('Error deleting account')
      setLoading(false)
      console.error('Error deleting account:', error)
    }
  }

  const handleCancelEmailEdit = () => {
    setNewEmail(email)
    setEditingState(prev => ({ ...prev, email: false }))
  }

  const handleCancelNameEdit = () => {
    setNewName(name)
    setEditingState(prev => ({ ...prev, name: false }))
  }

  const handleCancelPasswordEdit = () => {
    setNewPassword('')
    setCurrentPassword('')
    setEditingState(prev => ({ ...prev, password: false }))
  }

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
        Account Settings
      </h2>
      {/* Back Button */}
      <button
        onClick={() => navigate('/profile')}
        className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 my-3'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-9.707a1 1 0 011.414 0L12 12.586a1 1 0 01-1.414 1.414l-1.293-1.293V14a1 1 0 01-2 0v-2.707L6.414 14A1 1 0 115 12.586l1.293-1.293V8a1 1 0 012 0v2.707L9.707 8.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
        Back
      </button>
      {error && <div className='mb-4 text-red-500'>{error}</div>}

      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <>
          {/* Email Update Section */}
          <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
              Email Address
            </h3>
            {!editingState.email ? (
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>{email}</span>
                <button
                  onClick={() =>
                    setEditingState(prev => ({ ...prev, email: true }))
                  }
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className='flex justify-between items-center'>
                <input
                  type='email'
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className='px-4 py-2 border border-gray-300 rounded-lg'
                />
                <div className='flex'>
                  <button
                    onClick={handleEmailChange}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg mr-2'
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEmailEdit}
                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Name Update Section */}
          <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
              Full Name
            </h3>
            {!editingState.name ? (
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>{name}</span>
                <button
                  onClick={() =>
                    setEditingState(prev => ({ ...prev, name: true }))
                  }
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className='flex justify-between items-center'>
                <input
                  type='text'
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className='px-4 py-2 border border-gray-300 rounded-lg'
                />
                <div className='flex'>
                  <button
                    onClick={handleNameChange}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg mr-2'
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelNameEdit}
                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Password Update Section */}
          <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
              Password
            </h3>
            <button
              onClick={() =>
                setEditingState(prev => ({ ...prev, password: true }))
              }
              className='text-blue-500 hover:underline'
            >
              Change Password
            </button>
          </div>

          {/* Password Modal */}
          {editingState.password && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-lg w-96'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                  Change Password
                </h2>
                <input
                  type='password'
                  placeholder='Current Password'
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className='px-4 py-2 border border-gray-300 rounded-lg mb-4 w-full'
                />
                <input
                  type='password'
                  placeholder='New Password'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className='px-4 py-2 border border-gray-300 rounded-lg mb-4 w-full'
                />
                <div className='flex justify-between'>
                  <button
                    onClick={handlePasswordChange}
                    className='px-6 py-2 bg-blue-500 text-white rounded-lg'
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelPasswordEdit}
                    className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account Section */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
              Delete Account
            </h3>
            <button
              onClick={() =>
                setEditingState(prev => ({ ...prev, deletingAccount: true }))
              }
              className='text-red-500 hover:underline'
            >
              Delete Account
            </button>
          </div>

          {/* Delete Account Confirmation */}
          {editingState.deletingAccount && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-lg w-96'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                  Are you sure you want to delete your account?
                </h2>
                {/* Additional Warning Message */}
                <p className='text-sm text-red-500 mb-4'>
                  This action is permanent and cannot be undone. Please be sure
                  you want to delete your account.
                </p>
                <div className='flex justify-between'>
                  <button
                    onClick={handleDeleteAccount}
                    className='px-6 py-2 bg-red-500 text-white rounded-lg'
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() =>
                      setEditingState(prev => ({
                        ...prev,
                        deletingAccount: false
                      }))
                    }
                    className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Settings
