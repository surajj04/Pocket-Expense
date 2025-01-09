import React from 'react'

const RegistrationSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center py-8 my-20'>
      <div className='bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full'>
        <h1 className='text-3xl font-semibold text-green-600 mb-4'>
          Registration Successful!
        </h1>
        <p className='text-xl text-gray-700 mb-6'>
          You have been successfully registered. Redirecting to home page...
        </p>
        <div className='loader'></div>{' '}
        {/* You can add a loading spinner or animation here */}
        <p className='text-sm text-gray-500 mt-6'>
          If you're not redirected,{' '}
          <a href='/home' className='text-blue-500'>
            click here
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default RegistrationSuccess
