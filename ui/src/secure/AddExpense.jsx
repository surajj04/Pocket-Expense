import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../store/userSlice'

const API_KEY = import.meta.env.VITE_APP_API_BASE_URL

export default function AddExpensePage () {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 16)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_KEY}/expense`, {
        userId: user?.userId,
        amount,
        category,
        date: date || getCurrentDate(),
        description,
        paymentMethod
      })

      if (res.status === 200 || res.status === 201) {
        alert('Expense added successfully!')
        setCategory('')
        setAmount('')
        setDate(getCurrentDate())
        setDescription('')
        setPaymentMethod('')
        dispatch(fetchData(user?.token))
      } else {
        alert('Failed to add expense. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while adding the expense.')
    }
  }
  return (
    <div className='mx-auto  sm:px-6 lg:px-8 max-sm:mt-10 max-sm:mb-20'>
      <div className='mx-auto w-full'>
        <h1 className='text-3xl md:text-4xl font-bold text-violet-900 mb-6 mt-5 max-sm:mx-4 max-sm:mb-0 max-sm:text-center'>
          Add Expense
        </h1>
        <div className='shadow-lg rounded-lg p-6 sm:p-8'>
          <h2 className='text-2xl font-semibold mb-6 max-sm:text-lg max-sm:hidden'>
            New Expense
          </h2>
          <form onSubmit={handleSubmit} className='space-y-6 max-sm:space-y-4'>
            {/* Form fields */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div>
                <label
                  htmlFor='amount'
                  className='block text-sm font-medium text-gray-700'
                >
                  Amount (₹)
                </label>
                <input
                  id='amount'
                  type='number'
                  placeholder='0.00'
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700'
                >
                  Category
                </label>
                <select
                  id='category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
                >
                  <option value='food'>Food</option>
                  <option value='travel'>Travel</option>
                  <option value='shopping'>Shopping</option>
                  <option value='bills'>Bills</option>
                  <option value='entertainment'>Entertainment</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div>
                <label
                  htmlFor='paymentMethod'
                  className='block text-sm font-medium text-gray-700'
                >
                  Payment Method
                </label>
                <select
                  id='paymentMethod'
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
                >
                  <option value='cash'>Cash</option>
                  <option value='card'>Card</option>
                  <option value='upi'>UPI</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor='date'
                  className='block text-sm font-medium text-gray-700'
                >
                  Date & Time
                </label>
                <input
                  id='date'
                  type='datetime-local'
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='notes'
                className='block text-sm font-medium text-gray-700'
              >
                Notes/Tags
              </label>
              <textarea
                id='notes'
                placeholder='Add any additional notes or tags'
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                className='w-full sm:w-3/4 px-4 py-2 bg-violet-600 text-white font-semibold rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500'
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
