// File: frontend/src/pages/History.jsx
import React, { useEffect, useState } from 'react';
import axios from '../services/api';

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/my-history', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setLogs(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Calculation History</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Input</th><th>Result</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{JSON.stringify(log.input)}</td>
              <td>{log.result}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}