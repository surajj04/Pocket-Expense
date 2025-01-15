import React, { useEffect, useMemo, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import axios from 'axios'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const ExpenseReport = () => {
  const [expensesData, setExpenseData] = useState([])

  useEffect(() => {
    const fetchUserDetail = async () => {
      const userToken = localStorage.getItem('userToken')
      if (!userToken) {
        alert('No user token found. Please log in.')
        return
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/userDetail/${userToken}`
        )
        setExpenseData(response.data.expenses)
      } catch (error) {
        console.error('Error fetching user details:', error)
        alert('Failed to load user data. Please try again later.')
      }
    }

    fetchUserDetail()
  }, [])

  const [selectedMonth, setSelectedMonth] = useState('All')

  const getMonthName = monthIndex =>
    new Date(2025, monthIndex).toLocaleString('default', { month: 'long' })

  const filteredExpenses = useMemo(() => {
    if (selectedMonth === 'All') return expensesData

    return expensesData.filter(expense => {
      const expenseMonth = new Date(expense.date).getMonth()
      return getMonthName(expenseMonth) === selectedMonth
    })
  }, [selectedMonth, expensesData])

  const monthlyExpenses = useMemo(() => {
    return filteredExpenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      })
      if (!acc[month]) acc[month] = 0
      acc[month] += expense.amount
      return acc
    }, {})
  }, [filteredExpenses])

  const categoryWiseExpenses = useMemo(() => {
    return filteredExpenses.reduce((acc, expense) => {
      const category = expense.category
      if (!acc[category]) acc[category] = 0
      acc[category] += expense.amount
      return acc
    }, {})
  }, [filteredExpenses])

  const monthlyChartData = {
    labels: Object.keys(monthlyExpenses),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyExpenses),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const categoryChartData = {
    labels: Object.keys(categoryWiseExpenses),
    datasets: [
      {
        data: Object.values(categoryWiseExpenses),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4
      }
    ]
  }

  const downloadReport = async () => {
    const doc = new jsPDF()
    doc.setFont('Arial', 'normal') // Try Arial first for better support for ₹
    doc.setFontSize(16)

    // Get the current date and format it
    const currentDate = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    doc.text('Expense Report & Analysis', 20, 20)
    doc.text(`Date: ${currentDate}`, 20, 30) // Add the current date to the header

    try {
      const monthsData = Object.keys(monthlyExpenses).map(month => ({
        month,
        totalExpenses: monthlyExpenses[month],
        expenses: filteredExpenses
          .filter(
            expense =>
              new Date(expense.date).toLocaleString('default', {
                month: 'long',
                year: 'numeric'
              }) === month
          )
          .map(expense => ({
            date: new Date(expense.date).toLocaleDateString('en-GB'), // Format the expense date
            category: expense.category,
            amount: expense.amount,
            description: expense.description
          }))
      }))

      for (let i = 0; i < monthsData.length; i++) {
        const monthData = monthsData[i]
        if (i > 0) doc.addPage()
        doc.setFontSize(14)
        doc.setFont('Arial', 'normal') // Ensure Arial is used for better character support
        doc.text(`${monthData.month} - Expense Summary`, 20, 40)

        doc.setFontSize(12)
        doc.setFont('Arial', 'normal')
        doc.text(`Total Expenses: INR ${monthData.totalExpenses}`, 20, 50) // ₹ symbol in total expenses

        // Table headers
        doc.setFontSize(10)
        doc.setFont('Arial', 'normal')
        doc.text('Date', 20, 60)
        doc.text('Category', 50, 60)
        doc.text('Amount (INR)', 120, 60)
        doc.text('Details', 170, 60)

        doc.setLineWidth(0.5)
        doc.line(20, 62, 190, 62)

        let yOffset = 70
        monthData.expenses.forEach(item => {
          doc.text(item.date, 20, yOffset) // Include the expense date
          doc.text(item.category, 50, yOffset)
          doc.text(`${item.amount.toFixed(2)}`, 120, yOffset) // ₹ symbol in the amount
          doc.text(item.description, 170, yOffset)
          yOffset += 8
        })

        yOffset += 15

        const chartCanvas = document.getElementById(
          `pieChart_${monthData.month.replace(/\s+/g, '_')}`
        )
        if (chartCanvas) {
          const chartImage = await html2canvas(chartCanvas, { scale: 2 })
          doc.addImage(
            chartImage.toDataURL('image/png'),
            'PNG',
            20,
            yOffset,
            170,
            90
          )
        }

        yOffset += 100
      }

      doc.save('Expense_Report.pdf')
    } catch (error) {
      console.error('Error generating PDF report:', error)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center text-gray-900 mb-6'>
        Expense Report & Analysis
      </h1>

      <div className='mb-6'>
        <label
          htmlFor='monthSelect'
          className='block text-lg font-medium text-gray-700'
        >
          Select Month:
        </label>
        <select
          id='monthSelect'
          className='mt-2 block w-full border border-gray-300 rounded-lg p-2'
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          <option value='All'>All</option>
          {[...Array(12)].map((_, index) => (
            <option key={index} value={getMonthName(index)}>
              {getMonthName(index)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={downloadReport}
        className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg mb-4'
      >
        Download Report as PDF
      </button>

      <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Monthly Expenses
        </h2>
        <div
          id='monthlyChart'
          className='w-full max-w-6xl mx-auto'
          style={{ position: 'relative', height: '300px' }}
        >
          <Bar
            data={monthlyChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Monthly Expenses'
                },
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              }
            }}
          />
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Category-wise Expenses
        </h2>
        <div
          id='categoryChart'
          className='w-full max-w-6xl mx-auto'
          style={{ position: 'relative', height: '300px' }}
        >
          <Pie
            id={`pieChart_${selectedMonth.replace(/\s+/g, '_')}`}
            data={categoryChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Category-wise Expenses'
                },
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExpenseReport
