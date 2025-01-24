import React from 'react'
import { GoGoal } from 'react-icons/go'

function AdminHome () {
  return (
    <div>
      <div className='p-4 xl:ml-80 max-sm:my-10'>
        <nav className='block w-full max-w-full  text-white shadow-none rounded-xl transition-all px-0 py-1'>
          <div className='flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center'>
            <div className='capitalize'>
              <nav aria-label='breadcrumb' className='w-max'>
                <ol className='flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all'>
                  <li className='flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500'>
                    <a href='#'>
                      <p className='block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100'>
                        dashboard
                      </p>
                    </a>
                    <span className='text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none'>
                      /
                    </span>
                  </li>
                  <li className='flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500'>
                    <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal'>
                      home
                    </p>
                  </li>
                </ol>
              </nav>
              <h6 className='block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900'>
                home
              </h6>
            </div>
          </div>
        </nav>
        <div className='mt-12'>
          <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4'>
            <div className='relative flex flex-col bg-clip-border rounded-xl  text-gray-700 shadow-md'>
              <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-6 h-6 text-white'
                >
                  <path d='M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z' />
                  <path
                    fillRule='evenodd'
                    d='M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z'
                    clipRule='evenodd'
                  />
                  <path d='M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z' />
                </svg>
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Today Total Expenses
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  ₹ 87283489
                </h4>
              </div>
              <div className='border-t border-blue-gray-50 p-4'>
                <p className='block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600'>
                  <strong className='text-green-500'>+55%</strong>&nbsp;than
                  last week
                </p>
              </div>
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-6 h-6 text-white'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Total Registered Users
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  2,300
                </h4>
              </div>
              <div className='border-t border-blue-gray-50 p-4'>
                <p className='block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600'>
                  {/* <strong className='text-green-500'>+3%</strong>&nbsp;than last
                  month */}
                </p>
              </div>
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-6 h-6 text-white'
                >
                  <path d='M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z' />
                </svg>
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Active User
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  3,462
                </h4>
              </div>
              <div className='border-t border-blue-gray-50 p-4'>
                <p className='block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600'></p>
              </div>
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center'>
                <GoGoal className='w-6 h-6' />
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Total Goals Completed
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  3,462
                </h4>
              </div>
              <div className='border-t border-blue-gray-50 p-4'>
                <p className='block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600'>
                  <strong className='text-green-500'>+50%</strong>&nbsp;tof
                  goals completed!
                </p>
              </div>
            </div>
          </div>
          <div className='container mx-auto p-4'>
            <div className='flex flex-col gap-6'>
              {/* Card Container */}
              <div className='relative flex flex-col bg-white rounded-xl shadow-md'>
                {/* Header */}
                <div className='flex items-center justify-between p-4 border-b'>
                  <h6 className='text-base lg:text-lg font-semibold text-blue-gray-900'>
                    Top-10 Expenses for This Month
                  </h6>
                  <button
                    aria-expanded='false'
                    aria-haspopup='menu'
                    className='w-8 h-8 rounded-lg text-blue-gray-500 hover:bg-blue-gray-50'
                    type='button'
                    aria-label='Options'
                  >
                    ⋮
                  </button>
                </div>

                {/* Table */}
                <div className='p-4 overflow-x-auto'>
                  <table className='w-full table-auto text-left text-sm sm:text-base'>
                    {/* Table Head */}
                    <thead>
                      <tr className='text-blue-gray-400 text-xs uppercase'>
                        <th className='py-2 px-4 sm:py-3 sm:px-6 border-b'>
                          Rank
                        </th>
                        <th className='py-2 px-4 sm:py-3 sm:px-6 border-b'>
                          Amount
                        </th>
                        <th className='py-2 px-4 sm:py-3 sm:px-6 border-b'>
                          Category
                        </th>
                        <th className='py-2 px-4 sm:py-3 sm:px-6 border-b'>
                          Progress
                        </th>
                        <th className='py-2 px-4 sm:py-3 sm:px-6 border-b'>
                          Description
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {[
                        {
                          amount: '$14,000',
                          category: 'Material XD Version',
                          progress: 60,
                          description: 'Design improvements'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        },
                        {
                          amount: '$3,000',
                          category: 'Add Progress Track',
                          progress: 10,
                          description: 'Feature update'
                        }
                      ].map((item, index) => (
                        <tr
                          key={index}
                          className='text-blue-gray-600 text-xs sm:text-sm hover:bg-gray-50'
                        >
                          <td className='py-2 px-4 sm:py-3 sm:px-5 border-b'>
                            {index + 1}
                          </td>

                          {/* Amount */}
                          <td className='py-2 px-4 sm:py-3 sm:px-5 border-b'>
                            {item.amount}
                          </td>

                          {/* Category */}
                          <td className='py-2 px-4 sm:py-3 sm:px-5 border-b font-bold'>
                            {item.category}
                          </td>

                          {/* Progress */}
                          <td className='py-2 px-4 sm:py-3 sm:px-5 border-b'>
                            <div className='w-full'>
                              <p className='mb-1 text-xs'>{item.progress}%</p>
                              <div className='w-full bg-blue-gray-50 h-1 rounded'>
                                <div
                                  className='bg-gradient-to-tr from-blue-600 to-blue-400 h-full'
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Description */}
                          <td className='py-2 px-4 sm:py-3 sm:px-5 border-b'>
                            {item.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
