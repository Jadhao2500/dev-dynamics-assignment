import './App.css'
import sapmleData from "./sample-data.json"
import AnalyticalDashboard from '@pages/dashboard'

function App() {
  console.log({ sapmleData })
  return (
    <div>
      <AnalyticalDashboard />
    </div>
  )
}

export default App
