// File: frontend/src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from '../services/api';

export default function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/admin/logs', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setLogs(res.data));
  }, []);

  const exportCSV = () => {
    const csvContent = [
      ['Username', 'Age', 'Creatinine', 'Sex', 'Result', 'Timestamp'],
      ...logs.map(log => [
        log.username,
        log.input.age,
        log.input.creatinine,
        log.input.sex,
        log.result,
        new Date(log.timestamp).toLocaleString()
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "egfr_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Calculation Logs</h2>
      <button onClick={exportCSV} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Export CSV</button>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>User</th><th>Input</th><th>Result</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.username}</td>
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