const { readCSV } = require("../utils/csvReader.js");

describe("csv Parsing", () => {
  describe("Flight Data B Parsing", () => {
    it("should parse the csv file into an array of objects", async () => {
      const filePath = "./data/flighdata_B.csv";
      const data = await readCSV(filePath);

      // check data is an array
      expect(Array.isArray(data)).toBe(true);
      // check array is not empty
      expect(data.length).toBeGreaterThan(0);
      // sample object structure in first row
      expect(data[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          depair: expect.any(String),
          destair: expect.any(String),
        })
      );
    });
  });

  describe("Flight Data B Segments Parsing", () => {
    it("should parse the csv file into an array of objects", async () => {
      const filePath = "./data/flighdata_B_segments.csv";
      const data = await readCSV(filePath);

      // check data is an array
      expect(Array.isArray(data)).toBe(true);
      // check array is not empty
      expect(data.length).toBeGreaterThan(0);
      // sample object structure in first row
      expect(data[0]).toEqual(
        expect.objectContaining({
          flightid: expect.any(String),
          depcode: expect.any(String),
          arrcode: expect.any(String),
        })
      );
    });
  });
});
