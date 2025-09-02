# Google Analytics Setup Guide

## Overview
Google Analytics has been integrated into the MC-Hub website to track visitor behavior, user engagement, and conversion events.

## Setup Instructions

### 1. Create a Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Select "Web" as your platform
5. Enter your website details:
   - Account name: MC-Hub
   - Property name: MC-Hub Website
   - Website URL: `http://localhost:5173` (for development) or your production URL
   - Industry: Real Estate or Construction
   - Business size: Your choice

### 2. Get Your Measurement ID
1. After creating the property, you'll see your **Measurement ID** (format: G-XXXXXXXXXX)
2. Copy this ID

### 3. Update the Tracking Code
1. Open `index.html`
2. Find the line: `gtag('config', 'GA_MEASUREMENT_ID');`
3. Replace `GA_MEASUREMENT_ID` with your actual Measurement ID
4. Also update the script src: `https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`

Example:
```javascript
gtag('config', 'G-ABC123DEF4');
```

And:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
```

## Tracked Events

### Page Views
- **Section Navigation**: Tracks when users navigate between different sections (home, features, pricing, etc.)
- **Custom Page Views**: Each section is treated as a virtual page view

### User Interactions
- **Navigation Clicks**: Tracks clicks on navigation menu items
- **Button Clicks**: Categorizes button clicks by type:
  - Sign up / Get started buttons
  - Login buttons
  - Demo request buttons
  - Pricing inquiry buttons
  - Form submission buttons

### Form Submissions
- **Signup Form**: Tracks when users submit the registration form
- **Login Form**: Tracks login attempts
- **Contact Form**: Tracks contact form submissions

### Engagement Metrics
- **Section Visibility**: Tracks when users scroll to and view different sections
- **Scroll Depth**: Tracks how far users scroll down the page (25%, 50%, 75%, 90%, 100%)

## Event Categories

### Navigation
- `page_view`: Section navigation
- `click`: Navigation link clicks

### Engagement
- `click`: Button interactions
- `section_view`: Section visibility
- `scroll_depth`: Scroll milestones

### Conversion
- `form_submit`: Form submissions

## Testing the Implementation

1. Open your website in a browser
2. Open browser developer tools (F12)
3. Go to the Network tab
4. Look for requests to `google-analytics.com` or `googletagmanager.com`
5. Navigate through different sections and interact with buttons
6. Check the Real-time reports in Google Analytics to see events being tracked

## Viewing Analytics Data

1. Go to your Google Analytics dashboard
2. Navigate to **Realtime** > **Events** to see live tracking
3. Use **Reports** > **Engagement** > **Events** for historical data
4. Create custom reports for specific metrics

## Best Practices

1. **Privacy Compliance**: Ensure you have a privacy policy that mentions Google Analytics
2. **Cookie Consent**: Consider implementing cookie consent for GDPR compliance
3. **Data Retention**: Configure data retention settings in Google Analytics
4. **Regular Monitoring**: Check analytics data regularly to understand user behavior

## Troubleshooting

### Events Not Showing Up
- Wait 24-48 hours for data to appear in standard reports
- Check that your Measurement ID is correct
- Verify that the gtag script is loading (check Network tab)

### Incorrect Event Tracking
- Use Google Analytics DebugView to see real-time events
- Check browser console for JavaScript errors
- Verify event parameters are correctly formatted

## Advanced Configuration

For more advanced tracking, consider:
- **E-commerce Tracking**: Track pricing plan selections
- **Custom Dimensions**: Add user role or company size tracking
- **Goals and Conversions**: Set up conversion funnels
- **Audiences**: Create user segments based on behavior

## Support

For Google Analytics setup help:
- [Google Analytics Help Center](https://support.google.com/analytics)
- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [gtag.js Reference](https://developers.google.com/analytics/devguides/collection/gtagjs)
