import { useState } from "react";

const AverageJourneyTime = () => {
  const [averageTime, setAverageTime] = useState(null);
  const [journeyDeparture, setJourneyDeparture] = useState("");
  const [journeyDestination, setJourneyDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch data from API
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        // filter data to return relevant flights
        const relevantFlights = data.filter(
          (flight) =>
            (flight.depair === journeyDeparture &&
              flight.destair === journeyDestination) ||
            (flight.depair === journeyDestination &&
              flight.destair === journeyDeparture)
        );
        // use reduce function to calculate flight time of each relevant flight and store as total
        const totalJourneyTime = relevantFlights.reduce((acc, flight) => {
          const departureDateTime =
            flight.depair === journeyDeparture
              ? `${flight.outdepartdate}T${flight.outdeparttime}`
              : `${flight.indepartdate}T${flight.indeparttime}`;
          const arrivalDateTime =
            flight.depair === journeyDeparture
              ? `${flight.outarrivaldate}T${flight.outarrivaltime}`
              : `${flight.inarrivaldate}T${flight.inarrivaltime}`;

          const departure = new Date(departureDateTime);
          const arrival = new Date(arrivalDateTime);
          return acc + (arrival - departure) / 3600000;
        }, 0);

        // calculate the average and set in state
        const average = relevantFlights.length
          ? totalJourneyTime / relevantFlights.length
          : 0;
        console.log("Average journey time:", average);
        setAverageTime(average);
      })
      .catch((error) => {
        console.error("Failed to fetch flight details", error);
      });
  };
  return (
    <div>
      <h2>Average Journey Time</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={journeyDeparture}
          onChange={(e) => setJourneyDeparture(e.target.value.toUpperCase())}
          placeholder="LHR"
          required
        />
        <input
          type="text"
          value={journeyDestination}
          onChange={(e) => setJourneyDestination(e.target.value.toUpperCase())}
          placeholder="DXB"
          required
        />
        <button type="submit">Calculate</button>
      </form>
      <p>{averageTime ? `${averageTime.toFixed(2)} hours` : ""}</p>
    </div>
  );
};

export default AverageJourneyTime;

// note: current calculations do not take timezones into account so are incorrect
// todo: update relevant flights to include: incoming flights & segments which include relevant flights
// todo: change search bar to dropdown list?
// todo: offset timezones - use air-codes to get city from airport, city-timezone to get timezone from city, and date-fns-tz to convert to UTC.
