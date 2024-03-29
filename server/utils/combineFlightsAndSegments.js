function combineFlightsAndSegments(flights, segments) {
  return flights.map((flight) => {
    const relatedSegments = segments.filter(
      (segment) => segment.flightid === flight.id
    );
    return { ...flight, segments: relatedSegments };
  });
}

module.exports = { combineFlightsAndSegments };
