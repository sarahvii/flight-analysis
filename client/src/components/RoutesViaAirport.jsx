import { useState, useEffect } from "react";

const RoutesViaAirport = () => {
  const [selectedLayover, setSelectedLayover] = useState("");
  const [routes, setRoutes] = useState({});
  const [airports, setAirports] = useState([]);
  const [flightsData, setFlightsData] = useState([]);

  useEffect(() => {
    fetch(`/api/full-flight-details`)
      .then((response) => response.json())
      .then((data) => {
        setFlightsData(data);
        // get unique airports from api
        const uniqueAirportsSet = new Set();
        data.forEach((flight) => {
          uniqueAirportsSet.add(flight.depair);
          uniqueAirportsSet.add(flight.destair);
        });
        setAirports([...uniqueAirportsSet]);
      })
      .catch((error) => {
        console.error("Failed to fetch flight data", error);
      });
  }, []);

  // re-fetch data when selected layover changes
  useEffect(() => {
      filterRoutes(selectedLayover);
  }, [selectedLayover, flightsData]);

  const filterRoutes = (layover) => {
    let routesWithLayovers = [];
  
    flightsData.forEach((flight) => {
      if (flight.segments && flight.segments.length > 1 && flight.segments[0].arrcode === layover) {
        const route = {
          from: flight.depair,
          layover: layover,
          to: flight.destair,
        };
  
        // converte route object to JSON string
        const routeString = JSON.stringify(route);
  
        // check if route already exists in array
        const isDuplicate = routesWithLayovers.some(existingRoute => JSON.stringify(existingRoute) === routeString);
  
        if (!isDuplicate) {
          routesWithLayovers.push(route);
        }
      }
    });
  
    setRoutes(routesWithLayovers);
  };
  

    const handleLayoverChange = (e) => {
      setSelectedLayover(e.target.value);
    };


    return (
      <div>
        <h2>Routes via {selectedLayover}</h2>
        <select value={selectedLayover} onChange={handleLayoverChange}>
          <option value="">Select Layover Airport</option>
          {airports.map((airport) => (
            <option key={airport} value={airport}>
              {airport}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Departure</th>
              <th>Layover</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(routes).map((route, index) => (
              <tr key={index}>
                <td>{route.from}</td>
                <td>{route.layover}</td>
                <td>{route.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default RoutesViaAirport;

// note: this only looks at first layover in array
// todo: remove airports with no layover from dropdown
// todo: sort airports
// todo: add airport name
// todo: add error handling if no layover found
