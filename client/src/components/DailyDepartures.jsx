import { useState, useEffect } from "react";

const DailyDepartures = () => {
  const [selectedAirport, setSelectedAirport] = useState("MAN");
  const [departuresByDay, setDeparturesByDay] = useState({});
  const [airports, setAirports] = useState([]);
  const [flightsData, setFlightsData] = useState([]);

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        setFlightsData(data);
        // get unique airports from api
        const uniqueAirportsSet = new Set(data.map((flight) => flight.depair));
        setAirports([...uniqueAirportsSet]);
        filterDeparturesByAirport(selectedAirport, data);
      })
      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  }, []);

  // re-fetch data when selected airport changes
  useEffect(() => {
        filterDeparturesByAirport(selectedAirport);
      }, [selectedAirport, flightsData]);

  const filterDeparturesByAirport = (airport) => {
    const departuresFromSelectedAirport = flightsData.filter(
      (flight) => flight.depair === airport
    );

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
      const dayOfWeek = departureDate.toLocaleDateString("en-GB", {
        weekday: "long",
      });
      numOfDeparturesPerDay[dayOfWeek]++;
    });

    setDeparturesByDay(numOfDeparturesPerDay);
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
// todo: any libraries to improve display of data?
// todo: make dropdown a reusable component?
