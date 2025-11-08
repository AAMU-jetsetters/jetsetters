import { useState } from 'react';
import './HistoricalTrends.css';

interface TrendData {
  date: string;
  value: number;
  label?: string;
}

interface HistoricalTrendsProps {
  title: string;
  data: TrendData[];
  timeRange?: '7days' | '30days' | '90days';
  onTimeRangeChange?: (range: '7days' | '30days' | '90days') => void;
  unit?: string;
  variant?: 'admin' | 'community';
}

function HistoricalTrends({
  title,
  data,
  timeRange = '7days',
  onTimeRangeChange,
  unit = '',
  variant = 'community',
}: HistoricalTrendsProps) {
  const [selectedRange, setSelectedRange] = useState(timeRange);

  const handleRangeChange = (e: React.MouseEvent, range: '7days' | '30days' | '90days') => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className={`historical-trends ${variant}`}>
      <div className="trends-header">
        <h3 className="trends-title">{title}</h3>
        <div className="time-range-selector">
          <button
            type="button"
            className={`range-btn ${selectedRange === '7days' ? 'active' : ''}`}
            onClick={(e) => handleRangeChange(e, '7days')}
          >
            7 Days
          </button>
          <button
            type="button"
            className={`range-btn ${selectedRange === '30days' ? 'active' : ''}`}
            onClick={(e) => handleRangeChange(e, '30days')}
          >
            30 Days
          </button>
          <button
            type="button"
            className={`range-btn ${selectedRange === '90days' ? 'active' : ''}`}
            onClick={(e) => handleRangeChange(e, '90days')}
          >
            3 Months
          </button>
        </div>
      </div>

      <div className="chart-container">
        <div className="y-axis">
          <span className="axis-value">{maxValue.toFixed(1)}</span>
          <span className="axis-value">{((maxValue + minValue) / 2).toFixed(1)}</span>
          <span className="axis-value">{minValue.toFixed(1)}</span>
        </div>

        <div className="chart-area">
          <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="600" y2="0" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="0" y1="100" x2="600" y2="100" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="#2a2a2a" strokeWidth="1" />

            {/* Area fill */}
            <path
              d={`M 0 200 ${data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 600;
                  const y = 200 - ((point.value - minValue) / range) * 180;
                  return `L ${x} ${y}`;
                })
                .join(' ')} L 600 200 Z`}
              fill={variant === 'admin' ? 'rgba(167, 139, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'}
            />

            {/* Line */}
            <polyline
              points={data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 600;
                  const y = 200 - ((point.value - minValue) / range) * 180;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke={variant === 'admin' ? '#a78bfa' : '#3b82f6'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 600;
              const y = 200 - ((point.value - minValue) / range) * 180;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={variant === 'admin' ? '#a78bfa' : '#3b82f6'}
                  stroke="#1a1a1a"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        <div className="unit-label">{unit}</div>
      </div>

      <div className="x-axis">
        {data.map((point, index) => {
          // Show every nth label based on data length
          const showLabel = data.length <= 7 || index % Math.ceil(data.length / 7) === 0;
          return showLabel ? (
            <span key={index} className="axis-label">
              {point.label || point.date}
            </span>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default HistoricalTrends;

