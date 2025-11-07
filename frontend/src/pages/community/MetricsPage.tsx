import RiskIndexCard from '../../components/community/RiskIndexCard';
import ChemicalParameters from '../../components/community/ChemicalParameters';
import HistoricalTrends from '../../components/common/HistoricalTrends';
import './MetricsPage.css';

function MetricsPage() {
  // Mock historical data for different parameters
  const riskIndexTrend = [
    { date: 'Nov 1', value: 55 },
    { date: 'Nov 2', value: 62 },
    { date: 'Nov 3', value: 58 },
    { date: 'Nov 4', value: 68 },
    { date: 'Nov 5', value: 72 },
    { date: 'Nov 6', value: 65 },
    { date: 'Nov 7', value: 68 },
  ];

  const chlorineTrend = [
    { date: 'Nov 1', value: 0.9 },
    { date: 'Nov 2', value: 0.85 },
    { date: 'Nov 3', value: 0.88 },
    { date: 'Nov 4', value: 0.82 },
    { date: 'Nov 5', value: 0.8 },
    { date: 'Nov 6', value: 0.78 },
    { date: 'Nov 7', value: 0.8 },
  ];

  return (
    <div className="metrics-page">
      <div className="metrics-section">
        <RiskIndexCard
          percentage={68}
          riskLevel="Moderate Risk"
          description="Current risk assessment based on real-time sensor data and predictive models across your community."
        />
      </div>

      <div className="metrics-section">
        <HistoricalTrends
          title="Risk Index Trend"
          data={riskIndexTrend}
          timeRange="7days"
          unit="%"
          variant="community"
        />
      </div>

      <div className="metrics-section">
        <ChemicalParameters />
      </div>

      <div className="metrics-section">
        <HistoricalTrends
          title="Chlorine Residual Trend"
          data={chlorineTrend}
          timeRange="7days"
          unit="mg/L"
          variant="community"
        />
      </div>
    </div>
  );
}

export default MetricsPage;

