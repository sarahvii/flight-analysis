import { useState, useEffect } from "react";
import airportData from "aircodes";

const FlightsIntoCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState("Sweden");
  const [flightsData, setFlightData] = useState({
    countries: [],
    percentages: [],
  });

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        const countryData = {};

        // group data by country name and count flights in each group
        data.forEach((flight) => {
          const airport = airportData.getAirportByIata(flight.destair);
          if (airport && airport.country) {
            countryData[airport.country] =
              (countryData[airport.country] || 0) + 1;
          }
        });

        const numOfFlights = data.length;

        // extract all keys from countryData object as an array of strings
        const countries = Object.keys(countryData);

        const percentages = countries.map((country) => {
          return ((countryData[country] / numOfFlights) * 100).toFixed(2);
        });

        setFlightData({
          countries: countries,
          percentages: percentages,
        });
      })
      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  }, []);

  // find index of country to display its percentage
  const selectedCountryIndex = flightsData.countries.indexOf(selectedCountry);
  const percentageOfSelectedCountry =
    flightsData.percentages[selectedCountryIndex] || "0";

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      <h2>Flights into {selectedCountry}</h2>
      <select value={selectedCountry} onChange={handleCountryChange}>
        {flightsData.countries.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      {percentageOfSelectedCountry !== null ? (
        <p>
          {percentageOfSelectedCountry}% of flights fly into {selectedCountry}
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default FlightsIntoCountry;

// todo: add top 10 list?
