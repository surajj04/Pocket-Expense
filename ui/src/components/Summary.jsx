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

const Summary = ({ credit, debit }) => {
  const data = [
    { name: 'Income', amount: credit },
    { name: 'Expenses', amount: debit },
    { name: 'Net Balance', amount: (credit - debit).toFixed(2) }
  ]
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        Summary of Transactions
      </h2>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='amount' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Summary
