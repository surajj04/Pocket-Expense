import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          {['Dashboard', 'Add Expense', 'Track Expense', 'Profile'].map(
            (text, index) => (
              <Link
                key={index}
                to={`/${text.toLowerCase().replace(' ', '-')}`}
                className='text-white hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
              >
                {text}
              </Link>
            )
          )}
          <button
            onClick={handleLogout}
            className='text-white hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
          >
            Logout
          </button>
        </>
      )
    } else {
      return (
        <>
          <Link
            to='/login'
            className='text-white hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='text-white hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
          >
            Register
          </Link>
        </>
      )
    }
  }

  return (
    <nav className='bg-gray-800 sticky top-0 z-50'>
      <div className='max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <div className='text-white text-4xl font-extrabold font-sans tracking-wider hover:scale-105 transition-all duration-300'>
          <Link to='/home'>
            <img className='inline w-20 my-auto' src='/logo.png' alt='' />{' '}
            Pocket
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className='hidden md:flex space-x-8'>{renderLinks()}</div>

        {/* Mobile Navbar (Hamburger Icon) */}
        <div className='md:hidden flex items-center'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none hover:text-yellow-300 transition-all duration-300'
          >
            {isMenuOpen ? (
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            ) : (
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-800 text-white py-6 space-y-6'>
          {isLoggedIn ? (
            <>
              {['Dashboard', 'Add Expense', 'Track Expense', 'Profile'].map(
                (text, index) => (
                  <Link
                    key={index}
                    to={`/${text.toLowerCase().replace(' ', '-')}`}
                    className='block text-xl text-white px-6 py-3 hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
                  >
                    {text}
                  </Link>
                )
              )}
              <button
                onClick={handleLogout}
                className='block text-xl text-white px-6 py-3 hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='block text-xl text-white px-6 py-3 hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='block text-xl text-white px-6 py-3 hover:text-yellow-300 hover:scale-105 hover:shadow-lg hover:rounded-lg transition-all duration-300'
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
