import { useState } from 'react';
import './LogViewer.css';

interface LogEntry {
  id: string;
  timestamp: string;
  component: string;
  eventType: string;
  message: string;
  severity: 'Info' | 'Warning' | 'Error';
}

interface LogViewerProps {
  logs?: LogEntry[];
}

function LogViewer({ logs: initialLogs }: LogViewerProps) {
  const [componentFilter, setComponentFilter] = useState('');
  const [timeWindow, setTimeWindow] = useState('');

  const defaultLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '11/7/2025, 6:40:47 PM',
      component: 'Firewall',
      eventType: 'Deny',
      message: 'Attempted unauthorized access from 192.168.1.100',
      severity: 'Warning',
    },
    {
      id: '2',
      timestamp: '11/7/2025, 7:00:47 PM',
      component: 'SCADA_Server',
      eventType: 'Data Read',
      message: 'Sensor data read from L_T1',
      severity: 'Info',
    },
    {
      id: '3',
      timestamp: '11/7/2025, 7:10:47 PM',
      component: 'Pump Controller',
      eventType: 'Command',
      message: 'Pump F_PU1 speed',
      severity: 'Info',
    },
  ];

  const logs = initialLogs || defaultLogs;

  const handleApplyFilters = () => {
    console.log('Filters applied:', { componentFilter, timeWindow });
    // Filter logic would go here
  };

  return (
    <div className="log-viewer">
      <h3 className="log-viewer-title">Cyber Log Viewer</h3>
      
      <div className="log-filters">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter component..."
          value={componentFilter}
          onChange={(e) => setComponentFilter(e.target.value)}
        />
        <input
          type="text"
          className="filter-input"
          placeholder="e.g., last 24h"
          value={timeWindow}
          onChange={(e) => setTimeWindow(e.target.value)}
        />
        <button className="apply-filters-btn" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>

      <div className="log-table-container">
        <table className="log-table">
          <thead>
            <tr>
              <th>TIMESTAMP</th>
              <th>COMPONENT</th>
              <th>EVENT TYPE</th>
              <th>MESSAGE</th>
              <th>SEVERITY</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="log-timestamp">{log.timestamp}</td>
                <td className="log-component">{log.component}</td>
                <td className="log-event-type">{log.eventType}</td>
                <td className="log-message">{log.message}</td>
                <td>
                  <span className={`severity-badge severity-${log.severity.toLowerCase()}`}>
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogViewer;

