# Flight Data Analytics Web Application

This project provides a web service and a front-end interface for analysing flight data.
It delivers insights including:

- journey durations
- peak departure days
- class proprotions
- destination trends
- route options via specified layovers

## Features

- **API Backend**: Built with Node.js, this API processes and serves flight data insights through a JSON endpoint
- **React Frontend**: Built with React.js, this web applicatoin displays the data fetched from the API, offering an interactive user experience
- **Insightful Analytics**: Access detailed analytics on flights, including journey times, peak departure days, class proportions, destination trends, route options

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

You need Node.js and npm installed:

- Node.js 14.x or later
- npm 6.x or later

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sarahvii/flight-analysis.git
   cd flight-analysis

   ```

2. **Set up the Back End**

Navigate to the backend directory, install dependencies, and start the server:

# Install dependencies

npm install

# Start the backend server

npm start

The API will now be available at http://localhost:3000

3. **Set up the Back End**

In a new terminal window, navigate to the frontend directory, install dependencies, and start the React application:

npm install
npm run dev

The frontend will be accessible at http://localhost:5173, or another port if 5173 is in use.

**API REFERENCE**

Get Full Flight Details
Endpoint: GET /api/full-flight-details
Description: Returns detailed flight information by combining basic flight data with segment data.
Response: JSON object containing the full details of flights and their segments.

**USAGE**
Open the web application in your browser to interact with the flight data analytics. Navigate through the UI to explore various statistical insights.
