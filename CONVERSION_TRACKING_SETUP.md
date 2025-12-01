# Google Ads Conversion Tracking Setup

## Important: Set Your Conversion Label

The lead form is configured to track conversions, but you need to add your specific conversion label from Google Ads.

### How to Get Your Conversion Label:

1. Go to your Google Ads account: https://ads.google.com
2. Navigate to **Tools & Settings** > **Measurement** > **Conversions**
3. Find or create a conversion action for "Lead Form Submission"
4. Click on the conversion action to view details
5. Copy the **Conversion ID** and **Conversion Label**

### Update the Code:

In `src/components/LeadForm.tsx`, find this line (around line 64):

```typescript
'send_to': 'AW-17754016716/CONVERSION_LABEL',
```

Replace `CONVERSION_LABEL` with your actual label. It should look like:

```typescript
'send_to': 'AW-17754016716/AbCdEfGhIjKlMnOp',
```

## What's Already Configured:

✅ Google Ads Conversion tracking
✅ Google Analytics 4 (generate_lead event)
✅ Facebook Pixel Lead event
✅ Custom GTM dataLayer events

## Testing Your Conversions:

1. Submit a test form
2. Check Google Ads > Tools > Conversions to see if it's registered
3. Check Google Analytics 4 > Reports > Engagement > Events
4. Check Facebook Events Manager for Lead events

## Current Tracking IDs:

- **Google Ads ID**: AW-17754016716
- **GA4 ID**: G-YZLLC4DES1
- **Facebook Pixel ID**: 1080640150838893
