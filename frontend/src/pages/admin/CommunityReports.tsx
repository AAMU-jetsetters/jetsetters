import { useState } from 'react';
import './CommunityReports.css';

interface Report {
  id: string;
  reportedBy: string;
  email: string;
  issueType: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  description: string;
  dateReported: string;
  status: 'New' | 'In Review' | 'Resolved' | 'Closed';
}

function CommunityReports() {
  const mockReports: Report[] = [
    {
      id: 'RPT-001',
      reportedBy: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      issueType: 'Water Quality',
      priority: 'High',
      location: 'North District, Sector 4',
      description: 'Strange odor and discoloration in tap water. Started noticing this yesterday evening. Water appears slightly brown and has a metallic smell.',
      dateReported: '2025-11-08 09:15 AM',
      status: 'New',
    },
    {
      id: 'RPT-002',
      reportedBy: 'Michael Chen',
      email: 'mchen@email.com',
      issueType: 'Taste Issue',
      priority: 'Medium',
      location: 'South District, Sector 2',
      description: 'Water has an unusual chlorine taste. Much stronger than normal. Family members are complaining about the taste.',
      dateReported: '2025-11-08 08:42 AM',
      status: 'In Review',
    },
    {
      id: 'RPT-003',
      reportedBy: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      issueType: 'Low Pressure',
      priority: 'Low',
      location: 'East District, Sector 7',
      description: 'Water pressure has been very low for the past 3 days. Difficult to shower and run appliances.',
      dateReported: '2025-11-07 04:30 PM',
      status: 'In Review',
    },
    {
      id: 'RPT-004',
      reportedBy: 'James Williams',
      email: 'jwilliams@email.com',
      issueType: 'Water Quality',
      priority: 'Critical',
      location: 'West District, Sector 1',
      description: 'Multiple residents reporting illness after drinking tap water. Urgent investigation needed. At least 5 households affected.',
      dateReported: '2025-11-07 02:15 PM',
      status: 'New',
    },
    {
      id: 'RPT-005',
      reportedBy: 'Lisa Anderson',
      email: 'anderson.l@email.com',
      issueType: 'Sediment',
      priority: 'Medium',
      location: 'North District, Sector 3',
      description: 'Visible particles in water. Seems to be sediment or rust. Water filter getting clogged quickly.',
      dateReported: '2025-11-07 11:20 AM',
      status: 'Resolved',
    },
    {
      id: 'RPT-006',
      reportedBy: 'David Park',
      email: 'dpark@email.com',
      issueType: 'Temperature',
      priority: 'Low',
      location: 'Central District, Sector 5',
      description: 'Cold water is warmer than usual. Suspect issue with water main insulation.',
      dateReported: '2025-11-06 03:45 PM',
      status: 'Closed',
    },
  ];

  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const filteredReports = reports.filter((report) => {
    if (filterStatus !== 'All' && report.status !== filterStatus) return false;
    if (filterPriority !== 'All' && report.priority !== filterPriority) return false;
    return true;
  });

  const handleDownloadPDF = () => {
    console.log('Download PDF functionality - To be implemented');
  };

  const handleMarkAsClosed = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: 'Closed' as const } : report
    ));
    console.log(`Report ${reportId} marked as closed`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'priority-critical';
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'status-new';
      case 'In Review':
        return 'status-review';
      case 'Resolved':
        return 'status-resolved';
      case 'Closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  return (
    <div className="reports-page">
            <div className="reports-header">
              <div className="reports-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Reports</span>
                  <span className="stat-value">{reports.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">New</span>
                  <span className="stat-value stat-new">{reports.filter(r => r.status === 'New').length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">In Review</span>
                  <span className="stat-value stat-review">{reports.filter(r => r.status === 'In Review').length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Resolved</span>
                  <span className="stat-value stat-resolved">{reports.filter(r => r.status === 'Resolved').length}</span>
                </div>
              </div>
              
              <button className="download-btn" onClick={handleDownloadPDF}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF</span>
              </button>
            </div>

            <div className="reports-filters">
              <div className="filter-group">
                <label className="filter-label">Status:</label>
                <select 
                  className="filter-select" 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="In Review">In Review</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Priority:</label>
                <select 
                  className="filter-select"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <div className="filter-results">
                Showing {filteredReports.length} of {reports.length} reports
              </div>
            </div>

            <div className="reports-list">
              {filteredReports.length === 0 ? (
                <div className="no-reports">
                  <p>No reports found matching your filters.</p>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <div className="report-id">{report.id}</div>
                      <div className="report-meta">
                        <span className={`priority-badge ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </span>
                        <span className={`status-badge ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="report-content">
                      <div className="report-info-row">
                        <div className="info-item">
                          <span className="info-label">Reported By:</span>
                          <span className="info-value">{report.reportedBy}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Email:</span>
                          <span className="info-value">{report.email}</span>
                        </div>
                      </div>
                      
                      <div className="report-info-row">
                        <div className="info-item">
                          <span className="info-label">Issue Type:</span>
                          <span className="info-value">{report.issueType}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Location:</span>
                          <span className="info-value">{report.location}</span>
                        </div>
                      </div>
                      
                      <div className="report-info-row">
                        <div className="info-item full-width">
                          <span className="info-label">Date Reported:</span>
                          <span className="info-value">{report.dateReported}</span>
                        </div>
                      </div>
                      
                      <div className="report-description">
                        <span className="description-label">Description:</span>
                        <p className="description-text">{report.description}</p>
                      </div>
                    </div>
                    
                    {report.status !== 'Closed' && (
                      <div className="report-actions">
                        <button 
                          className="action-btn close-btn"
                          onClick={() => handleMarkAsClosed(report.id)}
                        >
                          Mark as Closed
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
  );
}

export default CommunityReports;

