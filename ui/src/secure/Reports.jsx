import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import { useSelector } from 'react-redux'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']

export default function ReportsPage () {
  const [activeTab, setActiveTab] = useState('monthly')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const user = useSelector(state => state.user.user)

  const [reportData, setReportData] = useState(user?.budgets || [])

  useEffect(() => {
    if (user?.budgets) {
      setReportData(user.budgets)
    }
  }, [user])

  const filteredData = reportData.filter(
    item => new Date(item.date).getFullYear() === selectedYear
  )

  const noDataForYear = filteredData.length === 0

  const monthlyData = filteredData.map(item => ({
    name: new Date(item.date).toLocaleString('default', { month: 'short' }),
    amount: item.monthlyBudget - item.currentBalance
  }))

  const latestReport = filteredData[0] || {}

  const categoryData = [
    { name: 'Food', value: user?.totalExpense?.food || 0 },
    { name: 'Travel', value: user?.totalExpense?.travel || 0 },
    { name: 'Shopping', value: user?.totalExpense?.shopping || 0 },
    { name: 'Bills', value: user?.totalExpense?.bills || 0 },
    { name: 'Other', value: user?.totalExpense?.other || 0 }
  ]

  const weeklyExpenses = user?.expenses || []
  const weeklyHighlights = weeklyExpenses.slice(-4).map(expense => (
    <li key={expense.expenseId}>
      {expense.category}: ₹{expense.amount} - {expense.description}
    </li>
  ))

  const availableYears = Array.from(
    new Set(user?.budgets?.map(item => new Date(item.date).getFullYear()))
  ).sort((a, b) => b - a) // Sort years in descending order

  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl md:text-4xl max-sm:mx-3 font-bold text-violet-900 mb-6 mt-5 max-sm:text-center'>
        Reports
      </h1>

      <div className='mb-6'>
        <label htmlFor='year-selector' className='font-semibold mr-4'>
          Select Year:
        </label>
        <select
          id='year-selector'
          className='p-2 border rounded-md'
          value={selectedYear}
          onChange={e => setSelectedYear(parseInt(e.target.value))}
        >
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='monthly'>Monthly Report</TabsTrigger>
          <TabsTrigger value='weekly'>Weekly Highlights</TabsTrigger>
        </TabsList>
        <TabsContent value='monthly'>
          <div className='space-y-8'>
            {noDataForYear ? (
              <Card>
                <CardHeader>
                  <CardTitle>No data available for {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-center'>
                    There is no report data for the selected year.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Spending Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width='100%' height={300}>
                      <LineChart data={monthlyData}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type='monotone'
                          dataKey='amount'
                          stroke='#8884d8'
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className='max-sm:mb-24'>
                  <CardHeader>
                    <CardTitle>Overall Spending by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width='100%' height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx='50%'
                          cy='50%'
                          labelLine={false}
                          outerRadius={80}
                          fill='#8884d8'
                          dataKey='value'
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value='weekly'>
          <Card>
            <CardHeader>
              <CardTitle>This Week's Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2'>{weeklyHighlights}</ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
