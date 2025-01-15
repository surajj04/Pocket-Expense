import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.gender ||
      !formData.dob
    ) {
      setError('All fields are required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!['male', 'female', 'other'].includes(formData.gender.toLowerCase())) {
      setError('Invalid gender selected')
      return false
    }
    if (new Date(formData.dob) > new Date()) {
      setError('Date of birth cannot be in the future')
      return false
    }
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const res = await axios.post('http://localhost:8080/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        dob: formData.dob,
        token: ''
      })

      if (res.status === 200) {
        const loginRes = await axios.post('http://localhost:8080/login', {
          email: formData.email,
          password: formData.password
        })

        if (loginRes.status === 200) {
          const token = await axios.post('http://localhost:8080/token', {
            email: formData.email,
            password: formData.password
          })

          localStorage.setItem('userToken', token.data)
          localStorage.setItem('isLoggedIn', 'true')

          alert('User Registered Successfully!')

          // Navigate to setup page instead of redirecting
          window.location.href = '/setup'
          return
        }
      }
    } catch (err) {
      if (err.response) {
        window.alert(
          `Error: ${err.response.data.message || 'An error occurred'}`
        )
      } else {
        window.alert('Network error. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
          Register
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Form Fields */}
          <div>
            <label className='block text-gray-700 mb-2'>Full Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your full name'
            />
          </div>
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
          <div>
            <label className='block text-gray-700 mb-2'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Confirm your password'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Gender</label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Date of Birth</label>
            <input
              type='date'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <div className='text-center'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <a href='/login' className='text-blue-500 hover:underline'>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
