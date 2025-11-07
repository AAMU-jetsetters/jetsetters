# Historical Trends Component Documentation

## Overview
A reusable historical trends chart component that displays time-series data with interactive time range selection. Used across both admin and community sides.

## Component: HistoricalTrends

### Location
`src/components/common/HistoricalTrends.tsx`

## Features

✅ **Interactive Time Range Selection**
- 7 Days
- 30 Days  
- 3 Months

✅ **SVG-Based Line Chart**
- Smooth line graph
- Filled area under curve
- Data point markers
- Grid lines

✅ **Dual Variant Support**
- **Admin variant**: Purple theme (#a78bfa)
- **Community variant**: Blue theme (#3b82f6)

✅ **Responsive Design**
- Mobile-first approach
- Adapts to all screen sizes
- Smart label spacing

✅ **Dynamic Scaling**
- Auto-calculates min/max values
- Y-axis adjusts to data range
- Proper data normalization

## Usage

### Community Side Example:

```typescript
<HistoricalTrends
  title="Water Quality Trend (pH Level)"
  data={[
    { date: 'Nov 1', value: 7.6 },
    { date: 'Nov 2', value: 7.8 },
    { date: 'Nov 3', value: 7.7 },
    // ... more data
  ]}
  timeRange="7days"
  unit="pH"
  variant="community"
/>
```

### Admin Side Example:

```typescript
<HistoricalTrends
  title="Anomaly Score Trend"
  data={[
    { date: 'Nov 1', value: 0.65 },
    { date: 'Nov 2', value: 0.72 },
    // ... more data
  ]}
  timeRange="7days"
  unit="Score"
  variant="admin"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | Chart title |
| data | TrendData[] | Yes | - | Array of data points |
| timeRange | '7days' \| '30days' \| '90days' | No | '7days' | Selected time range |
| onTimeRangeChange | function | No | - | Callback when range changes |
| unit | string | No | '' | Unit label (pH, mg/L, %, etc.) |
| variant | 'admin' \| 'community' | No | 'community' | Color theme variant |

### TrendData Interface:
```typescript
{
  date: string;      // Display label (e.g., "Nov 1", "2024-11-01")
  value: number;     // Numeric value to plot
  label?: string;    // Optional custom label
}
```

## Integration

### Community Home Page:
✅ Added to Water Safety Overview
- Shows 7-day pH level trend
- Blue theme
- Below Health Advisory

### Community Metrics Page:
✅ Two trend charts added:
- Risk Index Trend (%)
- Chlorine Residual Trend (mg/L)
- Blue theme
- Between other metric cards

### Admin Anomaly Overview:
✅ Added Anomaly Score Trend
- Shows 7-day anomaly score history
- Purple theme
- Before Recent Incidents section

## Visual Elements

### Chart Components:
1. **Header**: Title + Time range buttons
2. **Y-Axis**: Min/Mid/Max values
3. **Chart Area**: 
   - Background grid lines
   - Filled area (semi-transparent)
   - Line graph
   - Data point circles
4. **Unit Label**: Top-right corner
5. **X-Axis**: Date labels

### Time Range Buttons:
- Inactive: Gray text, transparent background
- Active: White text, colored background (purple/blue)
- Hover: Lighter background

## Styling

### Colors by Variant:

**Admin (Purple):**
- Active button: #a78bfa
- Line: #a78bfa
- Area fill: rgba(167, 139, 250, 0.1)

**Community (Blue):**
- Active button: #3b82f6
- Line: #3b82f6
- Area fill: rgba(59, 130, 246, 0.1)

### Typography:
- Font: Ubuntu, sans-serif
- Title: 18px, weight 700
- Buttons: 13px, weight 500
- Axis labels: 11-12px

## Data Visualization

### Auto-Scaling:
```typescript
maxValue = Math.max(...data.map(d => d.value))
minValue = Math.min(...data.map(d => d.value))
range = maxValue - minValue

// Y position calculated as:
y = 200 - ((value - minValue) / range) * 180
```

### Smart Label Display:
- Shows all labels if ≤ 7 data points
- Shows every nth label for larger datasets
- Prevents label overlap

## Mock Data Included

### Community Side:
1. **pH Level Trend** (7 days): 7.6 → 7.8 range
2. **Risk Index Trend** (7 days): 55% → 72%
3. **Chlorine Trend** (7 days): 0.78 → 0.9 mg/L

### Admin Side:
1. **Anomaly Score** (7 days): 0.65 → 0.88

## Responsive Behavior

### Mobile (< 768px):
- Stacked layout
- Full-width time range selector
- Smaller chart (180px height)
- Reduced padding

### Desktop (≥ 768px):
- Side-by-side header elements
- Larger chart (200px height)
- More padding

## Future Enhancements

- [ ] Add hover tooltips on data points
- [ ] Add zoom/pan functionality
- [ ] Export chart as image
- [ ] Multiple y-axes for different units
- [ ] Compare multiple datasets
- [ ] Custom date range picker
- [ ] Integrate with charting library (Chart.js, Recharts)
- [ ] Real-time data updates via WebSocket

## Backend Integration

### API Endpoint Structure:
```typescript
GET /api/trends/:metric?range=7days
GET /api/trends/:metric?range=30days
GET /api/trends/:metric?range=90days

Response:
{
  data: [
    { date: "2024-11-01", value: 7.6 },
    { date: "2024-11-02", value: 7.8 },
    ...
  ],
  unit: "pH",
  metric: "water_quality"
}
```

The component is fully functional and ready for real data integration! 📊✨

