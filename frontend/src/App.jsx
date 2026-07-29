import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

// We will paste your pgAdmin Demo User UUID here when testing!
const USER_ID = "4d20b032-08d8-4ff7-bdfb-2549267ad601;"; 

function App() {
  return (
    <div className="container">
      <h1>💸 Advanced Finance Tracker</h1>
      <Dashboard userId={USER_ID} />
    </div>
  );
}

export default App;