import { useState } from 'react';
import StatusCard from '../../components/community/StatusCard';
import HealthAdvisory from '../../components/community/HealthAdvisory';
import CommunityActions from '../../components/community/CommunityActions';
import BottomNav from '../../components/community/BottomNav';
import ReportIssueForm from '../../components/community/ReportIssueForm';
import HistoricalTrends from '../../components/common/HistoricalTrends';
import MetricsPage from './MetricsPage';
import { firebaseAuthService } from '../../services/firebaseAuth';
import { useWaterData } from '../../hooks/useWaterData';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { mapRiskLevelToFrontend, formatDate } from '../../utils/dataMapper';
import type { IssueData } from '../../components/community/ReportIssueForm';
import './WaterSafetyOverview.css';

interface WaterSafetyOverviewProps {
  onLogout?: () => void;
}

function WaterSafetyOverview({ onLogout }: WaterSafetyOverviewProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'metrics' | 'profile'>('home');
  const [showReportForm, setShowReportForm] = useState(false);
  const [timeRange, setTimeRange] = useState<7 | 30 | 90>(7);

  const { data: waterData, loading, error } = useWaterData();
  const { chemicalTrends } = useHistoricalData(timeRange);

  const pHTrendData = chemicalTrends.pH?.map((point) => ({
    date: point.date,
    value: point.value,
  })) || [];

  const handleViewDetails = () => {
    setActiveTab('metrics');
  };

  const handleContactUtility = () => {
    console.log('Contact utility');
  };

  const handleReportIssue = () => {
    setShowReportForm(true);
  };

  const handleCloseReportForm = () => {
    setShowReportForm(false);
  };

  const handleSubmitIssue = (_issue: IssueData) => {
    setShowReportForm(false);
  };

  const handleViewFAQ = () => {
    console.log('View FAQ');
  };

  const handleNavigate = (tab: 'home' | 'metrics' | 'profile') => {
    setActiveTab(tab);
    console.log('Navigate to:', tab);
  };

  const handleLogoutClick = async () => {
    await firebaseAuthService.logout();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="water-safety-page">
      <header className="mobile-header">
        <div className="header-icon">
          <img src="/src/assets/sentra_icon.png" alt="Sentra" className="header-logo" />
        </div>
      </header>

      <main className="page-content">
        {activeTab === 'home' && (
          <>
            {loading ? (
              <div className="content-section">
                <div style={{ textAlign: 'center', padding: '2rem', color: '#a0a0a0' }}>
                  Loading water status...
                </div>
              </div>
            ) : error ? (
              <div className="content-section">
                <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
                  Error: {error}
                </div>
              </div>
            ) : waterData ? (
              <>
                <StatusCard
                  riskLevel={mapRiskLevelToFrontend(waterData.overallRisk.level)}
                  description={waterData.overallRisk.description}
                />

                <div className="content-section">
                  <HealthAdvisory
                    advisory={waterData.healthAdvisory.message}
                    updatedAt={formatDate(waterData.healthAdvisory.updatedAt)}
                    onViewDetails={handleViewDetails}
                  />
                </div>

                <div className="content-section">
                  <HistoricalTrends
                    title="Water Quality Trend (pH Level)"
                    data={pHTrendData}
                    timeRange={`${timeRange}days` as '7days' | '30days' | '90days'}
                    unit="pH"
                    variant="community"
                    onTimeRangeChange={(range) => {
                      const days = parseInt(range.replace('days', '')) as 7 | 30 | 90;
                      setTimeRange(days);
                    }}
                  />
                </div>
              </>
            ) : null}

            <div className="content-section">
              <CommunityActions
                onContactUtility={handleContactUtility}
                onReportIssue={handleReportIssue}
                onViewFAQ={handleViewFAQ}
              />
            </div>
          </>
        )}

        {showReportForm && (
          <ReportIssueForm onClose={handleCloseReportForm} onSubmit={handleSubmitIssue} />
        )}

        {activeTab === 'metrics' && <MetricsPage />}

        {activeTab === 'profile' && (
          <div className="content-section">
            <div className="profile-content">
              <h2 className="profile-title">Profile</h2>
              <div className="profile-info">
                <p className="profile-text">User profile and notification settings will be displayed here.</p>
              </div>
              <button className="logout-button" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

export default WaterSafetyOverview;

