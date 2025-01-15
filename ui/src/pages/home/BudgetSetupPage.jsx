import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Reusable Input Field Component
const InputField = ({ label, value, onChange, placeholder = '' }) => (
  <div>
    <label className='block text-gray-700 text-sm font-bold mb-2'>
      {label}
    </label>
    <input
      type='number'
      min='0'
      value={value}
      onChange={e => onChange(e.target.value)}
      className='w-full p-3 border border-gray-300 rounded-lg'
      placeholder={placeholder}
    />
  </div>
)

const BudgetSetupPage = () => {
  // State for budget fields
  const [monthlyBudget, setMonthlyBudget] = useState('')
  const [currentBalance, setCurrentBalance] = useState(0)
  const [bills, setBills] = useState(0)
  const [food, setFood] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [travel, setTravel] = useState(0)
  const [other, setOther] = useState(0)
  const [userData, setUserData] = useState(null) // Set initial state to null
  const [loading, setLoading] = useState(true) // Add loading state

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem('userToken')
      if (!userToken) {
        alert('No user token found. Please log in.')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/userDetail/${userToken}`
        )
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user details:', error)
        alert('Failed to load user data. Please try again later.')
      } finally {
        setLoading(false) // Ensure loading stops regardless of success or failure
      }
    }

    fetchUserData()
  }, [])

  // Calculate the current balance dynamically
  const calculateBalance = () => {
    const totalExpenses = [bills, food, entertainment, travel, other]
      .map(expense => parseFloat(expense) || 0) // Default to 0 if input is invalid
      .reduce((acc, value) => acc + value, 0)

    return (parseFloat(monthlyBudget) || 0) - totalExpenses
  }

  // Update current balance whenever expenses or budget change
  useEffect(() => {
    setCurrentBalance(calculateBalance())
  }, [bills, food, entertainment, travel, other, monthlyBudget])

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()

    if (!userData) {
      alert('User data not loaded. Please try again.')
      return
    }

    const budgetData = {
      userId: userData?.userId,
      date: Date.now(),
      monthlyBudget: parseFloat(monthlyBudget),
      currentBalance,
      bills: parseFloat(bills),
      food: parseFloat(food),
      entertainment: parseFloat(entertainment),
      travel: parseFloat(travel),
      other: parseFloat(other)
    }

    try {
      const res = await axios.post('http://localhost:8080/budget', budgetData)

      if (res.data?.budgetId > 0) {
        alert('Budget setup completed successfully!')
        window.location.href = '/home'
      } else {
        alert('Failed to save budget. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting budget:', error)
      alert(
        'An error occurred while saving your budget. Please try again later.'
      )
    }
  }

  // If user data is still being loaded, show a loading message
  if (loading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <p>Loading user data...</p>
      </div>
    )
  }

  // If user data fails to load
  if (!userData) {
    return (
      <div className='flex justify-center items-center py-8'>
        <p>Error loading user data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center py-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        Setup Your Budget
      </h1>
      <p className='text-gray-600 mb-6'>
        Complete the form below to start managing your expenses
      </p>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg p-8 w-full max-w-2xl'
      >
        {/* Monthly Budget */}
        <div className='mb-4'>
          <InputField
            label='Monthly Budget (₹)'
            value={monthlyBudget}
            onChange={setMonthlyBudget}
            placeholder='Enter your monthly budget'
          />
        </div>

        {/* Expense Categories */}
        <h3 className='text-lg font-semibold text-gray-800 mt-6 mb-2'>
          Expense Breakdown
        </h3>

        <div className='grid grid-cols-2 gap-4'>
          <InputField label='Bills (₹)' value={bills} onChange={setBills} />
          <InputField label='Food (₹)' value={food} onChange={setFood} />
          <InputField
            label='Entertainment (₹)'
            value={entertainment}
            onChange={setEntertainment}
          />
          <InputField label='Travel (₹)' value={travel} onChange={setTravel} />
          <InputField
            label='Other Expenses (₹)'
            value={other}
            onChange={setOther}
            placeholder='Other expenses'
          />
        </div>

        {/* Current Balance */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Current Balance (₹):
          </h3>
          <p className='text-green-600 text-2xl font-bold'>
            {currentBalance.toFixed(2)}
          </p>
        </div>

        {/* Submit Button */}
        <div className='mt-6 text-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600'
          >
            Save Budget
          </button>
        </div>
      </form>
    </div>
  )
}

export default BudgetSetupPage
