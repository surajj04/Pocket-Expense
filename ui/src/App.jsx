import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {
  BarChart2,
  FileText,
  Home,
  MessageSquare,
  PlusCircle,
  ScrollText,
  Target,
  User,
  Wallet
} from 'lucide-react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './secure/Dashboard'
import AddExpense from './secure/AddExpense'
import Budget from './secure/Budget'
import Expenses from './secure/Expenses'
import Reports from './secure/Reports'
import Goals from './secure/Goals'
import Assistant from './secure/Assistant'
import Profile from './secure/Profile'
import Register from './pages/Register'
import BudgetSetupPage from './secure/BudgetSetup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/userSlice'
import NotFound from './components/NotFound'
import ImportStatements from './secure/ImportStatements'

function App () {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      dispatch(login(storedUser))
    }
  }, [dispatch])

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/add-expense', icon: PlusCircle, label: 'Add Expense' },
    {
      href: '/import-statements',
      icon: ScrollText,
      label: 'Import Statements'
    },
    { href: '/budget', icon: Wallet, label: 'Budget' },
    { href: '/expenses', icon: FileText, label: 'Expenses' },
    { href: '/reports', icon: BarChart2, label: 'Reports' },
    { href: '/goals', icon: Target, label: 'Savings Goals' },
    { href: '/assistant', icon: MessageSquare, label: 'Assistant' },
    { href: '/profile', icon: User, label: 'Profile' }
  ]

  // const stateCityMap = {
  //   India: {
  //     states: [
  //       'Andhra Pradesh',
  //       'Arunachal Pradesh',
  //       'Assam',
  //       'Bihar',
  //       'Chhattisgarh',
  //       'Goa',
  //       'Gujarat',
  //       'Haryana',
  //       'Himachal Pradesh',
  //       'Jharkhand',
  //       'Karnataka',
  //       'Kerala',
  //       'Madhya Pradesh',
  //       'Maharashtra',
  //       'Manipur',
  //       'Meghalaya',
  //       'Mizoram',
  //       'Nagaland',
  //       'Odisha',
  //       'Punjab',
  //       'Rajasthan',
  //       'Sikkim',
  //       'Tamil Nadu',
  //       'Telangana',
  //       'Tripura',
  //       'Uttar Pradesh',
  //       'Uttarakhand',
  //       'West Bengal'
  //     ],
  //     cities: {
  //       'Andhra Pradesh': [
  //         'Visakhapatnam',
  //         'Vijayawada',
  //         'Guntur',
  //         'Kurnool',
  //         'Rajahmundry',
  //         'Nellore',
  //         'Tirupati',
  //         'Chittoor'
  //       ],
  //       'Arunachal Pradesh': [
  //         'Itanagar',
  //         'Tawang',
  //         'Ziro',
  //         'Bomdila',
  //         'Tezpur',
  //         'Naharlagun',
  //         'Pasighat'
  //       ],
  //       Assam: [
  //         'Guwahati',
  //         'Dibrugarh',
  //         'Jorhat',
  //         'Nagaon',
  //         'Silchar',
  //         'Tezpur',
  //         'Dhulia',
  //         'Tinsukia',
  //         'Jorhat'
  //       ],
  //       Bihar: [
  //         'Patna',
  //         'Gaya',
  //         'Bhagalpur',
  //         'Muzaffarpur',
  //         'Munger',
  //         'Darbhanga',
  //         'Purnia',
  //         'Begusarai',
  //         'Chapra'
  //       ],
  //       Chhattisgarh: [
  //         'Raipur',
  //         'Bilaspur',
  //         'Durg',
  //         'Korba',
  //         'Jagdalpur',
  //         'Raigarh',
  //         'Rajnandgaon'
  //       ],
  //       Goa: [
  //         'Panaji',
  //         'Vasco da Gama',
  //         'Margao',
  //         'Mapusa',
  //         'Pernem',
  //         'Bicholim',
  //         'Cortalim'
  //       ],
  //       Gujarat: [
  //         'Ahmedabad',
  //         'Surat',
  //         'Vadodara',
  //         'Rajkot',
  //         'Bhavnagar',
  //         'Jamnagar',
  //         'Junagadh',
  //         'Anand',
  //         'Gandhinagar',
  //         'Vapi'
  //       ],
  //       Haryana: [
  //         'Chandigarh',
  //         'Gurgaon',
  //         'Faridabad',
  //         'Hisar',
  //         'Ambala',
  //         'Rohtak',
  //         'Panipat',
  //         'Sonipat',
  //         'Karnal'
  //       ],
  //       'Himachal Pradesh': [
  //         'Shimla',
  //         'Manali',
  //         'Kullu',
  //         'Dharamshala',
  //         'Solan',
  //         'Kangra',
  //         'Mandi',
  //         'Hamirpur'
  //       ],
  //       Jharkhand: [
  //         'Ranchi',
  //         'Jamshedpur',
  //         'Dhanbad',
  //         'Bokaro',
  //         'Hazaribagh',
  //         'Giridih',
  //         'Deoghar',
  //         'Dumka',
  //         'Chaibasa'
  //       ],
  //       Karnataka: [
  //         'Bengaluru',
  //         'Mysore',
  //         'Hubli',
  //         'Mangalore',
  //         'Tumkur',
  //         'Belagavi',
  //         'Davangere',
  //         'Bellary',
  //         'Mandya',
  //         'Chikmagalur'
  //       ],
  //       Kerala: [
  //         'Thiruvananthapuram',
  //         'Kochi',
  //         'Kozhikode',
  //         'Kollam',
  //         'Thrissur',
  //         'Kottayam',
  //         'Alappuzha',
  //         'Pathanamthitta',
  //         'Palakkad'
  //       ],
  //       'Madhya Pradesh': [
  //         'Bhopal',
  //         'Indore',
  //         'Gwalior',
  //         'Ujjain',
  //         'Jabalpur',
  //         'Sagar',
  //         'Satna',
  //         'Ratlam',
  //         'Mandsaur',
  //         'Dewas'
  //       ],
  //       Maharashtra: [
  //         'Mumbai',
  //         'Pune',
  //         'Nagpur',
  //         'Nashik',
  //         'Aurangabad',
  //         'Thane',
  //         'Nanded',
  //         'Solapur',
  //         'Kolhapur',
  //         'Jalgaon'
  //       ],
  //       Manipur: [
  //         'Imphal',
  //         'Thoubal',
  //         'Kakching',
  //         'Chandel',
  //         'Ukhrul',
  //         'Senapati',
  //         'Bishnupur'
  //       ],
  //       Meghalaya: [
  //         'Shillong',
  //         'Tura',
  //         'Jowai',
  //         'Nongstoin',
  //         'Williamnagar',
  //         'Mawlai'
  //       ],
  //       Mizoram: [
  //         'Aizawl',
  //         'Lunglei',
  //         'Champhai',
  //         'Kolasib',
  //         'Mamit',
  //         'Serchhip'
  //       ],
  //       Nagaland: [
  //         'Kohima',
  //         'Dimapur',
  //         'Mokokchung',
  //         'Mon',
  //         'Wokha',
  //         'Zunheboto'
  //       ],
  //       Odisha: [
  //         'Bhubaneswar',
  //         'Cuttack',
  //         'Rourkela',
  //         'Berhampur',
  //         'Sambalpur',
  //         'Balasore',
  //         'Puri',
  //         'Angul',
  //         'Rayagada'
  //       ],
  //       Punjab: [
  //         'Amritsar',
  //         'Ludhiana',
  //         'Jalandhar',
  //         'Patiala',
  //         'Mohali',
  //         'Bathinda',
  //         'Moga',
  //         'Hoshiarpur',
  //         'Pathankot'
  //       ],
  //       Rajasthan: [
  //         'Jaipur',
  //         'Udaipur',
  //         'Jodhpur',
  //         'Kota',
  //         'Ajmer',
  //         'Bikaner',
  //         'Alwar',
  //         'Nagaur',
  //         'Sikar',
  //         'Pali'
  //       ],
  //       Sikkim: ['Gangtok', 'Jorethang', 'Namchi', 'Mangan', 'Rangpo'],
  //       'Tamil Nadu': [
  //         'Chennai',
  //         'Coimbatore',
  //         'Madurai',
  //         'Salem',
  //         'Tiruchirappalli',
  //         'Erode',
  //         'Vellore',
  //         'Dindigul',
  //         'Tirunelveli'
  //       ],
  //       Telangana: [
  //         'Hyderabad',
  //         'Warangal',
  //         'Karimnagar',
  //         'Khammam',
  //         'Nizamabad',
  //         'Mahabubnagar',
  //         'Nalgonda'
  //       ],
  //       Tripura: ['Agartala', 'Udaipur', 'Dharmanagar', 'Sabroom'],
  //       'Uttar Pradesh': [
  //         'Lucknow',
  //         'Kanpur',
  //         'Agra',
  //         'Varanasi',
  //         'Ghaziabad',
  //         'Meerut',
  //         'Allahabad',
  //         'Mathura',
  //         'Aligarh',
  //         'Bareilly'
  //       ],
  //       Uttarakhand: [
  //         'Dehradun',
  //         'Haridwar',
  //         'Nainital',
  //         'Rishikesh',
  //         'Roorkee',
  //         'Haldwani',
  //         'Kashipur'
  //       ],
  //       'West Bengal': [
  //         'Kolkata',
  //         'Darjeeling',
  //         'Siliguri',
  //         'Durgapur',
  //         'Asansol',
  //         'Howrah',
  //         'Kolar',
  //         'Kanchrapara',
  //         'Malda'
  //       ]
  //     }
  //   }
  // }

  return (
    <div className=''>
      <div className=''>
        <div className='flex h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
          {user && <Navbar navItems={navItems} />}
          <main className='flex-1 overflow-y-auto p-8 max-sm:p-0 pb-20 md:pb-8'>
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Login />} />
              <Route
                path='/add-expense'
                element={user ? <AddExpense /> : <Login />}
              />
              <Route path='/budget' element={user ? <Budget /> : <Login />} />
              <Route
                path='/expenses'
                element={user ? <Expenses /> : <Login />}
              />
              <Route path='/reports' element={user ? <Reports /> : <Login />} />
              <Route path='/goals' element={user ? <Goals /> : <Login />} />
              <Route
                path='/assistant'
                element={user ? <Assistant /> : <Login />}
              />
              <Route path='/profile' element={user ? <Profile /> : <Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/budget-setup'
                element={user ? <BudgetSetupPage /> : <Login />}
              />
              <Route
                path='/import-statements'
                element={user ? <ImportStatements /> : <Login />}
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
