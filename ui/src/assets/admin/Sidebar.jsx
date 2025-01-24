import React, { useState } from 'react'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { TbReportSearch } from 'react-icons/tb'

function Sidebar ({ switchTab }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(1)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {/* Toggle Button */}
      <button
        className='fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 xl:hidden'
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='currentColor'
            aria-hidden='true'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='currentColor'
            aria-hidden='true'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-0 z-40 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-80'
        } xl:translate-x-0`}
      >
        <div className='relative border-b border-white/20'>
          <a className='flex items-center gap-4 py-6 px-8' href='#/'>
            <h6 className='block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white max-sm:mx-10'>
              Admin Dashboard
            </h6>
          </a>
        </div>
        <div className='m-4'>
          <ul className='mb-4 flex flex-col gap-1'>
            <li
              onClick={() => {
                setActiveTab(1)
                switchTab('Home')
              }}
            >
              <button
                className={`middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg shadow-md w-full flex items-center gap-4 px-4 capitalize ${
                  activeTab === 1
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]'
                    : 'text-white hover:bg-white/10 active:bg-white/30'
                }`}
                type='button'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-5 h-5 text-inherit'
                >
                  <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
                  <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
                </svg>
                <p className='block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize'>
                  Dashboard
                </p>
              </button>
            </li>
            <li
              onClick={() => {
                setActiveTab(2)
                switchTab('Download')
              }}
            >
              <button
                className={`middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  activeTab === 2
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]'
                    : 'text-white hover:bg-white/10 active:bg-white/30'
                }`}
                type='button'
              >
                <FaCloudDownloadAlt className='w-5 h-5' />
                <p className='block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize'>
                  Download Data
                </p>
              </button>
            </li>
            <li
              onClick={() => {
                setActiveTab(3)
                switchTab('Reports')
              }}
            >
              <button
                className={`middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  activeTab === 3
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]'
                    : 'text-white hover:bg-white/10 active:bg-white/30'
                }`}
                type='button'
              >
                <TbReportSearch className='w-5 h-5' />
                <p className='block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize'>
                  Reports
                </p>
              </button>
            </li>
          </ul>
          <ul className='mb-4 flex flex-col gap-1'>
            <li className='mx-3.5 mt-4 mb-2'>
              <p className='block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75'>
                Auth Pages
              </p>
            </li>
            <li>
              <button
                className='middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize'
                type='button'
              >
                <IoLogOutOutline className='w-5 h-5' />
                <p className='block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize'>
                  Logout
                </p>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
