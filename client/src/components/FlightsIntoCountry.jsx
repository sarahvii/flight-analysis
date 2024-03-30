import { useState, useEffect } from "react";
import airportData from "aircodes";

const FlightsIntoCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState("Sweden");
  const [percentageOfFlights, setPercentageOfFlights] = useState(null);
  const countries = ["Sweden", "Australia", "Spain", "United Arab Emirates"];

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        const numOfFlights = data.length;
        // filter flights where destination airport is in selected country
        const flightsIntoSelectedCountry = data.filter((flight) => {
          const airport = airportData.getAirportByIata(flight.destair);
          return airport && airport.country === selectedCountry;
        }).length;

        // calculate percentage of flights into selected country
        const percentage = (flightsIntoSelectedCountry / numOfFlights) * 100;
        setPercentageOfFlights(percentage.toFixed(2));
      })
      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      <h2>
        Flights into {selectedCountry}
      </h2>
      <select value={selectedCountry} onChange={handleCountryChange}>
        {countries.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      {percentageOfFlights !== null ? (
        <p>
          {percentageOfFlights}% of flights fly into {selectedCountry}
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default FlightsIntoCountry;

// todo: convert percentages to percentages of country rather than airport
