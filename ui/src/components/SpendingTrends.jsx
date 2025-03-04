import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const SpendingTrends = ({ dailyTrends }) => {
  // Convert dailyTrends object into an array for recharts
  const data = Object.keys(dailyTrends).map(day => ({
    name: day.substring(0, 3), // Shorten day names (Mon, Tue, etc.)
    amount: dailyTrends[day].totalTransactions
  }))

  // Calculate daily average spending
  const totalSpending = data.reduce((sum, day) => sum + day.amount, 0)
  const dailyAverage = totalSpending / data.length

  // Find the day with max spending
  const maxSpendingDay = data.reduce(
    (max, day) => (day.amount > max.amount ? day : max),
    { name: '', amount: 0 }
  )

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        Spending Trends
      </h2>
      <p className='mb-2'>
        Your daily average spending is{' '}
        <span className='font-bold'>₹{dailyAverage.toFixed(2)}</span>
      </p>
      <p className='mb-4'>
        You spend the most on{' '}
        <span className='font-bold'>{maxSpendingDay.name || 'N/A'}</span>
      </p>
      <ResponsiveContainer width='100%' height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='amount'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingTrends
