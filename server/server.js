const express = require("express");
const app = express();
const {
  combineFlightsAndSegments,
} = require("./utils/combineFlightsAndSegments");
const { readCSV } = require("./utils/csvReader");
const PORT = 3000;

app.get("/api/full-flight-details", async (req, res) => {
  try {
    const flights = await readCSV("./data/flighdata_B.csv");
    const segments = await readCSV("./data/flighdata_B_segments.csv");
    const fullFlightDetails = combineFlightsAndSegments(flights, segments);
    res.json(fullFlightDetails);
  } catch (error) {
    console.error("Failed to fetch full flight details: ", error);
    res.status(500).send("Error fetching full flight details");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${3000}`);
});
