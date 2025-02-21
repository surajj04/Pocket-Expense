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

const HighValueTransactions = ({ highValueTransactions }) => {
  // Filtering only high-value transactions (above ₹1000)
  const filteredData = highValueTransactions.filter(txn => txn.amount > 1000)

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        High-Value Transactions
      </h2>
      {filteredData.length > 0 ? (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='description' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='amount' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className='text-gray-500 text-center'>No high-value transactions</p>
      )}
    </div>
  )
}

export default HighValueTransactions
