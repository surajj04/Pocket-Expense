import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../store/userSlice'
import RegistrationSuccessAlert from '../components/SuccessAlert'
import InvalidCredentialsAlert from '../components/InvalidAlert'

const API_KEY = import.meta.env.VITE_APP_API_BASE_URL

export default function GoalsPage () {
  const user = useSelector(state => state.user.user)

  const [goals, setGoals] = useState(user?.goals)
  const [successAlert, setSuccessAlert] = useState(false)
  const [invalidAlert, setInvalidAlert] = useState(false)

  useEffect(() => {
    setGoals(user?.goals)
  }, [user])

  return (
    <>
      <div className=''>
        {successAlert && (
          <RegistrationSuccessAlert
            message1='Goal added successfully!'
            message2=''
          />
        )}
        {invalidAlert && (
          <InvalidCredentialsAlert
            message1='Failed to add goal. Please try again.'
            message2=''
          />
        )}
      </div>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-violet-900 mb-6 mt-5 max-sm:text-center max-sm:mt-10'>
          Savings Goals
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <CurrentGoals goals={goals} />
          <NewGoal
            userId={user?.userId}
            setGoals={setGoals}
            setSuccessAlert={setSuccessAlert} // Pass setSuccessAlert
            setInvalidAlert={setInvalidAlert} // Pass setInvalidAlert
            token={user?.token}
          />
        </div>
        <SavingTips />
      </div>
    </>
  )
}

function CurrentGoals ({ goals }) {
  const calculateDaysLeft = targetDate => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return daysLeft > 0 ? daysLeft : 0
  }

  const calculateProgress = (amount, targetAmount) => {
    if (targetAmount <= 0) return 0 // Avoid division by 0
    return (amount / targetAmount) * 100 // Calculate the percentage of completion
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <div className='text-xl font-semibold text-gray-900 mb-4'>
        Current Goals
      </div>
      <div>
        {goals && goals.length > 0 ? (
          goals.map(goal => (
            <div key={goal.id} className='mb-6'>
              <div className='flex justify-between mb-2'>
                <span className='font-semibold'>{goal.description}</span>
                <span>{calculateDaysLeft(goal.targetDate)} days left</span>
              </div>
              {/* Progress Bar (Working) */}
              <div className='h-2 bg-gray-200 rounded-full'>
                <div
                  className='h-2 bg-blue-500 rounded-full'
                  style={{
                    width: `${calculateProgress(
                      goal.amount,
                      goal.targetAmount
                    )}%`
                  }}
                ></div>
              </div>
              <div className='flex justify-between mt-1 text-sm text-gray-600'>
                <span>₹{goal.amount}</span>
                <span>₹{goal.targetAmount}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No goals set yet.</p>
        )}
      </div>
    </div>
  )
}

function NewGoal ({
  userId,
  setGoals,
  setSuccessAlert,
  setInvalidAlert,
  token
}) {
  const [goalName, setGoalName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!goalName || !targetAmount || !targetDate || !userId) {
      alert('Please fill in all fields.')
      return
    }

    const newGoal = {
      userId,
      description: goalName,
      amount: parseFloat(targetAmount),
      status: 'Incomplete',
      targetDate
    }

    try {
      const res = await axios.post(`${API_KEY}/goal`, newGoal)
      setGoals(prevGoals => [...prevGoals, res.data])

      if (res.data) {
        setGoalName('')
        setTargetAmount('')
        setTargetDate('')
        dispatch(fetchData(token))
        setSuccessAlert(true)
        setTimeout(() => setSuccessAlert(false), 5000) // Hide the success alert after 5 seconds
      }
    } catch (error) {
      console.error('Error adding goal:', error)
      setInvalidAlert(true)
      setTimeout(() => setInvalidAlert(false), 5000) // Hide the invalid alert after 5 seconds
    }
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <div className='text-xl font-semibold text-gray-900 mb-4'>New Goal</div>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='goalName'
            className='block text-sm font-medium text-gray-600'
          >
            Goal Name
          </label>
          <input
            id='goalName'
            placeholder='e.g., New Car'
            value={goalName}
            onChange={e => setGoalName(e.target.value)}
            className='input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label
            htmlFor='targetAmount'
            className='block text-sm font-medium text-gray-600'
          >
            Target Amount (₹)
          </label>
          <input
            id='targetAmount'
            type='number'
            placeholder='0'
            value={targetAmount}
            onChange={e => setTargetAmount(e.target.value)}
            className='input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label
            htmlFor='targetDate'
            className='block text-sm font-medium text-gray-600'
          >
            Target Date
          </label>
          <input
            id='targetDate'
            type='date'
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className='input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'
        >
          Create Goal
        </button>
      </form>
    </div>
  )
}

function SavingTips () {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 mt-8 max-sm:mb-28'>
      <div className='text-xl font-semibold text-gray-900 mb-4'>
        Saving Tips
      </div>
      <ul className='list-disc pl-5 space-y-2 text-gray-700'>
        <li>Set up automatic transfers to your savings account</li>
        <li>Cut unnecessary expenses like unused subscriptions</li>
        <li>Use cashback credit cards for everyday purchases</li>
        <li>Cook meals at home instead of eating out</li>
        <li>Wait 24 hours before making non-essential purchases</li>
      </ul>
    </div>
  )
}
