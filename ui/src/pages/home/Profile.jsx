import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    budgets: [],
    expenses: [],
    goals: []
  })
  const [newData, setNewData] = useState({ ...userData })
  const [showModal, setShowModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false) // For Profile Update Modal
  const [goalData, setGoalData] = useState({
    userId: localStorage.getItem('userId'),
    description: '',
    amount: '',
    status: 'Incomplete'
  })
  const [editGoalData, setEditGoalData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/userDetail/${localStorage.getItem(
            'userToken'
          )}`
        )
        setUserData(response.data)
        localStorage.setItem('userId', response.data.userId)
        setNewData(response.data)
      } catch (err) {
        alert('Error fetching user data')
      }
    }
    fetchData()
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleGoalChange = (index, e) => {
    const { name, value } = e.target
    const updatedGoals = [...newData.goals]
    updatedGoals[index] = { ...updatedGoals[index], [name]: value }
    setNewData(prevState => ({ ...prevState, goals: updatedGoals }))
  }

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/userDetail/${localStorage.getItem('userToken')}`,
        newData
      )
      setUserData(newData)
      setIsEditing(false)
    } catch (err) {
      alert('Error saving user data')
    }
  }

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    setNewData(userData)
    setIsEditing(false)
  }

  const handleCloseModal = () => setShowModal(false)

  const handleProfileModalClose = () => setShowProfileModal(false) // Close Profile Modal

  const handleGoalModalChange = e => {
    const { name, value } = e.target
    setGoalData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSaveGoal = async () => {
    try {
      const res = await axios.post('http://localhost:8080/goal', goalData)
      if (res) {
        setGoalData({ description: '', amount: '', status: 'Incomplete' })
        setShowModal(false)
        const updatedUserData = { ...userData }
        updatedUserData.goals.push(res.data) // Assuming response contains the newly created goal
        setUserData(updatedUserData)
      }
    } catch (err) {
      alert('Error saving goal')
    }
  }

  const handleEditGoal = goalId => {
    const goalToEdit = userData.goals.find(goal => goal.id === goalId)
    setEditGoalData(goalToEdit)
    setGoalData({ ...goalToEdit }) // Populate the goalData with the goal data
    setShowModal(true)
  }

  const handleUpdateGoal = async () => {
    try {
      const updatedGoal = { ...goalData }
      const res = await axios.put(`http://localhost:8080/goal`, updatedGoal)
      setUserData(prevData => ({
        ...prevData,
        goals: prevData.goals.map(goal =>
          goal.id === updatedGoal.id ? updatedGoal : goal
        )
      }))
      setShowModal(false)
    } catch (err) {
      alert('Error updating goal')
    }
  }

  const handleDeleteGoal = async goalId => {
    const confirmLogout = window.confirm('Do you want to delete this goal?')
    if (confirmLogout) {
      try {
        await axios.delete(`http://localhost:8080/goal/${goalId}`)
        const updatedGoals = userData.goals.filter(goal => goal.id !== goalId)
        setUserData(prevData => ({ ...prevData, goals: updatedGoals }))
      } catch (err) {
        alert('Error deleting goal')
      }
    }
  }

  const handleGoalCompletion = e => {
    const { checked } = e.target
    if (editGoalData) {
      setGoalData(prev => ({
        ...prev,
        status: checked ? 'Complete' : 'Incomplete'
      }))
    } else {
      setGoalData(prev => ({
        ...prev,
        status: checked ? 'Complete' : 'Incomplete'
      }))
    }
  }

  // Open Profile Update Modal
  const handleProfileEdit = () => setShowProfileModal(true)

  return (
    <div className='p-6 rounded-lg mx-auto'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Profile</h2>
      <div className='flex items-center space-x-6'>
        <div>
          <img
            src='people.png'
            alt='Profile'
            className='w-24 h-24 rounded-full object-cover'
          />
        </div>

        <div className='flex-1'>
          {isEditing ? (
            <>
              <label className='block text-gray-700 mb-2'>Name</label>
              <input
                type='text'
                name='name'
                value={newData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
              />
              <label className='block text-gray-700 mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={newData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
              />
              <label className='block text-gray-700 mb-2'>Password</label>
              <input
                type='password'
                name='password'
                value={newData.password}
                onChange={handleInputChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
              />
            </>
          ) : (
            <>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                {userData.name}
              </h3>
              <p className='text-gray-600 mb-4'>{userData.email}</p>
            </>
          )}
          <div className='flex space-x-4'>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400'
                >
                  Cancel
                </button>
              </>
            ) : (
              <Link
                to={'/settings'}
                className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
              >
                Settings
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Budgets */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Monthly Budgets
        </h3>
        {userData.budgets.length > 0 ? (
          userData.budgets.map((budget, index) => (
            <div key={index} className='mb-6'>
              <div className='flex justify-between items-center'>
                <h4 className='text-lg font-semibold'>
                  Month:{' '}
                  {new Date(budget.date).toLocaleString('default', {
                    month: 'long'
                  })}{' '}
                  {new Date(budget.date).getFullYear()}
                </h4>
                <p className='text-lg text-blue-600'>₹{budget.monthlyBudget}</p>
              </div>
              <div className='mt-4'>
                <p>
                  <strong>Current Balance:</strong> ₹{budget.currentBalance}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No budgets available.</p>
        )}
      </div>

      {/* Goals */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Savings Tracker
        </h3>
        {userData.goals.map(goal => (
          <div key={goal.id} className='flex justify-between items-center mb-4'>
            <div className='flex flex-col'>
              <span className='text-gray-600'>{goal.description}</span>
              <p className='text-lg text-blue-600'>{`₹${goal.amount}`}</p>
            </div>
            <div className='flex space-x-2'>
              <button
                onClick={() => handleEditGoal(goal.id)}
                className='px-2 py-1 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600'
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className='px-2 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => setShowModal(true)}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Add Goal
        </button>
      </div>

      {/* Modal for Profile Edit */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>
              {editGoalData ? 'Edit Goal' : 'Add Goal'}
            </h3>
            <input
              type='text'
              name='description'
              value={goalData.description}
              onChange={handleGoalModalChange}
              placeholder='Goal Description'
              className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
            />
            <input
              type='number'
              name='amount'
              value={goalData.amount}
              onChange={handleGoalModalChange}
              placeholder='Goal Amount'
              className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
            />
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='status'
                checked={goalData.status === 'Complete'}
                onChange={handleGoalCompletion}
                className='mr-2'
              />
              <label>Mark as Completed</label>
            </div>
            <div className='mt-4'>
              {editGoalData ? (
                <button
                  onClick={handleUpdateGoal}
                  className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                  Update Goal
                </button>
              ) : (
                <button
                  onClick={handleSaveGoal}
                  className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                  Save Goal
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 ml-4'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
