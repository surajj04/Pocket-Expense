import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    budgets: [],
    expenses: [],
    goals: []
  })
  const [newData, setNewData] = useState({ ...userData })
  const [showModal, setShowModal] = useState(false)

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
  const [goalData, setGoalData] = useState({
    userId: localStorage.getItem('userId'),
    description: '',
    amount: '',
    status: 'Incomplete'
  })

  const handleGoalModalChange = e => {
    const { name, value } = e.target
    setGoalData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSaveGoal = async () => {
    const res = await axios.post('http://localhost:8080/goal', goalData)
    console.log(goalData)

    if (res) {
      setGoalData({ name: '', target: '' })
      setShowModal(false)
      window.location.href = '/profile'
    }
  }

  // console.log(userData)

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
              <button
                onClick={handleEdit}
                className='px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600'
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Budgets */}
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
                {isEditing ? (
                  <input
                    type='number'
                    name={`monthlyBudget-${index}`}
                    value={newData.budgets[index]?.monthlyBudget || ''}
                    onChange={e => handleInputChange(e, index)}
                    className='w-32 px-4 py-2 rounded-lg border border-gray-300'
                  />
                ) : (
                  <p className='text-lg text-blue-600'>
                    ₹{budget.monthlyBudget}
                  </p>
                )}
              </div>
              <div className='mt-4'>
                <p>
                  <strong>Current Balance:</strong> ₹{budget.currentBalance}
                </p>
                <p>
                  <strong>Bills:</strong> ₹{budget.bills}
                </p>
                <p>
                  <strong>Food:</strong> ₹{budget.food}
                </p>
                <p>
                  <strong>Entertainment:</strong> ₹{budget.entertainment}
                </p>
                <p>
                  <strong>Travel:</strong> ₹{budget.travel}
                </p>
                <p>
                  <strong>Other:</strong> ₹{budget.other}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No budgets available.</p>
        )}
      </div>

      {/* Savings Tracker */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Savings Tracker
        </h3>
        {userData.goals.map((goal, index) => (
          <div key={goal.id} className='flex justify-between items-center mb-4'>
            <span className='text-gray-600'>{goal.description}</span>
            <p className='text-lg text-blue-600'>{`₹${goal.amount}`}</p>
          </div>
        ))}
        <button
          onClick={() => setShowModal(true)}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Add Goal
        </button>
      </div>

      {/* Change Password */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Change Password
        </h3>
        <input
          type='password'
          className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
          placeholder='Enter new password'
        />
        <input
          type='password'
          className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
          placeholder='Confirm new password'
        />
        <button className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>
          Change Password
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Add Goal
            </h2>
            <div>
              <input
                type='text'
                name='userId'
                value={userData.userId}
                onChange={handleGoalModalChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
                placeholder='Goal Name'
                hidden
              />
              <input
                type='text'
                name='description'
                value={goalData.description}
                onChange={handleGoalModalChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
                placeholder='Goal Name'
              />
              <input
                type='number'
                name='amount'
                value={goalData.amount}
                onChange={handleGoalModalChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
                placeholder='Target Amount'
              />
              <input
                type='text'
                name='status'
                value={goalData.status}
                onChange={handleGoalModalChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
                placeholder='Incomplete'
                hidden
              />
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={handleCloseModal}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGoal}
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
