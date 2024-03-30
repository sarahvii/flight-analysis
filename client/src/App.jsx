
import './App.css'
import AverageJourneyTime from './components/AverageJourneyTime'
import DailyDepartures from './components/DailyDepartures'

function App() {

  return (
    <>
      <div><h1>Travel App</h1></div>
      <div>
        <AverageJourneyTime/>
        <DailyDepartures/>
      </div>
    </>
  )
}

export default App
