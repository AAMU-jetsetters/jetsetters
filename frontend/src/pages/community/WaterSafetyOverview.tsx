import { useState } from 'react';
import StatusCard from '../../components/community/StatusCard';
import HealthAdvisory from '../../components/community/HealthAdvisory';
import CommunityActions from '../../components/community/CommunityActions';
import BottomNav from '../../components/community/BottomNav';
import ReportIssueForm from '../../components/community/ReportIssueForm';
import HistoricalTrends from '../../components/common/HistoricalTrends';
import MetricsPage from './MetricsPage';
import { firebaseAuthService } from '../../services/firebaseAuth';
import type { IssueData } from '../../components/community/ReportIssueForm';
import './WaterSafetyOverview.css';

interface WaterSafetyOverviewProps {
  onLogout?: () => void;
}

function WaterSafetyOverview({ onLogout }: WaterSafetyOverviewProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'metrics' | 'profile'>('home');
  const [showReportForm, setShowReportForm] = useState(false);

  const mockTrendData = [
    { date: 'Nov 1', value: 7.6 },
    { date: 'Nov 2', value: 7.8 },
    { date: 'Nov 3', value: 7.7 },
    { date: 'Nov 4', value: 7.9 },
    { date: 'Nov 5', value: 7.8 },
    { date: 'Nov 6', value: 7.6 },
    { date: 'Nov 7', value: 7.8 },
  ];

  const handleViewDetails = () => {
    console.log('View health advisory details');
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

  const handleSubmitIssue = (issue: IssueData) => {
    console.log('Issue submitted:', issue);
    alert('Thank you! Your report has been submitted successfully.');
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
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      </header>

      <main className="page-content">
        {activeTab === 'home' && (
          <>
            <StatusCard
              riskLevel="Low Risk"
              description="Water quality in your area currently indicates low risk. Continue to monitor updates for any changes."
            />

            <div className="content-section">
              <HealthAdvisory
                advisory="Local water sources are safe for consumption. However, children under 2 and immunocompromised individuals should boil water for 1 minute."
                updatedAt="2024-07-26 10:30 AM"
                onViewDetails={handleViewDetails}
              />
            </div>

            <div className="content-section">
              <HistoricalTrends
                title="Water Quality Trend (pH Level)"
                data={mockTrendData}
                timeRange="7days"
                unit="pH"
                variant="community"
              />
            </div>

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

