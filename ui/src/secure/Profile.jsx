import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../store/userSlice'
import RegistrationSuccessAlert from '../components/SuccessAlert'
import InvalidCredentialsAlert from '../components/InvalidAlert'

const API_KEY = import.meta.env.VITE_APP_API_BASE_URL

export default function ProfilePage () {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const formatDate = isoDate => {
    return isoDate ? isoDate.split('T')[0] : ''
  }

  const [userData, setUserData] = useState(user)

  const [successAlert, setSuccessAlert] = useState(false)
  const [invalidAlert, setInvalidAlert] = useState(false)

  const [formData, setFormData] = useState({
    userId: user?.userId || '',
    name: user?.name || '',
    email: user?.email || '',
    dob: formatDate(user?.dob),
    gender: user?.gender || '',
    country: user?.country || '',
    state: user?.state || '',
    city: user?.city || ''
  })

  useEffect(() => {
    setFormData({
      userId: userData?.userId || '',
      name: userData?.name || '',
      email: userData?.email || '',
      dob: formatDate(userData?.dob),
      gender: userData?.gender || '',
      country: userData?.country || '',
      state: userData?.state || '',
      city: userData?.city || ''
    })
  }, [userData])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const updatedFormData = {
        ...formData,
        userId: userData?.userId
      }

      const response = await axios.put(
        `${API_KEY}/updateProfile`,
        updatedFormData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (response.status === 200) {
        const updatedUser = response.data
        localStorage.setItem('userDetail', JSON.stringify(updatedUser))
        setUserData(updatedUser)
        dispatch(fetchData(user?.token))
        setSuccessAlert(true)
        setTimeout(() => setSuccessAlert(false), 5000)
        dispatch(fetchData(user?.token))
      } else {
        setInvalidAlert(true)
        setTimeout(() => setInvalidAlert(false), 5000)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile.')
    }
  }

  return (
    <>
      <div className=''>
        {successAlert && (
          <RegistrationSuccessAlert
            message1='Profile Update Successful!'
            message2=''
          />
        )}
        {invalidAlert && (
          <InvalidCredentialsAlert
            message1='Failed to update profile.'
            message2=''
          />
        )}
      </div>
      <div className='mx-auto px-4 max-sm:px-0 sm:px-6 lg:px-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-violet-900 mb-6 mt-5 max-sm:text-center'>
          Your Financial Profile
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-8'>
          <div className='p-6 rounded-lg sm:shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>Personal Information</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name' className='block text-sm font-medium'>
                  Name
                </label>
                <input
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium'>
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label htmlFor='dob' className='block text-sm font-medium'>
                  Date of Birth
                </label>
                <input
                  id='dob'
                  type='date'
                  value={formData.dob}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label htmlFor='gender' className='block text-sm font-medium'>
                  Gender
                </label>
                <input
                  id='gender'
                  value={formData.gender}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label htmlFor='country' className='block text-sm font-medium'>
                  Country
                </label>
                <input
                  id='country'
                  value={formData.country}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label htmlFor='state' className='block text-sm font-medium'>
                  State
                </label>
                <input
                  id='state'
                  value={formData.state}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label htmlFor='city' className='block text-sm font-medium'>
                  City
                </label>
                <input
                  id='city'
                  value={formData.city}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                />
              </div>
              <button
                type='submit'
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
