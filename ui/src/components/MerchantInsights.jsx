import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useState } from 'react'

const MerchantInsights = ({ merchantInsights }) => {
  const [search, setSearch] = useState('')

  if (!merchantInsights || merchantInsights.length === 0) {
    return <p className='text-gray-500 text-center'>No data available</p>
  }

  // Convert incoming data to match Recharts format
  const formattedData = merchantInsights.map(item => ({
    name: item.merchant,
    amount: item.totalSpent
  }))

  // Filter merchants based on search input
  const filteredData = formattedData.filter(merchant =>
    merchant.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        Merchant Insights
      </h2>
      <input
        type='text'
        placeholder='Search merchants'
        className='w-full p-2 mb-4 border rounded-md'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={filteredData} layout='vertical'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' />
          <YAxis dataKey='name' type='category' />
          <Tooltip formatter={value => `₹${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey='amount' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MerchantInsights
