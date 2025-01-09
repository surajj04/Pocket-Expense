import axios from 'axios'
import React, { useState } from 'react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    totalBudget: 50000,
    savings: 8000,
    goals: [
      { name: 'Vacation', target: 10000 },
      { name: 'Emergency Fund', target: 15000 }
    ],
    expenses: {
      food: 10000,
      transport: 5000,
      bills: 8000,
      entertainment: 7000
    }
  })
  const [newData, setNewData] = useState({
    name: userData.name,
    email: userData.email,
    totalBudget: userData.totalBudget,
    savings: userData.savings,
    goals: [...userData.goals],
    expenses: { ...userData.expenses }
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleGoalChange = (index, e) => {
    const { name, value } = e.target
    const updatedGoals = [...newData.goals]
    updatedGoals[index] = { ...updatedGoals[index], [name]: value }
    setNewData(prevState => ({
      ...prevState,
      goals: updatedGoals
    }))
  }

  const handleAddGoal = () => {
    setNewData(prevState => ({
      ...prevState,
      goals: [...prevState.goals, { name: '', target: '' }]
    }))
  }

  const handleSave = () => {
    setUserData(newData) // Save updated data
    setIsEditing(false) // Switch back to view mode
  }

  const handleEdit = () => {
    setIsEditing(true) // Switch to edit mode
  }

  const handleCancel = () => {
    setIsEditing(false) // Cancel edit mode and revert to original data
    setNewData({
      name: userData.name,
      email: userData.email,
      totalBudget: userData.totalBudget,
      savings: userData.savings,
      goals: [...userData.goals],
      expenses: { ...userData.expenses }
    })
  }

  return (
    <div className=' p-6 rounded-lg mx-auto'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Profile</h2>

      <div className='flex items-center space-x-6'>
        {/* Profile Picture */}
        <div>
          <img
            src={'https://www.w3schools.com/w3images/avatar2.png'}
            alt='Profile'
            className='w-24 h-24 rounded-full object-cover'
          />
        </div>

        {/* Profile Information */}
        <div className='flex-1'>
          {isEditing ? (
            <div>
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
            </div>
          ) : (
            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                {userData.name}
              </h3>
              <p className='text-gray-600 mb-4'>{userData.email}</p>
            </div>
          )}

          {/* Action Buttons */}
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

      {/* Budget Section */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Total Budget
        </h3>
        <div className='flex justify-between items-center'>
          {isEditing ? (
            <input
              type='number'
              name='totalBudget'
              value={newData.totalBudget}
              onChange={handleInputChange}
              className='w-32 px-4 py-2 rounded-lg border border-gray-300'
            />
          ) : (
            <p className='text-lg text-blue-600'>{`₹${userData.totalBudget}`}</p>
          )}
        </div>
      </div>

      {/* Expense Breakdown Section */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Expense Breakdown
        </h3>
        {Object.keys(userData.expenses).map((category, index) => (
          <div key={index} className='flex justify-between items-center mb-4'>
            <span className='text-gray-600'>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            {isEditing ? (
              <input
                type='number'
                name={`expenses.${category}`}
                value={newData.expenses[category]}
                onChange={handleInputChange}
                className='w-32 px-4 py-2 rounded-lg border border-gray-300'
              />
            ) : (
              <p className='text-lg text-blue-600'>{`₹${userData.expenses[category]}`}</p>
            )}
          </div>
        ))}
      </div>

      {/* Savings Tracker */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Savings Tracker
        </h3>
        {newData.goals.map((goal, index) => (
          <div key={index} className='flex justify-between items-center mb-4'>
            <span className='text-gray-600'>{goal.name} Goal</span>
            {isEditing ? (
              <div className='flex space-x-4'>
                <input
                  type='text'
                  name='name'
                  value={goal.name}
                  onChange={e => handleGoalChange(index, e)}
                  className='w-32 px-4 py-2 rounded-lg border border-gray-300'
                  placeholder='Goal Name'
                />
                <input
                  type='number'
                  name='target'
                  value={goal.target}
                  onChange={e => handleGoalChange(index, e)}
                  className='w-32 px-4 py-2 rounded-lg border border-gray-300'
                  placeholder='Target Amount'
                />
              </div>
            ) : (
              <p className='text-lg text-blue-600'>{`₹${goal.target}`}</p>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={handleAddGoal}
            className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
          >
            Add New Goal
          </button>
        )}
      </div>

      {/* Change Password Section */}
      <div className='mt-10'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Change Password
        </h3>
        <div>
          <label className='block text-gray-700 mb-2'>New Password</label>
          <input
            type='password'
            className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
            placeholder='Enter new password'
          />
          <label className='block text-gray-700 mb-2'>Confirm Password</label>
          <input
            type='password'
            className='w-full px-4 py-2 rounded-lg border border-gray-300 mb-4'
            placeholder='Confirm new password'
          />
        </div>
        <button className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>
          Change Password
        </button>
      </div>
    </div>
  )
}

export default Profile
