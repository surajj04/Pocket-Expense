import React, { useState } from 'react'
import ImportStatementDashboard from '../components/ImportStatementDashboard'
import StatementForm from './StatementForm'

function ImportStatements () {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))

  const onHandleNewStatement = () => {
    setData(null)
    localStorage.removeItem('data')
  }

  return (
    <div>
      {!data ? (
        <StatementForm />
      ) : (
        <ImportStatementDashboard
          data={data}
          onUploadNewStatement={onHandleNewStatement}
        />
      )}
    </div>
  )
}

export default ImportStatements
