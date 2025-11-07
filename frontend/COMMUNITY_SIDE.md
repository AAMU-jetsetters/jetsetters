# Community Side - Water Safety Overview

## Overview
The Community Water Status page provides real-time water quality information to community members with a mobile-first design.

## 📱 Mobile-First Design

The page is optimized for mobile devices but fully responsive for tablets and desktops.

## Components Created

### 1. **StatusCard Component** (`StatusCard.tsx`)
Displays the overall water safety status for the community.

**Features:**
- Shield icon with checkmark (safety indicator)
- "Community Water Status" title
- Risk level display (Low Risk, Medium Risk, High Risk, Critical)
- Color-coded status (green for low, yellow for medium, orange for high, red for critical)
- Descriptive text about current water quality
- **Ubuntu font** throughout

### 2. **HealthAdvisory Component** (`HealthAdvisory.tsx`)
Shows health-related advisories and safety information.

**Features:**
- "Health Advisory" title with info icon
- Advisory message for vulnerable populations
- Last updated timestamp
- Purple "View Details" button
- Card-style design with dark background
- **Ubuntu font** throughout

### 3. **CommunityActions Component** (`CommunityActions.tsx`)
Provides action buttons for community resources.

**Features:**
- "Community Resources & Reporting" title
- Two action buttons:
  - **Contact Utility** (phone icon)
  - **Report Issue** (megaphone icon)
- Purple "View FAQ" link
- **Ubuntu font** throughout

### 4. **BottomNav Component** (`BottomNav.tsx`)
Fixed bottom navigation for mobile devices.

**Features:**
- Three navigation items:
  - **Home** (house icon) - Water Safety Overview
  - **Metrics** (chart icon) - Water quality metrics
  - **Profile** (person icon) - User profile
- Active state with purple highlight
- Auto-hidden on desktop (≥768px)
- **Ubuntu font** throughout

### 5. **WaterSafetyOverview Page** (`WaterSafetyOverview.tsx`)
Main community page integrating all components.

## 📐 Layout Structure

```
┌─────────────────────────────┐
│ [Water Icon]                │ ← Header
├─────────────────────────────┤
│      [Shield Icon]          │
│  Community Water Status     │
│       Low Risk              │ ← Status Card
│   [Description text]        │
├─────────────────────────────┤
│   Health Advisory           │
│   [Advisory text]           │
│   Updated: [timestamp]      │ ← Advisory Card
│   [View Details Button]    │
├─────────────────────────────┤
│ Community Resources         │
│ [Contact Utility Button]   │ ← Action Buttons
│ [Report Issue Button]      │
│ View FAQ                    │
├─────────────────────────────┤
│ [Home] [Metrics] [Profile] │ ← Bottom Nav
└─────────────────────────────┘
```

## 🎨 Design System

### Colors
- **Background**: `#000000` - Main app background
- **Cards**: `#1a1a1a` - Card backgrounds
- **Text Primary**: `#ffffff` - Main text
- **Text Secondary**: `#e0e0e0` - Body text
- **Text Muted**: `#a0a0a0` - Timestamps, labels
- **Purple (Primary)**: `#a78bfa` - Buttons, links, active states
- **Purple Hover**: `#8b5cf6` - Hover states
- **Success/Low Risk**: `#10b981` - Green status
- **Warning/Medium**: `#fbbf24` - Yellow status
- **High Risk**: `#f97316` - Orange status
- **Critical**: `#ef4444` - Red status

### Typography
- **Font Family**: 'Ubuntu', sans-serif
- **Title**: 20px, weight 700
- **Status**: 28px, weight 700
- **Body Text**: 14-15px, weight 400
- **Small Text**: 13px, weight 400

### Spacing
- **Mobile Padding**: 24px horizontal
- **Card Padding**: 20px
- **Section Gaps**: 16px-24px

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Bottom navigation visible
- Stacked action buttons
- Optimized padding and spacing

### Tablet (768px - 1024px)
- Centered content (max-width: 800px)
- Bottom navigation hidden
- Horizontal action buttons
- Larger header icon

### Desktop (> 1024px)
- Centered content (max-width: 1200px)
- Increased padding
- Spacious layout

## 🔄 Interactive Elements

### Actions Available:
1. **View Details** - Opens detailed health advisory
2. **Contact Utility** - Contacts water utility company
3. **Report Issue** - Reports water quality issues
4. **View FAQ** - Opens frequently asked questions
5. **Navigation** - Switch between Home, Metrics, Profile

## 💾 Mock Data

### Default Status:
```typescript
{
  riskLevel: "Low Risk",
  description: "Water quality in your area currently indicates low risk. Continue to monitor updates for any changes."
}
```

### Default Advisory:
```typescript
{
  advisory: "Local water sources are safe for consumption. However, children under 2 and immunocompromised individuals should boil water for 1 minute.",
  updatedAt: "2024-07-26 10:30 AM"
}
```

## 🚀 Usage

The community dashboard is now integrated into the app. To view it:

**Option 1: Direct access (for development)**
In `App.tsx`, change:
```typescript
const [currentScreen, setCurrentScreen] = useState<Screen>('community-dashboard')
```

**Option 2: After authentication**
The community dashboard can be shown after successful login based on user role.

## 📊 Future Sections

### Metrics Tab (Placeholder created)
Will show:
- Historical water quality data
- Charts and graphs
- Trend analysis
- Comparison with safety standards

### Profile Tab (Placeholder created)
Will show:
- User information
- Notification settings
- Alert preferences
- Saved locations

## 🎯 Key Features

✅ **Mobile-First Design** - Optimized for phones first
✅ **Responsive Layout** - Adapts to all screen sizes
✅ **Ubuntu Font** - Consistent typography
✅ **Dark Theme** - Easy on the eyes
✅ **Clear Status Indicators** - Color-coded risk levels
✅ **Bottom Navigation** - Easy mobile navigation
✅ **Action Buttons** - Quick access to resources
✅ **Health Advisory** - Important safety information
✅ **Accessible** - ARIA labels and semantic HTML

## 🔌 Backend Integration Points

### Required APIs:
```
GET  /api/community/water-status      # Current water quality status
GET  /api/community/health-advisory   # Latest health advisory
GET  /api/community/resources         # Contact info, FAQs
POST /api/community/report-issue      # Submit issue reports
GET  /api/community/metrics           # Water quality metrics
GET  /api/community/user-profile      # User settings
```

### WebSocket for Real-Time Updates:
```
WS   /ws/community/status-updates     # Live status changes
```

## 🎨 Component Architecture

```
pages/community/
└── WaterSafetyOverview.tsx    # Main page

components/community/
├── StatusCard.tsx             # Water status display
├── HealthAdvisory.tsx         # Advisory card
├── CommunityActions.tsx       # Resource buttons
└── BottomNav.tsx             # Mobile navigation
```

All components use:
- Separate CSS files
- TypeScript interfaces
- Props for dynamic data
- Ubuntu font family
- Responsive design
- Dark theme

## 📝 Notes

- Page currently set to display by default in `App.tsx` for easy testing
- All data is currently mocked and ready to be replaced with API calls
- Bottom navigation automatically hides on desktop
- Safe area insets included for iOS devices (notch support)
- All buttons have hover and active states
- Components are reusable and prop-driven

The community side is now complete and ready for backend integration! 📱💧

