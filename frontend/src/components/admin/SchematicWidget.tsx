import './SchematicWidget.css';

interface SchematicWidgetProps {
  title?: string;
}

function SchematicWidget({ title = 'Water Network Schematic' }: SchematicWidgetProps) {
  return (
    <div className="schematic-widget">
      <h3 className="schematic-title">{title}</h3>
      <div className="schematic-content">
        {/* Placeholder schematic diagram */}
        <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          {/* Pipes */}
          <line x1="50" y1="150" x2="150" y2="150" stroke="#3a3a3a" strokeWidth="4" />
          <line x1="250" y1="150" x2="350" y2="150" stroke="#3a3a3a" strokeWidth="4" />
          <line x1="200" y1="100" x2="200" y2="200" stroke="#3a3a3a" strokeWidth="4" />
          
          {/* Tank (left) */}
          <rect x="30" y="130" width="40" height="40" fill="#2a2a2a" stroke="#14b8a6" strokeWidth="2" rx="4" />
          <text x="50" y="155" fill="#ffffff" fontSize="10" textAnchor="middle">T1</text>
          
          {/* Pump (center - highlighted in red) */}
          <circle cx="200" cy="150" r="30" fill="#ef4444" opacity="0.2" />
          <rect x="180" y="130" width="40" height="40" fill="#2a2a2a" stroke="#ef4444" strokeWidth="3" rx="4" />
          <text x="200" y="155" fill="#ffffff" fontSize="10" textAnchor="middle">PU1</text>
          
          {/* Valve (top) */}
          <circle cx="200" cy="80" r="15" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="2" />
          <line x1="190" y1="80" x2="210" y2="80" stroke="#666666" strokeWidth="2" />
          
          {/* Valve (bottom) */}
          <circle cx="200" cy="220" r="15" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="2" />
          <line x1="190" y1="220" x2="210" y2="220" stroke="#666666" strokeWidth="2" />
          
          {/* Tank (right) */}
          <rect x="330" y="130" width="40" height="40" fill="#2a2a2a" stroke="#14b8a6" strokeWidth="2" rx="4" />
          <text x="350" y="155" fill="#ffffff" fontSize="10" textAnchor="middle">T2</text>
          
          {/* Junction points */}
          <circle cx="150" cy="150" r="5" fill="#14b8a6" />
          <circle cx="250" cy="150" r="5" fill="#14b8a6" />
          
          {/* Labels */}
          <text x="200" y="30" fill="#a0a0a0" fontSize="12" textAnchor="middle" fontFamily="Ubuntu">Water Network Overview</text>
          <text x="200" y="280" fill="#ef4444" fontSize="11" textAnchor="middle" fontFamily="Ubuntu">⚠ Alert: Pump PU1</text>
        </svg>
      </div>
    </div>
  );
}

export default SchematicWidget;

