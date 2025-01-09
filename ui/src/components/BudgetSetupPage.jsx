import axios from 'axios'
import React, { useState } from 'react'

const BudgetSetupPage = () => {
  // State for budget fields
  const [monthlyBudget, setMonthlyBudget] = useState('')
  const [currentBalance, setCurrentBalance] = useState(0)
  const [bills, setBills] = useState(0)
  const [food, setFood] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [travel, setTravel] = useState(0)
  const [other, setOther] = useState(0)

  // Calculate the current balance dynamically
  const calculateBalance = () => {
    const totalExpenses =
      parseFloat(bills) +
      parseFloat(food) +
      parseFloat(entertainment) +
      parseFloat(travel) +
      parseFloat(other)
    return parseFloat(monthlyBudget) - totalExpenses || 0
  }

  // Update current balance whenever expenses change
  React.useEffect(() => {
    setCurrentBalance(calculateBalance())
  }, [bills, food, entertainment, travel, other, monthlyBudget])

  const userData = JSON.parse(localStorage.getItem('userdata'))

  const handleSubmit = async e => {
    e.preventDefault()

    const budgetData = {
      userId: userData.userId,
      date: Date.now,
      monthlyBudget,
      currentBalance,
      bills,
      food,
      entertainment,
      travel,
      other
    }

    const res = await axios.post('http://localhost:8080/budget', budgetData)

    if (res.data.budgetId > 0) {
      alert('Budget setup completed successfully!')
      window.location.href = '/home'
    }

    console.log(budgetData)
  }

  return (
    <div className=' flex flex-col items-center py-8'>
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
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Monthly Budget (₹)
          </label>
          <input
            type='number'
            value={monthlyBudget}
            onChange={e => setMonthlyBudget(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg'
            placeholder='Enter your monthly budget'
            required
          />
        </div>

        {/* Expense Categories */}
        <h3 className='text-lg font-semibold text-gray-800 mt-6 mb-2'>
          Expense Breakdown
        </h3>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Bills (₹)
            </label>
            <input
              type='number'
              value={bills}
              onChange={e => setBills(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Food (₹)
            </label>
            <input
              type='number'
              value={food}
              onChange={e => setFood(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Entertainment (₹)
            </label>
            <input
              type='number'
              value={entertainment}
              onChange={e => setEntertainment(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Travel (₹)
            </label>
            <input
              type='number'
              value={travel}
              onChange={e => setTravel(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div className='col-span-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Other Expenses (₹)
            </label>
            <input
              type='number'
              value={other}
              onChange={e => setOther(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
          </div>
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
