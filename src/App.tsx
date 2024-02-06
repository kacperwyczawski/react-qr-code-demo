import { useState } from 'react'
import './App.css'
// @ts-ignore
import QrReader from 'react-qr-scanner'

export default function App() {
  const employees = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
    { id: 2, firstName: 'Anna', lastName: 'Smith', age: 35 },
    { id: 3, firstName: 'Peter', lastName: 'Jones', age: 45 },
    { id: 4, firstName: 'Katy', lastName: 'Johnson', age: 55 }
  ]
  const [data, setData] = useState('No result')
  const selectedEmployee = employees.find((employee) => employee.id === Number(data))

  return (
    <>
      {data === 'No result' ? (
        <QrReader
          onScan={(capturedData: any) => {
            setData(capturedData?.text ?? 'No result')
            console.info(capturedData?.text ? `Captured id ${capturedData.text}` : 'No result')
          }}
          onError={(error: any) => {
            console.error(error)
          }}
          delay={1000}
        />
      ) : (selectedEmployee ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedEmployee.id}</td>
              <td>{selectedEmployee.firstName}</td>
              <td>{selectedEmployee.lastName}</td>
              <td>{selectedEmployee.age}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>
          Employee with id {data} does not exist
        </p>
      ))}
      
      <aside>
        Available employees: [ {employees.map((employee) => employee.id).join(', ')} ]
      </aside>
    </>
  )
}
