# Google Tag Manager Setup Guide for Provident Sunworth

## Your Tracking IDs

- **GA4 Measurement ID**: G-YZLLC4DES1
- **GA4 Tag ID**: GT-K8FLQF8H
- **Google Ads Conversion ID**: AW-17754016716
- **Google Ads Tag ID**: GT-T9KB44PR
- **Facebook Pixel ID**: 1080640150838893
- **Facebook Domain Verification**: csm6vhc53r85yf2v6wdgeljchtb5xb
- **Facebook App ID**: 1080640150838893

## Step 1: Update GTM Container ID

In `index.html`, replace `GTM-XXXXXXX` with your actual GTM Container ID in two locations:

**Line ~21 (head section):**
```javascript
})(window,document,'script','dataLayer','GTM-YOUR-ID-HERE');
```

**Line ~82 (body noscript):**
```html
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-YOUR-ID-HERE"
```

---

## Step 2: Create DataLayer Variables in GTM

Go to **GTM > Variables > User-Defined Variables** and create these:

| Variable Name | Type | DataLayer Variable Name |
|--------------|------|------------------------|
| scrollDepth | Data Layer Variable | scrollDepth |
| scrollPercentage | Data Layer Variable | scrollPercentage |
| sectionName | Data Layer Variable | sectionName |
| sectionId | Data Layer Variable | sectionId |
| clickSource | Data Layer Variable | clickSource |
| ctaText | Data Layer Variable | ctaText |
| ctaLocation | Data Layer Variable | ctaLocation |
| eventCategory | Data Layer Variable | eventCategory |
| eventLabel | Data Layer Variable | eventLabel |
| bhk_preference | Data Layer Variable | bhk_preference |
| conversion_value | Data Layer Variable | conversion_value |
| conversion_currency | Data Layer Variable | conversion_currency |
| transaction_id | Data Layer Variable | transaction_id |
| lead_name | Data Layer Variable | lead_name |
| lead_email | Data Layer Variable | lead_email |
| lead_phone | Data Layer Variable | lead_phone |

---

## Step 3: Create Custom Event Triggers

### 1. Scroll Depth Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `scroll_depth`
- **This trigger fires on**: All Custom Events

### 2. Section View Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `section_view`
- **This trigger fires on**: All Custom Events

### 3. WhatsApp Click Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `whatsapp_click`
- **This trigger fires on**: All Custom Events

### 4. CTA Click Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `cta_click`
- **This trigger fires on**: All Custom Events

### 5. Lead Form Submitted Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `lead_form_submitted`
- **This trigger fires on**: All Custom Events

---

## Step 4: Create Tags

### 1. Google Analytics 4 - Configuration Tag
**Tag Type**: Google Analytics: GA4 Configuration  
**Tag ID**: GT-K8FLQF8H  
**Trigger**: All Pages

### 2. Google Analytics 4 - Scroll Depth Event
**Tag Type**: Google Analytics: GA4 Event  
**Configuration Tag**: [Select GA4 Config Tag]  
**Event Name**: `scroll_depth`  
**Event Parameters**:
- `scroll_depth`: `{{scrollDepth}}`
- `scroll_percentage`: `{{scrollPercentage}}`

**Trigger**: scroll_depth

### 3. Google Analytics 4 - Section View Event
**Tag Type**: Google Analytics: GA4 Event  
**Configuration Tag**: [Select GA4 Config Tag]  
**Event Name**: `section_view`  
**Event Parameters**:
- `section_name`: `{{sectionName}}`
- `section_id`: `{{sectionId}}`

**Trigger**: section_view

### 4. Google Analytics 4 - WhatsApp Click Event
**Tag Type**: Google Analytics: GA4 Event  
**Configuration Tag**: [Select GA4 Config Tag]  
**Event Name**: `whatsapp_click`  
**Event Parameters**:
- `click_source`: `{{clickSource}}`
- `event_category`: `{{eventCategory}}`
- `event_label`: `{{eventLabel}}`

**Trigger**: whatsapp_click

### 5. Google Analytics 4 - CTA Click Event
**Tag Type**: Google Analytics: GA4 Event  
**Configuration Tag**: [Select GA4 Config Tag]  
**Event Name**: `cta_click`  
**Event Parameters**:
- `cta_text`: `{{ctaText}}`
- `cta_location`: `{{ctaLocation}}`
- `event_category`: `{{eventCategory}}`
- `event_label`: `{{eventLabel}}`

**Trigger**: cta_click

### 6. Google Analytics 4 - Lead Generation Event
**Tag Type**: Google Analytics: GA4 Event  
**Configuration Tag**: [Select GA4 Config Tag]  
**Event Name**: `generate_lead`  
**Event Parameters**:
- `bhk_preference`: `{{bhk_preference}}`
- `value`: `{{conversion_value}}`
- `currency`: `{{conversion_currency}}`
- `transaction_id`: `{{transaction_id}}`

**Trigger**: lead_form_submitted

### 7. Google Ads Conversion Tag
**Tag Type**: Google Ads Conversion Tracking  
**Conversion ID**: `AW-17754016716`  
**Conversion Label**: [Get from Google Ads account]  
**Conversion Value**: `{{conversion_value}}`  
**Currency Code**: `{{conversion_currency}}`  
**Transaction ID**: `{{transaction_id}}`  
**Trigger**: lead_form_submitted

### 8. Facebook Pixel - Base Code
**Tag Type**: Custom HTML  
**Trigger**: All Pages

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1080640150838893');
  fbq('track', 'PageView');
</script>
```

### 9. Facebook Pixel - Lead Event
**Tag Type**: Custom HTML  
**Trigger**: lead_form_submitted

```html
<script>
  fbq('track', 'Lead', {
    content_name: 'Provident Sunworth Lead Form',
    content_category: {{bhk_preference}},
    value: {{conversion_value}},
    currency: {{conversion_currency}}
  });
</script>
```

---

## Step 5: Test Your Setup

### Using GTM Preview Mode:
1. Click **Preview** in GTM
2. Enter your website URL
3. Navigate through your site

### Check These Events Fire:
- ✅ **scroll_depth** at 25%, 50%, 75%, 100%
- ✅ **section_view** for each major section:
  - Hero Section
  - Project Summary
  - Floor Plans
  - Home Size Advisor
  - Location & Connectivity
  - Amenities
  - Views & Gallery
  - Construction Status
  - Payment Plans
  - Loan Eligibility
  - Customer Testimonials
  - Brochure Download
  - About Provident
  - FAQ

- ✅ **whatsapp_click** when WhatsApp is clicked
- ✅ **cta_click** when any CTA is clicked
- ✅ **lead_form_submitted** when form is submitted

### Verify in Analytics:
- **Google Analytics 4**: Realtime > Events
- **Google Ads**: Conversions (24-48 hour delay)
- **Facebook**: Events Manager

---

## Benefits of This Setup:

✅ **Scroll Depth Tracking**: Measure engagement at 25%, 50%, 75%, 100%  
✅ **Section View Tracking**: Know which sections users view  
✅ **CTA Performance**: Track every call-to-action click  
✅ **WhatsApp Tracking**: Measure WhatsApp engagement  
✅ **Conversion Attribution**: Full funnel visibility  
✅ **Cross-Platform**: Same events across GA4, Google Ads, and Facebook  

---

## Advanced Analysis Ideas:

### Conversion Path Analysis:
Track which sections users view before converting:
1. Create custom GA4 exploration
2. Use `section_view` events as milestones
3. Identify high-converting section sequences

### Scroll Depth vs. Conversion:
Compare scroll depth of converters vs. non-converters:
1. Create audience: Users who triggered `lead_form_submitted`
2. Compare scroll_depth distribution
3. Optimize page length based on insights

### CTA Heatmap:
Identify which CTAs drive most conversions:
1. Use `cta_location` dimension
2. Compare click-through rates
3. A/B test underperforming CTAs

---

## Troubleshooting:

### Events Not Firing?
1. Check GTM Preview mode shows events
2. Verify dataLayer variables populate
3. Check browser console for errors

### Data Not in GA4?
1. Wait 24-48 hours for initial data
2. Check Realtime reports first
3. Verify Measurement ID is correct

### Conversions Not in Google Ads?
1. Verify Conversion Label is set
2. Check conversion tag fires in Preview
3. Wait 24-48 hours for reporting

---

## Support Resources:

- [GTM Documentation](https://support.google.com/tagmanager)
- [GA4 Events Guide](https://support.google.com/analytics/answer/9322688)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/6095821)
- [Facebook Pixel Guide](https://www.facebook.com/business/help/952192354843755)
