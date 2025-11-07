import './CommunityActions.css';

interface CommunityActionsProps {
  onContactUtility?: () => void;
  onReportIssue?: () => void;
  onViewFAQ?: () => void;
}

function CommunityActions({ onContactUtility, onReportIssue, onViewFAQ }: CommunityActionsProps) {
  return (
    <div className="community-actions">
      <h2 className="actions-title">Community Resources & Reporting</h2>

      <div className="action-buttons">
        <button className="action-btn" onClick={onContactUtility}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Contact Utility</span>
        </button>

        <button className="action-btn" onClick={onReportIssue}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l7 3-1-7-5-5 5-5 1-7-7 3-5 5-5-5-7 3 3 7 5 5-5 5-3 7 7-3 5-5z" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span>Report Issue</span>
        </button>
      </div>

      <button className="faq-link" onClick={onViewFAQ}>
        View FAQ
      </button>
    </div>
  );
}

export default CommunityActions;

