import axios from 'axios'
import React, { useState } from 'react'
const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password')
      return
    }

    try {
      const res = await axios.post('http://localhost:8080/login', {
        email: formData.email,
        password: formData.password
      })

      // If login is successful
      if (res.status === 200) {
        const tokenRes = await axios.post('http://localhost:8080/token', {
          email: formData.email,
          password: formData.password
        })

        if (tokenRes.status === 200 && tokenRes.data) {
          // Save token in local storage
          localStorage.setItem('userToken', tokenRes.data)
          alert('Login Successful!')
          window.location.href = '/home'
        }
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password') // Show error to the user
      } else {
        setError('An error occurred. Please try again.')
      }
    }

    // Reset form state
    setFormData({
      email: '',
      password: ''
    })
  }

  return (
    <div className='flex justify-center items-center my-20'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
          Login
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Input */}
          <div>
            <label className='block text-gray-700 mb-2'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your email'
            />
          </div>

          {/* Password Input */}
          <div>
            <label className='block text-gray-700 mb-2'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your password'
            />
          </div>

          {/* Error Message */}
          {error && <p className='text-red-500 text-sm'>{error}</p>}

          {/* Submit Button */}
          <div className='text-center'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300'
            >
              Login
            </button>
          </div>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Don't have an account?{' '}
            <a href='/register' className='text-blue-500 hover:underline'>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
