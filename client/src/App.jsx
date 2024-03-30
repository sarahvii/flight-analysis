
import './App.css'
import AverageJourneyTime from './components/AverageJourneyTime'
import ClassProportion from './components/ClassProportion'
import DailyDepartures from './components/DailyDepartures'

function App() {

  return (
    <>
      <div><h1>Travel App</h1></div>
      <div>
        <AverageJourneyTime/>
        <DailyDepartures/>
        <ClassProportion/>
      </div>
    </>
  )
}

export default App
