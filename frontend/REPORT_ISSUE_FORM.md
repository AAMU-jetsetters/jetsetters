# Report Issue Form Documentation

## Overview
A comprehensive modal form for community members to report water quality issues and concerns directly from the home page.

## Component: ReportIssueForm

### Location
`src/components/community/ReportIssueForm.tsx`

## Features

✅ **Modal Overlay** - Full-screen overlay with blur effect
✅ **Comprehensive Form** - All necessary fields for issue reporting
✅ **Priority Selection** - Color-coded priority buttons
✅ **Validation** - Required field validation with error messages
✅ **Loading States** - Disabled state during submission
✅ **Responsive Design** - Mobile-optimized modal
✅ **Ubuntu Font** - Consistent typography
✅ **Smooth Animations** - Slide-in animation on open

## Form Fields

### Required Fields (*)
1. **Issue Type** - Dropdown select
   - Water Quality Concern
   - Unusual Taste or Odor
   - Discolored Water
   - Low Water Pressure
   - Leak or Pipe Issue
   - Billing Question
   - Other

2. **Priority** - Button group
   - Low (Green)
   - Medium (Yellow)
   - High (Orange)
   - Urgent (Red)

3. **Location/Address** - Text input
   - Where the issue is occurring

4. **Description** - Textarea (4 rows)
   - Detailed description of the issue

### Optional Fields
5. **Contact Email** - Email input
6. **Contact Phone** - Phone input

## Usage

### In Community Home Page:

```typescript
import ReportIssueForm from '../../components/community/ReportIssueForm';
import type { IssueData } from '../../components/community/ReportIssueForm';

const [showReportForm, setShowReportForm] = useState(false);

// Open form
<button onClick={() => setShowReportForm(true)}>
  Report Issue
</button>

// Render form
{showReportForm && (
  <ReportIssueForm 
    onClose={() => setShowReportForm(false)}
    onSubmit={(issue) => {
      console.log('Submitted:', issue);
      // Handle submission
    }}
  />
)}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onClose | () => void | No | Callback when form is closed |
| onSubmit | (issue: IssueData) => void | No | Callback when form is submitted |

### IssueData Interface:
```typescript
{
  issueType: string;
  description: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  contactEmail?: string;
  contactPhone?: string;
}
```

## Integration

### Trigger Button:
The form opens when user clicks **"Report Issue"** button in the Community Actions section on the home page.

### User Flow:
1. User clicks "Report Issue" button
2. Modal slides in with overlay
3. User fills out form
4. User selects priority level
5. User clicks "Submit Report"
6. Form validates inputs
7. Shows success message
8. Modal closes
9. Form resets

## Validation

### Required Field Checks:
- Issue Type must be selected
- Description must not be empty
- Location must not be empty

### Error Display:
- All errors shown at top of form
- Red background with left border
- Clear error messages
- Disappears when fixed

## Visual Design

### Modal:
- Dark background (#1a1a1a)
- Rounded corners (16px)
- Drop shadow
- Blur backdrop
- Maximum width: 600px
- Maximum height: 90vh (scrollable)

### Priority Buttons:
Active states with color coding:
- **Low**: Green (#10b981)
- **Medium**: Yellow (#fbbf24)
- **High**: Orange (#f97316)
- **Urgent**: Red (#ef4444)

### Action Buttons:
- **Cancel**: Gray background
- **Submit**: Purple gradient
- Full width on mobile
- Side-by-side on desktop

## Responsive Behavior

### Mobile (< 768px):
- Full-screen modal (95vh)
- Stacked form fields
- Single column contact fields
- Stacked action buttons
- 2x2 priority grid

### Desktop (≥ 768px):
- Centered modal (max 600px)
- Two-column contact fields
- Side-by-side action buttons
- 4-column priority grid

## Animations

### Modal Open:
```css
@keyframes modalSlideIn {
  from: opacity 0, translateY(-20px)
  to: opacity 1, translateY(0)
}
```
Duration: 0.3s ease-out

### Button Hover:
- Background color change
- Transform translateY(-2px) on submit button

## Close Behaviors

### Ways to Close:
1. Click X button (top-right)
2. Click overlay background
3. Click Cancel button
4. After successful submission

### On Close:
- Form resets to default values
- Errors cleared
- Modal unmounts

## Mock Submission

Currently simulates API call:
```typescript
// 1 second delay
await new Promise(resolve => setTimeout(resolve, 1000))

// Console log
console.log('Issue submitted:', formData)

// Success alert
alert('Thank you! Your report has been submitted successfully.')
```

## Backend Integration

### API Endpoint:
```typescript
POST /api/community/report-issue

Request Body:
{
  issueType: string,
  description: string,
  location: string,
  priority: "Low" | "Medium" | "High" | "Urgent",
  contactEmail?: string,
  contactPhone?: string,
  userId?: string,
  timestamp: Date
}

Response:
{
  success: boolean,
  issueId: string,
  message: string
}
```

### Expected Backend Actions:
1. Validate form data
2. Create issue record in database
3. Send confirmation email (if email provided)
4. Notify utility company
5. Assign issue tracking number
6. Send SMS notification (if phone provided)
7. Create timeline entry
8. Return success response

## Integration Points

### Community Home Page:
- ✅ Integrated into WaterSafetyOverview
- ✅ Opens from "Report Issue" button
- ✅ Below Health Advisory section

### Future Enhancements:
- [ ] Photo upload capability
- [ ] Location auto-detect (GPS)
- [ ] Real-time status tracking
- [ ] Issue history view
- [ ] Push notifications on status updates
- [ ] Multi-language support
- [ ] Voice input for description
- [ ] Template quick selections

## Accessibility

✅ **ARIA Labels** on close button
✅ **Required field indicators** (*)
✅ **Keyboard navigation** support
✅ **Focus management** in modal
✅ **Screen reader friendly** labels

## Typography

All text uses **Ubuntu font**:
- Title: 24px, weight 700
- Labels: 14px, weight 600
- Inputs: 14px, weight 400
- Buttons: 15px, weight 600
- Error messages: 14px

## Example Submitted Data

```json
{
  "issueType": "Discolored Water",
  "description": "Water coming out of tap has a brownish tint, especially in the morning. Started 2 days ago.",
  "location": "123 Main St, Apt 4B",
  "priority": "High",
  "contactEmail": "resident@example.com",
  "contactPhone": "+1234567890"
}
```

## Testing

### Test Cases:
1. ✅ Submit without required fields → Show errors
2. ✅ Select each priority level → Visual feedback
3. ✅ Fill all fields and submit → Success
4. ✅ Close via X button → Modal closes
5. ✅ Close via overlay click → Modal closes
6. ✅ Close via Cancel → Modal closes

The form is production-ready and waiting for backend API integration! 📝✅

