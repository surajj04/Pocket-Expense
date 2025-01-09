import React from 'react'

function LoadingPage () {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
      <div className='text-center text-white'>
        <div className='flex justify-center mb-4'>
          <div className='w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin'></div>
        </div>
        <p className='text-2xl font-semibold'>Loading your data...</p>
        <p className='mt-2 text-lg'>
          Please wait while we prepare everything for you!
        </p>
      </div>
    </div>
  )
}

export default LoadingPage
