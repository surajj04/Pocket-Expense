import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken')
        if (!token) throw new Error('User token not found in localStorage')

        const response = await axios.get(
          `http://localhost:8080/userDetail/${token}`
        )
        const userData = response.data

        // Navigate to "setup" URL if no budget is defined
        if (
          !userData?.budgets ||
          userData.budgets.length === 0 ||
          userData.budgets[0].monthlyBudget === 0
        ) {
          navigate('/setup')
          return
        }

        // Check if the current month is different from the latest budget month
        const currentMonth = new Date().getMonth()
        const latestBudgetMonth = new Date(userData.budgets[0].date).getMonth()

        if (currentMonth !== latestBudgetMonth) {
          // Create a new budget for the new month
          const newBudget = {
            monthlyBudget: 0, // Default value; can be updated in "setup"
            currentBalance: 0,
            food: 0,
            travel: 0,
            bills: 0,
            entertainment: 0,
            date: new Date().toISOString()
          }

          await axios.post(`http://localhost:8080/budgets/${token}`, newBudget)
          userData.budgets.unshift(newBudget)
        }

        setUserData(userData)
        localStorage.setItem('userData', JSON.stringify(userData))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [navigate])

  const budget = userData?.budgets?.[0] || {
    monthlyBudget: 0,
    currentBalance: 0,
    food: 0,
    travel: 0,
    bills: 0,
    entertainment: 0,
    date: new Date().toISOString()
  }

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-600 text-xl font-bold'>Error: {error}</p>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-blue-600 text-xl font-bold'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-6 px-4 sm:px-6 md:px-8 lg:px-10'>
      <h4 className='text-2xl font-semibold mb-6 text-center sm:text-left text-white'>
        Dashboard
      </h4>

      {/* Overview Summary */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
        <SummaryCard
          title='Total Budget'
          value={`₹${budget.monthlyBudget}`}
          color='blue'
        />
        <SummaryCard
          title='Total Expenses'
          value={`₹${budget.monthlyBudget - budget.currentBalance}`}
          color='red'
        />
        <SummaryCard
          title='Remaining Balance'
          value={`₹${budget.currentBalance}`}
          color='green'
        />
      </div>

      {/* Expense Breakdown */}
      <ExpenseBreakdown budget={budget} />

      {/* Recent Transactions */}
      <RecentTransactions expenses={userData.expenses} />

      {/* Monthly Trends */}
      <MonthlyTrends budget={budget} formatDate={formatDate} />

      {/* Savings Tracker */}
      <SavingsTracker goals={userData.goals} />
    </div>
  )
}

// Component definitions remain the same
const SummaryCard = ({ title, value, color }) => (
  <div className='bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl'>
    <h6 className='text-gray-600 text-lg'>{title}</h6>
    <p className={`text-3xl font-semibold text-${color}-600`}>{value}</p>
  </div>
)

const ExpenseBreakdown = ({ budget }) => (
  <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
    <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
      Expense Breakdown
    </h6>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {['food', 'travel', 'bills', 'entertainment'].map(category => (
        <div key={category} className='flex justify-between items-center'>
          <span className='text-gray-600 text-lg capitalize'>{category}</span>
          <span className='text-2xl text-blue-600'>₹{budget[category]}</span>
        </div>
      ))}
    </div>
  </div>
)

const RecentTransactions = ({ expenses }) => (
  <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
    <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
      Recent Transactions
    </h6>
    <ul className='space-y-4'>
      {expenses &&
        [...expenses]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
          .map(expense => (
            <li
              key={expense.expenseId}
              className='flex justify-between items-center bg-gray-100 rounded-lg p-3 transition-transform transform hover:scale-105 hover:shadow-md'
            >
              <div>
                <span className='text-lg font-medium text-gray-800'>
                  {expense.description}{' '}
                  <span className='text-xs'>
                    ({new Date(expense.date).toLocaleDateString('en-IN')})
                  </span>
                </span>
              </div>
              <span className='text-2xl text-blue-600'>₹{expense.amount}</span>
            </li>
          ))}
    </ul>
  </div>
)

const MonthlyTrends = ({ budget, formatDate }) => (
  <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
    <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
      Monthly Trends
    </h6>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-gray-600 text-lg'>{formatDate(budget.date)}</span>
      </div>
      <SummaryCard
        title='Expenses'
        value={`₹${budget.monthlyBudget - budget.currentBalance}`}
        color='blue'
      />
      <SummaryCard
        title='Budget'
        value={`₹${budget.monthlyBudget}`}
        color='green'
      />
    </div>
  </div>
)

const SavingsTracker = ({ goals }) => (
  <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
    <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
      Savings Tracker
    </h6>
    {goals && goals.length > 0 ? (
      goals.map((goal, index) => (
        <div
          key={goal.id || index}
          className='flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg'
        >
          <span className='text-gray-600 text-lg'>{goal.description}</span>
          <div className='flex flex-col items-center'>
            <p className='text-2xl text-blue-600'>₹{goal.amount}</p>
            <span className='text-sm text-gray-600'>Amount</span>
          </div>
          <div className='flex flex-col items-center'>
            <p
              className={`text-2xl ${
                goal.status === 'Incomplete' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {goal.status}
            </p>
            <span className='text-sm text-gray-600'>Status</span>
          </div>
        </div>
      ))
    ) : (
      <p className='text-gray-600 text-center'>No goals available.</p>
    )}
  </div>
)

export default Dashboard
