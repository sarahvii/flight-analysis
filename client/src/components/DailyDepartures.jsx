import { useState, useEffect } from "react";
import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";

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

  // for chart
  const chartData = {
    labels: Object.keys(departuresByDay),
    datasets: [
      {
        label: `Daily Departures from ${selectedAirport}`,
        data: Object.values(departuresByDay),
        backgroundColor: "#9270ff",
        hoverBackgroundColor: "#ffa500",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DailyDepartures;

// note: depair used - outgoing departures only
// note: considers all data across all time periods
// todo: breakdown by week or year?
// todo: make dropdown a reusable component?
// todo: add name of airport
// todo: highlight busiest day
// todo: if item has segments, use depcode, else use depair
