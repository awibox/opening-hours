import React from 'react';
import './App.css';
import OpeningHours from "./components/OpeningHours";

const mockOpeningHoursData = {
  "monday": [{
    "type": "close",
    "value": 82800
  }],
  "tuesday": [
    { "type": "open", "value": 36000 },
    { "type": "close", "value": 64800 }
  ],
  "wednesday": [],
  "thursday": [
    { "type": "open", "value": 36000 },
    { "type": "close", "value": 64800 }
  ],
  "friday": [{ "type": "open", "value": 36000 }],
  "saturday": [
    {
      "type": "open",
      "value": 22000
    },
    {
      "type": "close",
      "value": 30000
    },
    {
      "type": "open",
      "value": 32400
    },
    {
      "type": "close",
      "value": 39600
    },
    {
      "type": "open",
      "value": 57600
    },
    {
      "type": "close",
      "value": 82800
    }
  ],
  "sunday": [
    { "type": "close", "value": 3600 },
    { "type": "open", "value": 43200 },
    { "type": "close", "value": 75600 }
  ],
}

function App() {
  return (
    <div className="App">
      <OpeningHours data={mockOpeningHoursData} />
    </div>
  );
}

export default App;
