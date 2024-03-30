import "./App.css";
import AverageJourneyTime from "./components/AverageJourneyTime";
import ClassProportion from "./components/ClassProportion";
import DailyDepartures from "./components/DailyDepartures";
import FlightsIntoCountry from "./components/FlightsIntoCountry";

function App() {
  return (
    <>
      <div>
        <h1>Travel App</h1>
      </div>
      <div>
        <AverageJourneyTime />
        <DailyDepartures />
        <ClassProportion />
        <FlightsIntoCountry />
      </div>
    </>
  );
}

export default App;
