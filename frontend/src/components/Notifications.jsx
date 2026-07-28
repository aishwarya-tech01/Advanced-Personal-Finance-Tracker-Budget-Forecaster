import React, { useState, useEffect } from 'react';

const Notifications = ({ userId, refresh }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if(!userId || userId === "YOUR-UUID-GOES-HERE") return;
    fetch(`http://localhost:5000/api/notifications/${userId}`)
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error(err));
  }, [userId, refresh]);

  if (alerts.length === 0) return <p>All good! No anomalies detected.</p>;

  return (
    <div>
      {alerts.map(alert => (
        <div key={alert.id} className="alert-box">
          ⚠️ {alert.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;