import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../store/userSlice'

const API_KEY = import.meta.env.VITE_APP_API_BASE_URL

export default function ProfilePage () {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  // Function to format ISO date to "yyyy-MM-dd"
  const formatDate = isoDate => {
    return isoDate ? isoDate.split('T')[0] : ''
  }

  const [userData, setUserData] = useState(user)

  const [formData, setFormData] = useState({
    userId: user?.userId || '',
    name: user?.name || '',
    email: user?.email || '',
    dob: formatDate(user?.dob),
    gender: user?.gender || ''
  })

  const [account, setAccount] = useState({
    bank: 'XYZ Bank',
    number: '1234567890',
    upiId: 'johndoe@upi'
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({ upi_Id: '' })

  useEffect(() => {
    setFormData({
      userId: userData?.userId || '',
      name: userData?.name || '',
      email: userData?.email || '',
      dob: formatDate(userData?.dob),
      gender: userData?.gender || ''
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
        userId: userData?.userId // Ensure userId is included
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
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile.')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile.')
    }
  }

  const handleAddAccount = () => {
    if (newAccount.upi_Id) {
      alert(
        '✅ Your request to link your bank UPI ID has been sent successfully.'
      )
      setIsModalOpen(false)
      setAccount({
        bank: 'XYZ Bank',
        number: '1234567890',
        upiId: newAccount.upi_Id
      })
    } else {
      alert('⚠️ Please enter a valid UPI ID before submitting.')
    }
  }

  return (
    <div className='mx-auto px-4 max-sm:px-0 sm:px-6 lg:px-8'>
      <h1 className='text-3xl md:text-4xl font-bold text-violet-900 mb-6 mt-5 max-sm:text-center'>
        Your Financial Profile
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-1 gap-8'>
        <div className='p-6 rounded-lg  sm:shadow-lg'>
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
            <button
              type='submit'
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Update Profile
            </button>
          </form>
        </div>
        {/* <div className='bg-gradient-to-br from-pink-50 to-red-100 p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Financial Snapshot</h2>
          <p>Bank: {account.bank}</p>
          <p>Account Number: **** **** **** {account.number.slice(-4)}</p>
          <p>UPI ID: {account.upiId}</p>
        </div> */}
      </div>
      {/* <div className='grid grid-cols-2'>
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Linked Bank Accounts</h2>
          <ul className='space-y-2'>
            <li className='flex justify-between items-center'>
              <span>
                {account.bank} - {account.number}
              </span>
              <span className='bg-gray-500 text-white px-4 py-1 rounded-full'>
                {account.upiId}
              </span>
            </li>
          </ul>
          {!account.upiId && (
            <button
              onClick={() => setIsModalOpen(true)}
              className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md'
            >
              Link New Account
            </button>
          )}
          {isModalOpen && (
            <div className='fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <h2 className='text-xl font-semibold mb-4'>Link New Account</h2>
                <div className='space-y-3'>
                  <div>
                    <label
                      htmlFor='upi-id'
                      className='block text-sm font-medium'
                    >
                      SAMPATTI UPI ID
                    </label>
                    <input
                      id='upi-id'
                      value={newAccount.upi_Id}
                      onChange={e =>
                        setNewAccount({ ...newAccount, upi_Id: e.target.value })
                      }
                      className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <div className='mt-4 flex justify-end space-x-3'>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='px-4 py-2 border border-gray-300 rounded-md'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAccount}
                    className='px-4 py-2 bg-blue-500 text-white rounded-md'
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  )
}
