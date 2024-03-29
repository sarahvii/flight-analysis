const {
  combineFlightsAndSegments,
} = require("../utils/combineFlightsAndSegments.js");

describe("combineFlightsAndSegments function", () => {
  it("should correcty combine flight data with its segments", async () => {
    // mock flight data
    const flights = [
      { id: "1803064", depair: "GLA", destair: "AUH" },
      { id: "1672415", depair: "SYD", destair: "LHR" },
    ];

    // mock segments data
    const segments = [
      { flightid: "1803064", depcode: "GLA", arrcode: "LHR" },
      { flightid: "1803064", depcode: "LHR", arrcode: "AUH" },
      { flightid: "1672415", depcode: "SYD", arrcode: "HKG" },
      { flightid: "1672415", depcode: "HKG", arrcode: "LHR" },
    ];

    const combinedData = combineFlightsAndSegments(flights, segments);

    // check data is same length once combined
    expect(combinedData.length).toBe(flights.length);
    // check first flight in array contains expected segments
    expect(combinedData[0].segments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ depcode: "GLA", arrcode: "LHR" }),
        expect.objectContaining({ depcode: "LHR", arrcode: "AUH" }),
      ])
    );
    // todo: implement test for flights with no segments
    // todo: implement test for segments without matching flights
  });
});
