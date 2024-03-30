import { useState, useEffect } from "react";

const ClassProportion = () => {
  const [selectedClass, setSelectedClass] = useState("Business");
  const [flightClassOptions, setFlightClassOptions] = useState([
    "Economy",
    "Business",
    "First",
  ]);
  const [classProportion, setClassProportion] = useState(null);

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        const numOfFlights = data.length;
        const numOfSelectedClassFlights = data.filter(
          (flight) => flight.outflightclass === selectedClass
        ).length;
        // calculate proportion of flights for selected class
        const proportion = (numOfSelectedClassFlights / numOfFlights) * 100;
        setClassProportion(proportion.toFixed(2));
      })
      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
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
      {classProportion !== null ? (
        <p>
          {classProportion}% of flights are {selectedClass} class
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
// todo: display as appropriate chart - pie chart?
