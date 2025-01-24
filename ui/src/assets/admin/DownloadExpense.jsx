import React, { useState } from 'react'
const DownloadExpenseData = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [fileFormat, setFileFormat] = useState('CSV')

  const handleDownload = () => {
    console.log('click..')

    const url = 'http://localhost:8080/api/download-expenses'
    const fileName = 'expenses.csv'
    downloadFile(url, fileName)
  }

  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to download file')
      }

      const blob = await response.blob()
      const fileURL = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = fileURL
      anchor.download = fileName // Set file name
      anchor.click()
      window.URL.revokeObjectURL(fileURL)
    } catch (error) {
      console.error('Error downloading the file:', error)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        onClick={handleDownload}
      >
        Download CSV
      </button>
    </div>
  )
  // return (
  //   <div className='flex justify-center items-center h-screen '>
  //     {/* <div className='bg-white rounded-xl shadow-md p-6 max-w-lg w-full'>
  //       <h2 className='text-xl font-semibold text-blue-gray-900 mb-4 text-center'>
  //         Download Expense Data
  //       </h2>
  //       <form
  //         className='flex flex-col gap-4'
  //         onSubmit={e => {
  //           e.preventDefault()
  //           handleDownload()
  //         }}
  //       >
  //         <div>
  //           <label className='block text-sm font-medium text-blue-gray-700 mb-1'>
  //             Start Date
  //           </label>
  //           <input
  //             type='date'
  //             value={startDate}
  //             onChange={e => setStartDate(e.target.value)}
  //             className='w-full p-2 border border-blue-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className='block text-sm font-medium text-blue-gray-700 mb-1'>
  //             End Date
  //           </label>
  //           <input
  //             type='date'
  //             value={endDate}
  //             onChange={e => setEndDate(e.target.value)}
  //             className='w-full p-2 border border-blue-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className='block text-sm font-medium text-blue-gray-700 mb-1'>
  //             File Format
  //           </label>
  //           <select
  //             value={fileFormat}
  //             onChange={e => setFileFormat(e.target.value)}
  //             className='w-full p-2 border border-blue-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
  //           >
  //             <option value='CSV'>CSV</option>
  //             <option value='Excel'>Excel</option>
  //             <option value='PDF'>PDF</option>
  //           </select>
  //         </div>

  //         <button
  //           type='submit'
  //           className='w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
  //         >
  //           Download
  //         </button>
  //       </form>
  //     </div> */}
  //   </div>
  // )
}

export default DownloadExpenseData
