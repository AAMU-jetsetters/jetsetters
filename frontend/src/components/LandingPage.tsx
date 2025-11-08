import Logo from './common/Logo';
import './LandingPage.css';

interface LandingPageProps {
  onSelectCommunity: () => void;
  onSelectCompany: () => void;
}

function LandingPage({ onSelectCommunity, onSelectCompany }: LandingPageProps) {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-header">
          <Logo size="large" useFullLogo={true} />
          <h1 className="landing-title">Water Quality Monitoring System</h1>
          <p className="landing-subtitle">
            Ensuring safe, clean water for communities through advanced monitoring and analytics
          </p>
        </div>

        <div className="login-options">
          <button className="option-card community-card" onClick={onSelectCommunity}>
            <div className="card-icon community-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="card-title">Community Portal</h2>
            <p className="card-description">
              Access water quality information, view safety alerts, and report issues in your area
            </p>
            <div className="card-arrow">→</div>
          </button>

          <button className="option-card company-card" onClick={onSelectCompany}>
            <div className="card-icon company-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h2 className="card-title">Operator Dashboard</h2>
            <p className="card-description">
              Monitor system health, analyze anomalies, and manage water infrastructure operations
            </p>
            <div className="card-arrow">→</div>
          </button>
        </div>

        <footer className="landing-footer">
          <p>© 2025 Sentra. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;

