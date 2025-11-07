import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import DataCard from '../../components/admin/DataCard';
import AlertList from '../../components/admin/AlertList';
import NetworkHealth from '../../components/admin/NetworkHealth';
import IncidentList from '../../components/admin/IncidentList';
import HistoricalTrends from '../../components/common/HistoricalTrends';
import DiagnosticsForensics from './DiagnosticsForensics';
import AIAnalystChat from './AIAnalystChat';
import './AnomalyOverview.css';

interface AnomalyOverviewProps {
  onLogout: () => void;
}

function AnomalyOverview({ onLogout }: AnomalyOverviewProps) {
  const [activeNav, setActiveNav] = useState('anomaly-overview');

  // Mock data to be replaced with model feed
  const mockAlerts = [
    { id: '1', type: 'Pump Failure', status: 'Active' as const, time: '2023-10-26 14:30 UTC', severity: 'Critical' as const },
    { id: '2', type: 'Pressure Drop', status: 'Active' as const, time: '2023-10-26 14:20 UTC', severity: 'Critical' as const },
    { id: '3', type: 'Sensor Anomaly', status: 'Acknowledged' as const, time: '2023-10-26 14:15 UTC', severity: 'High' as const },
    { id: '4', type: 'Network Latency', status: 'Active' as const, time: '2023-10-26 14:00 UTC', severity: 'Medium' as const },
    { id: '5', type: 'Filter Clog', status: 'Resolved' as const, time: '2023-10-26 13:45 UTC', severity: 'Low' as const },
    { id: '6', type: 'Power Fluctuation', status: 'Acknowledged' as const, time: '2023-10-26 13:30 UTC', severity: 'Medium' as const },
  ];

  const mockAnomalyTrend = [
    { date: 'Nov 1', value: 0.65 },
    { date: 'Nov 2', value: 0.72 },
    { date: 'Nov 3', value: 0.68 },
    { date: 'Nov 4', value: 0.85 },
    { date: 'Nov 5', value: 0.88 },
    { date: 'Nov 6', value: 0.82 },
    { date: 'Nov 7', value: 0.88 },
  ];

  const mockIncidents = [
    {
      id: '1',
      timestamp: '2023-10-26 14:35 UTC',
      status: 'Open',
      description: 'Critical system anomaly detected in Pump Station 3. Multiple sensors reporting out-of-range values. Immediate investigation required.',
      severity: 'Critical' as const,
    },
    {
      id: '2',
      timestamp: '2023-10-26 14:20 UTC',
      status: 'Investigating',
      description: 'Unusual pressure readings in Tank T1. Potential leak or sensor malfunction. Maintenance team dispatched.',
      severity: 'High' as const,
    },
    {
      id: '3',
      timestamp: '2023-10-26 14:05 UTC',
      status: 'Investigating',
      description: 'Water quality parameters slightly out of optimal range. pH levels trending downward. Monitoring closely.',
      severity: 'Medium' as const,
    },
  ];

  const getPageTitle = () => {
    switch (activeNav) {
      case 'diagnostics':
        return 'Diagnostics & Forensics';
      case 'ai-chat':
        return 'AI Analyst & Chat';
      default:
        return 'Anomaly Overview';
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar activeItem={activeNav} onNavigate={setActiveNav} />
      
      <div className="admin-main">
        <AdminHeader pageTitle={getPageTitle()} onLogout={onLogout} />
        
        <main className="admin-content">
          {activeNav === 'anomaly-overview' && (
            <>
              {/* Data Cards Row */}
              <section className="data-cards-section">
                <DataCard
                  title="System Status"
                  status={{ label: 'High Alert', type: 'warning' }}
                  detail="Anomaly Score: 0.88"
                  description="Overall operational health based on AI/ML anomaly detection."
                  icon="⚠️"
                />
                <DataCard
                  title="Water Quality Index"
                  value="7.8"
                  trend={{ value: '+0.2', direction: 'up' }}
                  description="Optimal range: 7.0 - 8.5"
                />
                <DataCard
                  title="Total Pump Flow Rate"
                  value="1250m³/hr"
                  description="Current aggregated flow rate"
                />
                <DataCard
                  title="Tank T1 Level"
                  value="78%"
                  trend={{ value: '-2%', direction: 'down' }}
                  description="Live vs Predicted: 78% vs 80%"
                />
              </section>

              {/* Alerts and Network Health Row */}
              <section className="alerts-network-section">
                <div className="alerts-column">
                  <AlertList alerts={mockAlerts} />
                </div>
                <div className="network-column">
                  <NetworkHealth
                    status="warning"
                    trafficVolume="1.2 Gbps"
                    failedConnections={15}
                  />
                </div>
              </section>

              {/* Historical Trends Section */}
              <section className="trends-section">
                <HistoricalTrends
                  title="Anomaly Score Trend"
                  data={mockAnomalyTrend}
                  timeRange="7days"
                  unit="Score"
                  variant="admin"
                />
              </section>

              {/* Recent Incidents Section */}
              <section className="incidents-section">
                <IncidentList incidents={mockIncidents} />
              </section>
            </>
          )}

          {activeNav === 'diagnostics' && <DiagnosticsForensics />}

          {activeNav === 'ai-chat' && <AIAnalystChat />}
        </main>

        <footer className="admin-footer">
          © 2025 Operator Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default AnomalyOverview;

