import axios from 'axios'
import React, { useState } from 'react'

const AddExpense = () => {
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0] // Format: YYYY-MM-DD
  }

  const [category, setCategory] = useState('Food')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(getCurrentDate())
  const [description, setDescription] = useState('')

  const userData = JSON.parse(localStorage.getItem('userData'))

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:8080/expense', {
        userId: userData.userId,
        amount: amount,
        category: category,
        date: date || getCurrentDate(), // Use current date if not provided
        description: description
      })

      console.log(res)

      if (res.status === 200 || res.status === 201) {
        alert('Expense added successfully!')
        setCategory('Food')
        setAmount('')
        setDate(getCurrentDate()) // Reset to the current date
        setDescription('')
      } else {
        alert('Failed to add expense. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while adding the expense.')
    }
  }

  return (
    <div className='py-4 px-6'>
      <h4 className='text-3xl font-semibold mb-4'>Add Expense</h4>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='category'
            className='block text-xl font-medium text-gray-600'
          >
            Category
          </label>
          <select
            id='category'
            className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value='Food'>Food</option>
            <option value='Travel'>Travel</option>
            <option value='Bills'>Bills</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor='amount'
            className='block text-xl font-medium text-gray-600'
          >
            Amount
          </label>
          <input
            type='number'
            id='amount'
            className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='Enter amount'
          />
        </div>
        <div>
          <label
            htmlFor='date'
            className='block text-xl font-medium text-gray-600'
          >
            Date
          </label>
          <input
            type='date'
            id='date'
            className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-xl font-medium text-gray-600'
          >
            Description
          </label>
          <textarea
            id='description'
            rows='3'
            className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Enter description'
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none text-lg'
        >
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default AddExpense
