import "./App.css";
import AverageJourneyTime from "./components/AverageJourneyTime";
import ClassProportion from "./components/ClassProportion";
import DailyDepartures from "./components/DailyDepartures";
import FlightsIntoCountry from "./components/FlightsIntoCountry";

function App() {
  return (
    <>
      <div className="header">
        <h1>Travel App</h1>
      </div>
      <div className="card-container">
        <div className="card">
          <AverageJourneyTime />
        </div>
        <div className="card">
          <DailyDepartures />
        </div>
        <div className="card">
          <ClassProportion />
        </div>
        <div className="card">
          <FlightsIntoCountry />
        </div>
      </div>
    </>
  );
}

export default App;
