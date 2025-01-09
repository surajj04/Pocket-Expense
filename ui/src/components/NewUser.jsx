import React, { useState } from 'react'

const NewUserPage = () => {
  // State hooks to manage user input
  const [totalBudget, setTotalBudget] = useState(0)
  const [foodExpense, setFoodExpense] = useState(0)
  const [transportExpense, setTransportExpense] = useState(0)
  const [billsExpense, setBillsExpense] = useState(0)
  const [entertainmentExpense, setEntertainmentExpense] = useState(0)
  const [goals, setGoals] = useState([{ goalName: '', goalAmount: 0 }])

  // Handler for form submission
  const handleSubmit = e => {
    e.preventDefault()
    // You can handle form submission here
    console.log('Budget Data Submitted', {
      totalBudget,
      foodExpense,
      transportExpense,
      billsExpense,
      entertainmentExpense,
      goals
    })
  }

  // Handler for adding a new goal
  const handleAddGoal = () => {
    setGoals([...goals, { goalName: '', goalAmount: 0 }])
  }

  // Handler for goal input changes
  const handleGoalChange = (index, field, value) => {
    const updatedGoals = [...goals]
    updatedGoals[index][field] = value
    setGoals(updatedGoals)
  }

  return (
    <div className='min-h-screen flex flex-col items-center py-8'>
      {/* Header Section */}
      <div className='text-center mb-10'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
          Welcome to Pocket!
        </h1>
        <p className='text-lg my-3 sm:text-xl text-gray-600'>
          Let's set up your budget
        </p>
      </div>

      {/* Budget Overview */}
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl'
      >
        <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4'>
          Total Budget
        </h2>
        <div className='mb-4'>
          <label className='text-lg sm:text-xl text-gray-700'>
            Enter Total Budget
          </label>
          <input
            type='number'
            value={totalBudget}
            onChange={e => setTotalBudget(e.target.value)}
            className='w-full mt-2 p-3 rounded-lg border border-gray-300'
            placeholder='₹50,000'
          />
        </div>

        {/* Expense Breakdown */}
        <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4'>
          Expense Breakdown
        </h2>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <label className='text-lg sm:text-xl text-gray-700'>Food</label>
            <input
              type='number'
              value={foodExpense}
              onChange={e => setFoodExpense(e.target.value)}
              className='w-1/3 mt-2 p-3 rounded-lg border border-gray-300'
              placeholder='₹10,000'
            />
          </div>
          <div className='flex justify-between'>
            <label className='text-lg sm:text-xl text-gray-700'>
              Transport
            </label>
            <input
              type='number'
              value={transportExpense}
              onChange={e => setTransportExpense(e.target.value)}
              className='w-1/3 mt-2 p-3 rounded-lg border border-gray-300'
              placeholder='₹5,000'
            />
          </div>
          <div className='flex justify-between'>
            <label className='text-lg sm:text-xl text-gray-700'>Bills</label>
            <input
              type='number'
              value={billsExpense}
              onChange={e => setBillsExpense(e.target.value)}
              className='w-1/3 mt-2 p-3 rounded-lg border border-gray-300'
              placeholder='₹8,000'
            />
          </div>
          <div className='flex justify-between'>
            <label className='text-lg sm:text-xl text-gray-700'>
              Entertainment
            </label>
            <input
              type='number'
              value={entertainmentExpense}
              onChange={e => setEntertainmentExpense(e.target.value)}
              className='w-1/3 mt-2 p-3 rounded-lg border border-gray-300'
              placeholder='₹7,000'
            />
          </div>
        </div>

        {/* Savings Tracker */}
        <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4'>
          Add Your Goals
        </h2>
        {goals.map((goal, index) => (
          <div key={index} className='space-y-4 mb-4'>
            <div className='flex justify-between'>
              <label className='text-lg sm:text-xl text-gray-700'>
                Goal Name
              </label>
              <input
                type='text'
                value={goal.goalName}
                onChange={e =>
                  handleGoalChange(index, 'goalName', e.target.value)
                }
                className='w-1/3 mt-2 p-3 rounded-lg border border-gray-300'
                placeholder='e.g. Vacation Fund'
              />
            </div>
            <div className='flex justify-between'>
              <label className='text-lg sm:text-xl text-gray-700'>
                Goal Amount
              </label>
              <input
                type='number'
                value={goal.goalAmount}
                onChange={e =>
                  handleGoalChange(index, 'goalAmount', e.target.value)
                }
                className='w-1/3 mt-2 p-3 rounded-lg border border-gray-300'
                placeholder='₹10,000'
              />
            </div>
          </div>
        ))}
        {/* Button to Add More Goals */}
        <div className='text-center'>
          <button
            type='button'
            onClick={handleAddGoal}
            className='bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg text-lg hover:bg-green-600 transition-all duration-300'
          >
            Add Another Goal
          </button>
        </div>

        {/* Submit Button */}
        <div className='mt-10 text-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg text-lg hover:bg-blue-600 transition-all duration-300'
          >
            Save My Budget
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewUserPage
