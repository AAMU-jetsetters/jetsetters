import './IncidentList.css';

interface Incident {
  id: string;
  timestamp: string;
  status: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface IncidentListProps {
  incidents: Incident[];
}

function IncidentList({ incidents }: IncidentListProps) {
  return (
    <div className="incident-list-container">
      <h3 className="incident-list-title">Recent Incidents</h3>
      <div className="incident-list">
        {incidents.map((incident) => (
          <div key={incident.id} className="incident-item">
            <div className="incident-header">
              <span className="incident-timestamp">{incident.timestamp}</span>
              <span className={`incident-severity severity-${incident.severity.toLowerCase()}`}>
                {incident.severity}
              </span>
            </div>
            <div className="incident-status">Status: {incident.status}</div>
            <div className="incident-description">{incident.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentList;

