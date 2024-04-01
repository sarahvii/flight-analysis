import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const ClassProportion = () => {
  const [selectedClass, setSelectedClass] = useState("Business");
  const [flightClassOptions, setFlightClassOptions] = useState([]);
  const [classProportions, setClassProportions] = useState([]);

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        // get unique flight classes from data
        const classesSet = new Set(data.map((flight) => flight.outflightclass));
        const uniqueClasses = Array.from(classesSet).filter(Boolean);
        setFlightClassOptions(uniqueClasses);

        // calculate proportions for each class
        const totalCount = data.length;
        const proportions = uniqueClasses.map(flightClass => {
        const count = data.filter(flight => flight.outflightclass === flightClass).length;
        return ((count / totalCount) * 100).toFixed(2);
        });
                
        setClassProportions(proportions)
    })
    .catch((error) => {
    console.error("Failed to fetch flight data", error);
      });
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const proportionOfSelected =
    classProportions[flightClassOptions.indexOf(selectedClass)];

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
        spacing: 2,
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
// todo: fix issue with duplicate classes
