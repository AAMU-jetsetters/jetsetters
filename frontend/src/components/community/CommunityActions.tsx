import './CommunityActions.css';

interface CommunityActionsProps {
  onReportIssue?: () => void;
  onViewFAQ?: () => void;
}

function CommunityActions({ onReportIssue, onViewFAQ }: CommunityActionsProps) {
  return (
    <div className="community-actions">
      <h2 className="actions-title">Community Resources & Reporting</h2>

      <div className="action-buttons">
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

