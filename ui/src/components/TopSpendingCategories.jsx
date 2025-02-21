import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE']

const TopSpendingCategories = ({ topSpendings }) => {
  if (!topSpendings || topSpendings.length === 0) {
    return <p className='text-gray-500 text-center'>No data available</p>
  }

  // Convert incoming data to match Recharts format
  const formattedData = topSpendings.map(item => ({
    name: item.category,
    value: item.amount
  }))

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        Top Spending Categories
      </h2>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(1)}%)`
            }
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={value => `₹${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TopSpendingCategories
