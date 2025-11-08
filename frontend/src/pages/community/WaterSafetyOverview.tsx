import { useState, useRef, useEffect } from 'react';
import StatusCard from '../../components/community/StatusCard';
import HealthAdvisory from '../../components/community/HealthAdvisory';
import CommunityActions from '../../components/community/CommunityActions';
import BottomNav from '../../components/community/BottomNav';
import ReportIssueForm from '../../components/community/ReportIssueForm';
import HistoricalTrends from '../../components/common/HistoricalTrends';
import MetricsPage from './MetricsPage';
import ProfilePage from './ProfilePage';
import NotificationsPage from './NotificationsPage';
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
  const [activeTab, setActiveTab] = useState<'home' | 'metrics' | 'profile' | 'notifications'>('home');
  const [showReportForm, setShowReportForm] = useState(false);
  const [timeRange, setTimeRange] = useState<7 | 30 | 90>(7);
  const scrollPositionRef = useRef<number>(0);
  const isChangingRangeRef = useRef<boolean>(false);
  const [hasNotification, setHasNotification] = useState(true);

  const { data: waterData, loading, error } = useWaterData();
  const { chemicalTrends, loading: historyLoading } = useHistoricalData(timeRange);

  const pHTrendData = chemicalTrends.pH?.map((point) => ({
    date: point.date,
    value: point.value,
  })) || [];

  useEffect(() => {
    if (isChangingRangeRef.current && !historyLoading) {
      const restoreScroll = () => {
        const targetScroll = scrollPositionRef.current;
        window.scrollTo(0, targetScroll);
        
        setTimeout(() => {
          if (Math.abs(window.scrollY - targetScroll) > 5) {
            window.scrollTo(0, targetScroll);
          }
          isChangingRangeRef.current = false;
        }, 50);
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(restoreScroll);
        });
      });
    }
  }, [historyLoading, pHTrendData]);

  const handleViewDetails = () => {
    setActiveTab('metrics');
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

  const handleNavigate = (tab: 'home' | 'metrics' | 'profile' | 'notifications') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('Navigate to:', tab);
  };

  const handleTimeRangeChange = (range: '7days' | '30days' | '90days') => {
    // Save current scroll position
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
    isChangingRangeRef.current = true;
    
    const rangeMap = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
    };
    
    setTimeRange(rangeMap[range] as 7 | 30 | 90);
  };

  const handleLogoutClick = async () => {
    await firebaseAuthService.logout();
    if (onLogout) {
      onLogout();
    }
  };

  const handleNotificationClick = () => {
    setActiveTab('notifications');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAllRead = () => {
    setHasNotification(false);
  };

  return (
    <div className="water-safety-page">
      <header className="mobile-header">
        <div className="header-icon">
          <img src="/src/assets/sentra_icon.png" alt="Sentra" className="header-logo" />
        </div>
        {activeTab !== 'notifications' && (
          <button className="notification-bell" onClick={handleNotificationClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {hasNotification && <span className="notification-badge"></span>}
          </button>
        )}
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
                    onTimeRangeChange={handleTimeRangeChange}
                  />
                </div>
              </>
            ) : null}

            <div className="content-section">
              <CommunityActions
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

        {activeTab === 'notifications' && <NotificationsPage onMarkAllRead={handleMarkAllRead} />}

        {activeTab === 'profile' && <ProfilePage onLogout={handleLogoutClick} />}
      </main>

      <BottomNav activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

export default WaterSafetyOverview;

