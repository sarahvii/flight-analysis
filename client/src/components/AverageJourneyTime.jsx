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
          (flight) => flight.depair === journeyDeparture && flight.destair === journeyDestination
        );
        // use reduce function to calculate the flight time of each relevant flight & store as total
        const totalJourneyTime = relevantFlights.reduce((acc, flight) => {
          const departureDateTime = `${flight.outdepartdate}T${flight.outdeparttime}`;
          const arrivalDateTime = `${flight.outarrivaldate}T${flight.outarrivaltime}`;
          console.log(
            "Departure:",
            departureDateTime,
            "Arrival:",
            arrivalDateTime
          );

          const departure = new Date(departureDateTime);
          const arrival = new Date(arrivalDateTime);
          return acc + (arrival - departure) / 3600000;
        }, 0);

        // calculate the average and set in state
        const average = totalJourneyTime / relevantFlights.length;
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
          onChange={(e) => setJourneyDeparture(e.target.value)}
          placeholder="LHR"
          required
        />
        <input
          type="text"
          value={journeyDestination}
          onChange={(e) => setJourneyDestination(e.target.value)}
          placeholder="DXB"
          required
        />
        <button type="submit">Calculate</button>
      </form>
      <p>
        {averageTime ? `${averageTime.toFixed(2)} hours` : ""}
      </p>
    </div>
  );
};

export default AverageJourneyTime;
