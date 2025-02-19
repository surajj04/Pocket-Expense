import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_APP_API_BASE_URL

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    country: '',
    state: '',
    city: ''
  })

  const [stateOptions, setStateOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])

  const stateCityMap = {
    India: {
      states: [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
      ],
      cities: {
        'Andhra Pradesh': [
          'Visakhapatnam',
          'Vijayawada',
          'Guntur',
          'Kurnool',
          'Rajahmundry',
          'Nellore',
          'Tirupati',
          'Chittoor'
        ],
        'Arunachal Pradesh': [
          'Itanagar',
          'Tawang',
          'Ziro',
          'Bomdila',
          'Tezpur',
          'Naharlagun',
          'Pasighat'
        ],
        Assam: [
          'Guwahati',
          'Dibrugarh',
          'Jorhat',
          'Nagaon',
          'Silchar',
          'Tezpur',
          'Dhulia',
          'Tinsukia',
          'Jorhat'
        ],
        Bihar: [
          'Patna',
          'Gaya',
          'Bhagalpur',
          'Muzaffarpur',
          'Munger',
          'Darbhanga',
          'Purnia',
          'Begusarai',
          'Chapra'
        ],
        Chhattisgarh: [
          'Raipur',
          'Bilaspur',
          'Durg',
          'Korba',
          'Jagdalpur',
          'Raigarh',
          'Rajnandgaon'
        ],
        Goa: [
          'Panaji',
          'Vasco da Gama',
          'Margao',
          'Mapusa',
          'Pernem',
          'Bicholim',
          'Cortalim'
        ],
        Gujarat: [
          'Ahmedabad',
          'Surat',
          'Vadodara',
          'Rajkot',
          'Bhavnagar',
          'Jamnagar',
          'Junagadh',
          'Anand',
          'Gandhinagar',
          'Vapi'
        ],
        Haryana: [
          'Chandigarh',
          'Gurgaon',
          'Faridabad',
          'Hisar',
          'Ambala',
          'Rohtak',
          'Panipat',
          'Sonipat',
          'Karnal'
        ],
        'Himachal Pradesh': [
          'Shimla',
          'Manali',
          'Kullu',
          'Dharamshala',
          'Solan',
          'Kangra',
          'Mandi',
          'Hamirpur'
        ],
        Jharkhand: [
          'Ranchi',
          'Jamshedpur',
          'Dhanbad',
          'Bokaro',
          'Hazaribagh',
          'Giridih',
          'Deoghar',
          'Dumka',
          'Chaibasa'
        ],
        Karnataka: [
          'Bengaluru',
          'Mysore',
          'Hubli',
          'Mangalore',
          'Tumkur',
          'Belagavi',
          'Davangere',
          'Bellary',
          'Mandya',
          'Chikmagalur'
        ],
        Kerala: [
          'Thiruvananthapuram',
          'Kochi',
          'Kozhikode',
          'Kollam',
          'Thrissur',
          'Kottayam',
          'Alappuzha',
          'Pathanamthitta',
          'Palakkad'
        ],
        'Madhya Pradesh': [
          'Bhopal',
          'Indore',
          'Gwalior',
          'Ujjain',
          'Jabalpur',
          'Sagar',
          'Satna',
          'Ratlam',
          'Mandsaur',
          'Dewas'
        ],
        Maharashtra: [
          'Mumbai',
          'Pune',
          'Nagpur',
          'Nashik',
          'Aurangabad',
          'Thane',
          'Nanded',
          'Solapur',
          'Kolhapur',
          'Jalgaon'
        ],
        Manipur: [
          'Imphal',
          'Thoubal',
          'Kakching',
          'Chandel',
          'Ukhrul',
          'Senapati',
          'Bishnupur'
        ],
        Meghalaya: [
          'Shillong',
          'Tura',
          'Jowai',
          'Nongstoin',
          'Williamnagar',
          'Mawlai'
        ],
        Mizoram: [
          'Aizawl',
          'Lunglei',
          'Champhai',
          'Kolasib',
          'Mamit',
          'Serchhip'
        ],
        Nagaland: [
          'Kohima',
          'Dimapur',
          'Mokokchung',
          'Mon',
          'Wokha',
          'Zunheboto'
        ],
        Odisha: [
          'Bhubaneswar',
          'Cuttack',
          'Rourkela',
          'Berhampur',
          'Sambalpur',
          'Balasore',
          'Puri',
          'Angul',
          'Rayagada'
        ],
        Punjab: [
          'Amritsar',
          'Ludhiana',
          'Jalandhar',
          'Patiala',
          'Mohali',
          'Bathinda',
          'Moga',
          'Hoshiarpur',
          'Pathankot'
        ],
        Rajasthan: [
          'Jaipur',
          'Udaipur',
          'Jodhpur',
          'Kota',
          'Ajmer',
          'Bikaner',
          'Alwar',
          'Nagaur',
          'Sikar',
          'Pali'
        ],
        Sikkim: ['Gangtok', 'Jorethang', 'Namchi', 'Mangan', 'Rangpo'],
        'Tamil Nadu': [
          'Chennai',
          'Coimbatore',
          'Madurai',
          'Salem',
          'Tiruchirappalli',
          'Erode',
          'Vellore',
          'Dindigul',
          'Tirunelveli'
        ],
        Telangana: [
          'Hyderabad',
          'Warangal',
          'Karimnagar',
          'Khammam',
          'Nizamabad',
          'Mahabubnagar',
          'Nalgonda'
        ],
        Tripura: ['Agartala', 'Udaipur', 'Dharmanagar', 'Sabroom'],
        'Uttar Pradesh': [
          'Lucknow',
          'Kanpur',
          'Agra',
          'Varanasi',
          'Ghaziabad',
          'Meerut',
          'Allahabad',
          'Mathura',
          'Aligarh',
          'Bareilly'
        ],
        Uttarakhand: [
          'Dehradun',
          'Haridwar',
          'Nainital',
          'Rishikesh',
          'Roorkee',
          'Haldwani',
          'Kashipur'
        ],
        'West Bengal': [
          'Kolkata',
          'Darjeeling',
          'Siliguri',
          'Durgapur',
          'Asansol',
          'Howrah',
          'Kolar',
          'Kanchrapara',
          'Malda'
        ]
      }
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCountryChange = e => {
    const country = e.target.value
    setFormData(prev => ({
      ...prev,
      country,
      state: '',
      city: ''
    }))

    if (country === 'India') {
      setStateOptions(stateCityMap['India'].states)
    } else {
      setStateOptions([])
      setCityOptions([])
    }
  }

  const handleStateChange = e => {
    const state = e.target.value
    setFormData(prev => ({
      ...prev,
      state,
      city: ''
    }))

    if (state) {
      setCityOptions(stateCityMap['India'].cities[state])
    } else {
      setCityOptions([])
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formData.password === formData.confirmPassword) {
      try {
        const res = await axios.post(`${API_KEY}/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          dob: formData.dob,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          token: ''
        })

        if (res.status == 200) {
          return (
            <RegistrationSuccessAlert
              message1={'Registration Successful!'}
              message2={'You can now log in to your account.'}
            />
          )
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      window.alert('Passwords do not match. Please try again.')
    }

    console.log(formData)
  }

  return (
    <div className='flex items-center justify-center my-5'>
      <div className='w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-2xl space-y-8'>
        <h2 className='text-3xl font-bold text-blue-600 mb-4 text-center'>
          Create an Account
        </h2>
        <p className='text-gray-500 mb-6 text-center'>
          Fill in the details below to register
        </p>

        <form
          onSubmit={handleSubmit}
          className='sm:grid  sm:grid-cols-2 gap-6 space-y-4'
        >
          {/* Full Name */}
          <div className='relative'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name'
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>

          {/* Email Address */}
          <div className='relative'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>

          {/* Password */}
          <div className='relative'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>

          {/* Gender */}
          <div className='relative'>
            <label
              htmlFor='gender'
              className='block text-sm font-medium text-gray-700'
            >
              Gender
            </label>
            <select
              id='gender'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className='relative'>
            <label
              htmlFor='dob'
              className='block text-sm font-medium text-gray-700'
            >
              Date of Birth
            </label>
            <input
              type='date'
              id='dob'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>

          {/* Country */}
          <div className='relative'>
            <label
              htmlFor='country'
              className='block text-sm font-medium text-gray-700'
            >
              Country
            </label>
            <select
              id='country'
              name='country'
              value={formData.country}
              onChange={handleCountryChange}
              className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            >
              <option value=''>Select Country</option>
              <option value='India'>India</option>
            </select>
          </div>

          {/* State */}
          {formData.country === 'India' && (
            <div className='relative'>
              <label
                htmlFor='state'
                className='block text-sm font-medium text-gray-700'
              >
                State
              </label>
              <select
                id='state'
                name='state'
                value={formData.state}
                onChange={handleStateChange}
                className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              >
                <option value=''>Select State</option>
                {stateOptions.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* City */}
          {formData.state && (
            <div className='relative'>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700'
              >
                City
              </label>
              <select
                id='city'
                name='city'
                value={formData.city}
                onChange={handleChange}
                className='mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              >
                <option value=''>Select City</option>
                {cityOptions.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className='col-span-2'>
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
            >
              Register
            </button>
          </div>
        </form>

        <p className='text-center text-sm text-gray-600 mt-4'>
          Already have an account? &ensp;
          <Link
            to='/login'
            className='text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegistrationForm
