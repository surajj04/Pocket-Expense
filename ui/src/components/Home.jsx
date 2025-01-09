import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ isLoggedIn }) => {
  const renderHeroContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <h1 className='text-3xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6 tracking-wide leading-tight'>
            Welcome to Pocket
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 w-full sm:w-11/12 lg:w-2/3 mx-auto'>
            The ultimate app to manage your expenses, track your budgets, and
            achieve financial goals.
          </p>
          <p className='text-gray-800 text-sm sm:text-base mb-4 sm:mb-6'>
            To get started, you need to log in or register. It's quick and easy!
          </p>
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-x-0 sm:space-y-0 space-y-4 justify-center items-center'>
            <Link
              to='/login'
              className='bg-yellow-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-yellow-600 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto'
            >
              Login
            </Link>
            <Link
              to='/register'
              className='bg-green-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-green-600 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto'
            >
              Register
            </Link>
          </div>
        </>
      )
    } else {
      return (
        <>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6'>
            Welcome back, User!
          </h2>
          <p className='text-gray-700 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8'>
            Now you can track your expenses, set budgets, and monitor your
            financial progress. Let's get started!
          </p>
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-x-0 sm:space-y-0 space-y-4 justify-center items-center'>
            <Link
              to='/dashboard'
              className='bg-yellow-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-yellow-600 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto'
            >
              Go to Dashboard
            </Link>
            <Link
              to='/add-expense'
              className='bg-blue-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-blue-600 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto'
            >
              Add Expense
            </Link>
          </div>
        </>
      )
    }
  }

  return (
    <div className='flex flex-col items-center justify-center text-gray-900 py-12 sm:py-16 px-6 md:px-12'>
      {/* Hero Section */}
      <div className='bg-white p-6 sm:p-8 lg:p-10 xl:p-12 rounded-3xl shadow-lg w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl text-center transform transition-all hover:scale-105'>
        {renderHeroContent()}
      </div>

      {/* Footer */}
      <div className={`mt-40 sm:mt-20 lg:mt-52 text-center text-gray-700`}>
        <p>© 2025 Pocket. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Home
