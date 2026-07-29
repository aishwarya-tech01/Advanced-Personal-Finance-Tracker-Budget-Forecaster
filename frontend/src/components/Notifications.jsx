import React from 'react';

const Notifications = ({ alerts = [] }) => {
  return (
    <div>
      {alerts.length === 0 ? (
        <p className="text-gray-500 italic">No high-spending alerts triggered yet</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, index) => (
            <li key={alert.id || index} className="p-3 bg-red-50 text-red-700 rounded border">
              {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;