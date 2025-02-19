import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../store/userSlice'

const API_KEY = import.meta.env.VITE_APP_API_BASE_URL

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
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const [monthlyBudget, setMonthlyBudget] = useState('')
  const [bills, setBills] = useState('')
  const [food, setFood] = useState('')
  const [entertainment, setEntertainment] = useState('')
  const [travel, setTravel] = useState('')
  const [shopping, setShopping] = useState('')
  const [other, setOther] = useState('')

  const calculateBalance = () => {
    const totalExpenses = [bills, food, entertainment, travel, shopping, other]
      .map(expense => parseFloat(expense) || 0)
      .reduce((acc, value) => acc + value, 0)

    return (parseFloat(monthlyBudget) || 0) - totalExpenses
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const budgetData = {
      userId: user?.userId,
      date: Date.now(),
      monthlyBudget: parseFloat(monthlyBudget),
      currentBalance: calculateBalance(),
      bills: parseFloat(bills),
      food: parseFloat(food),
      entertainment: parseFloat(entertainment),
      travel: parseFloat(travel),
      shopping: parseFloat(shopping),
      other: parseFloat(other)
    }
    try {
      const res = await axios.post(`${API_KEY}/budget`, budgetData)

      if (res.data?.budgetId > 0) {
        alert('Budget setup completed successfully!')
        dispatch(fetchData(user?.token))
        window.location.href = '/budget'
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

  return (
    <div className='flex flex-col items-center py-2'>
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
            label='Shopping (₹)'
            value={shopping}
            onChange={setShopping}
          />
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
            {calculateBalance().toFixed(2)}
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
