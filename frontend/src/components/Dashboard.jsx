import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import Notifications from './Notifications';

const Dashboard = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  useEffect(() => {
    if(!userId || userId === "YOUR-UUID-GOES-HERE") return;
    fetch(`http://localhost:5000/api/transactions/${userId}`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  }, [userId, triggerRefresh]);

  const handleTransactionAdded = () => setTriggerRefresh(prev => prev + 1);

  return (
    <div className="bento-grid">
      <div className="bento-box">
        <h2>Add Transaction</h2>
        <ExpenseForm userId={userId} onAdded={handleTransactionAdded} />
      </div>
      <div className="bento-box">
        <h2>Database Alerts</h2>
        <Notifications userId={userId} refresh={triggerRefresh} />
      </div>
      <div className="bento-box">
        <h2>Recent History</h2>
        <ul>
          {transactions.map(t => (
            <li key={t.id}>
              {t.date.substring(0, 10)} - {t.category}: <strong>${t.amount}</strong> ({t.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;