import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const MonthlyExpenses = ({ expenses }) => {
  // Convert full month names to short forms and map data properly
  const formattedData = expenses.map(item => ({
    month: item.month.substring(0, 3), // Convert "January" to "Jan"
    Food: item.food,
    Shopping: item.shopping,
    Travel: item.travel,
    Bills: item.bills,
    Entertainment: item.entertainment,
    Other: item.other
  }))

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        Monthly Expense Breakdown
      </h2>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='Food' stroke='#8884d8' />
          <Line type='monotone' dataKey='Shopping' stroke='#82ca9d' />
          <Line type='monotone' dataKey='Travel' stroke='#ff7300' />
          <Line type='monotone' dataKey='Bills' stroke='#ffc658' />
          <Line type='monotone' dataKey='Entertainment' stroke='#00C49F' />
          <Line type='monotone' dataKey='Other' stroke='#FF8042' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyExpenses
