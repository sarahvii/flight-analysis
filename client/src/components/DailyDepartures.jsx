import { useState, useEffect } from "react";

const DailyDepartures = () => {
  const [selectedAirport, setSelectedAirport] = useState("MAN");
  const [departuresByDay, setDeparturesByDay] = useState({});
  const [airports, setAirports] = useState(["MAN", "LHR", "JFK"]);

  // call function when selected airport changes
  useEffect(() => {
    fetchDeparturesByDay(selectedAirport);
  }, [selectedAirport]);

  const fetchDeparturesByDay = (selectedAirport) => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // filter data to return flights from selected airport
        const departuresFromSelectedAirport = data.filter(
          (flight) => flight.depair === selectedAirport
        );
        // initialise counter for departures per day
        const numOfDeparturesPerDay = {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0,
        };

        departuresFromSelectedAirport.forEach((flight) => {
          const departureDate = new Date(flight.outdepartdate);
          console.log(departureDate);
          const dayOfWeek = departureDate.toLocaleDateString("en-GB", {
            weekday: "long",
          });
          numOfDeparturesPerDay[dayOfWeek]++;
        });

        setDeparturesByDay(numOfDeparturesPerDay);
      })
      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  };

  const handleAirportChange = (e) => {
    setSelectedAirport(e.target.value);
  };

  return (
    <div>
      <h2>Daily Departures from {selectedAirport}</h2>
      <select value={selectedAirport} onChange={handleAirportChange}>
        {airports.map((airport) => (
          <option key={airport} value={airport}>
            {airport}
          </option>
        ))}
      </select>
      <ul>
        {Object.entries(departuresByDay).map(([day, count]) => (
          <li key={day}>
            {day}: {count} flights
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyDepartures;

// note: outgoing departures only
// todo: create function to setAirports based on data from API
// todo: any libraries to improve display of data?
// todo: make dropdown a reusable component?