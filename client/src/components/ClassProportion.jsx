import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const ClassProportion = () => {
  const [selectedClass, setSelectedClass] = useState("Business");
  const [flightClassOptions, setFlightClassOptions] = useState([
    "Economy",
    "Business",
    "First",
  ]);
  const [classProportions, setClassProportions] = useState([]);

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        const numOfFlights = data.length;
        const proportionsData = flightClassOptions.map((flightClass) => {
          const count = data.filter(
            (flight) => flight.outflightclass === flightClass
          ).length;
          return ((count / numOfFlights) * 100).toFixed(2);
        });
        setClassProportions(proportionsData);
      })

      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  }, []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const proportionOfSelected = classProportions[flightClassOptions.indexOf(selectedClass)];

  const backgroundColors = flightClassOptions.map((option) =>
    option === selectedClass ? "#ffa500" : "#9270ff"
  );

  const chartData = {
    labels: flightClassOptions,
    datasets: [
      {
        data: classProportions,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <h2>Proprotion of {selectedClass} Class Flights</h2>
      <select value={selectedClass} onChange={handleClassChange}>
        {flightClassOptions.map((flightClass) => (
          <option key={flightClass} value={flightClass}>
            {flightClass}
          </option>
        ))}
      </select>
      <div>
        <Doughnut data={chartData} />
      </div>
      {classProportions !== null ? (
        <p>
          {proportionOfSelected}% of flights are {selectedClass} class
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ClassProportion;

// note: outflightclass only
// todo: include inbound flights and amend calculation
// todo: get all classes from db to ensure proportion is correctly calcuated
