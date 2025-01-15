import React from 'react'

// MessagePage Component
const MessagePage = ({ type, message, onAction }) => {
  // Determine styles based on message type (success or error)
  const isSuccess = type === 'success'

  const containerStyle = isSuccess
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700'

  const iconStyle = isSuccess ? 'text-green-500' : 'text-red-500'

  const icon = isSuccess
    ? '✓' // Success checkmark
    : '✖' // Error cross

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50'>
      <div
        className={`rounded-lg shadow-lg p-8 max-w-md w-full ${containerStyle}`}
      >
        <div className='flex items-center justify-center mb-4'>
          <span
            className={`text-4xl font-bold ${iconStyle}`}
            aria-label={isSuccess ? 'Success' : 'Error'}
          >
            {icon}
          </span>
        </div>
        <h1 className='text-2xl font-bold text-center mb-4'>
          {isSuccess ? 'Success' : 'Error'}
        </h1>
        <p className='text-center text-gray-800 text-sm mb-6'>
          {message || 'Something went wrong. Please try again.'}
        </p>
        <div className='text-center'>
          <button
            onClick={onAction}
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${
              isSuccess
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {isSuccess ? 'Continue' : 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessagePage
