// src/pages/TrackExpense.js
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const TrackExpense = () => {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(localStorage.getItem('userToken'))

  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: ''
  })
  const [sortOrder, setSortOrder] = useState('date')

  const handleFilterChange = e => {
    const { name, value } = e.target
    setFilters(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSortChange = e => {
    setSortOrder(e.target.value)
  }

  const applyFilters = () => {
    let filteredExpenses = expenses

    // Filter by category
    if (filters.category) {
      filteredExpenses = filteredExpenses.filter(
        expense =>
          expense.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Filter by date range
    if (filters.startDate) {
      filteredExpenses = filteredExpenses.filter(
        expense => new Date(expense.date) >= new Date(filters.startDate)
      )
    }

    if (filters.endDate) {
      filteredExpenses = filteredExpenses.filter(
        expense => new Date(expense.date) <= new Date(filters.endDate)
      )
    }

    // Sort by selected criteria
    if (sortOrder === 'date') {
      filteredExpenses.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortOrder === 'amount') {
      filteredExpenses.sort((a, b) => a.amount - b.amount)
    } else if (sortOrder === 'category') {
      filteredExpenses.sort((a, b) => a.category.localeCompare(b.category))
    }

    return filteredExpenses
  }

  const filteredExpenses = applyFilters()

  // ************************************* //

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        return
      }
      try {
        const res = await axios.get(`http://localhost:8080/userDetail/${user}`)
        localStorage.setItem('userData', JSON.stringify(res.data))
        setUserData(res.data)
      } catch (err) {
        console.error('Error fetching user data:', err)
      }
    }

    if (user) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (userData) {
      const fetchData = async () => {
        if (!userData || !userData.userId) {
          alert('User ID is not available')
          return
        }

        try {
          const data = await axios.get(
            `http://localhost:8080/expense/${userData.userId}`
          )
          setExpenses(data.data)
        } catch (err) {
          alert('Error fetching data: ' + err.message)
        }
      }
      fetchData()
    }
  }, [userData])

  //  ************userdetail*************

  const dateFormat = strdate => {
    const dateStr = strdate
    const date = new Date(dateStr)

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return formattedDate
  }

  return (
    <div className='p-6 rounded-lg mx-auto '>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
        Track Expenses
      </h2>

      {/* Filter Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        <div>
          <label className='block text-gray-700'>Category</label>
          <input
            type='text'
            name='category'
            value={filters.category}
            onChange={handleFilterChange}
            placeholder='Filter by category'
            className='w-full px-4 py-2 rounded-lg border border-gray-300'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Start Date</label>
          <input
            type='date'
            name='startDate'
            value={filters.startDate}
            onChange={handleFilterChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300'
          />
        </div>
        <div>
          <label className='block text-gray-700'>End Date</label>
          <input
            type='date'
            name='endDate'
            value={filters.endDate}
            onChange={handleFilterChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300'
          />
        </div>
      </div>

      {/* Sort Section */}
      <div className='mb-6'>
        <label className='block text-gray-700 mb-2'>Sort By</label>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className='px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto'
        >
          <option value='date'>Date</option>
          <option value='amount'>Amount</option>
          <option value='category'>Category</option>
        </select>
      </div>

      {/* Expense List */}
      <div className='space-y-4'>
        {filteredExpenses.map(expense => (
          <div
            key={expense.expenseId}
            className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center'
          >
            {/* Left section with category, date, and description */}
            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-gray-800'>
                {expense.description}
              </h3>
              <p className='text-sm text-gray-600'>{expense.category}</p>
              <p className='text-sm text-gray-500'>
                {dateFormat(expense.date)}
              </p>
            </div>
            {/* Right section with amount */}
            <div className='text-gray-800 font-semibold'>₹{expense.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrackExpense
