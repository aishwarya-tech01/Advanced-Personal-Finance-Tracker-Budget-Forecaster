import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

// We will paste your pgAdmin Demo User UUID here when testing!
const USER_ID = "YOUR-UUID-GOES-HERE"; 

function App() {
  return (
    <div className="container">
      <h1>💸 Advanced Finance Tracker</h1>
      <Dashboard userId={USER_ID} />
    </div>
  );
}

export default App;