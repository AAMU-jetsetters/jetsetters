import ChartWidget from '../../components/admin/ChartWidget';
import SchematicWidget from '../../components/admin/SchematicWidget';
import LogViewer from '../../components/admin/LogViewer';
import './DiagnosticsForensics.css';

function DiagnosticsForensics() {
  return (
    <div className="diagnostics-page">
      <div className="diagnostics-header">
        <h2 className="diagnostics-title">Real-Time Diagnostics & Forensics</h2>
        <p className="diagnostics-subtitle">Detailed insights into system health and incident analysis.</p>
      </div>

      {/* Top Section: Chart and Schematic */}
      <div className="diagnostics-top-section">
        <div className="chart-section">
          <ChartWidget showLiveBadge={true} />
        </div>
        <div className="schematic-section">
          <SchematicWidget />
        </div>
      </div>

      {/* Bottom Section: Log Viewer */}
      <div className="diagnostics-bottom-section">
        <LogViewer />
      </div>
    </div>
  );
}

export default DiagnosticsForensics;

