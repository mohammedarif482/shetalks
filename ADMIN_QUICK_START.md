# 🚀 Admin Dashboard - Quick Start

## ⚡ Get Started in 5 Minutes

### Step 1: Setup Environment Variables

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=your_admin@email.com
VITE_GEMINI_API_KEY=your_gemini_key
```

### Step 2: Firebase Setup

1. **Enable Email Authentication:**
   - Firebase Console → Authentication → Sign-in method
   - Enable "Email/Password"

2. **Create Admin User:**
   - Firebase Console → Authentication → Users
   - Click "Add user"
   - Use the same email as `VITE_ADMIN_EMAIL`

3. **Firestore Collections:**
   Collections are auto-created, but ensure these rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /survey_responses/{responseId} {
         allow read: if request.auth != null;
         allow write: if true;
       }
       match /admin_cache/{document=**} {
         allow read, write: if request.auth != null;
       }
       match /insights_reports/{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

### Step 3: Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and add to `.env`

### Step 4: Run the App

```bash
npm run dev
```

Navigate to: `http://localhost:5173/admin/login`

---

## 📍 Admin Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Login page |
| `/admin/dashboard` | Overview with stats & charts |
| `/admin/dashboard/responses` | All responses with filters |
| `/admin/dashboard/response/:id` | Single response details |
| `/admin/dashboard/insights` | AI gap analysis |

---

## 🎯 Common Tasks

### View Latest Responses
1. Login → Dashboard
2. Click "View All Responses"
3. Responses sorted by newest first

### Filter Responses
1. Go to "All Responses" page
2. Use checkboxes for Age/Life Stage
3. Or set Date Range
4. Click "Apply Filters" (automatic)
5. Click "Clear Filters" to reset

### Export Data
1. Go to "All Responses"
2. Click "Export CSV" button
3. CSV downloads with all questions

### Generate AI Insights
1. Go to Dashboard
2. Click "AI Insights" button
3. Click "Generate AI Gap Analysis"
4. Wait 30-60 seconds
5. Review collapsible sections
6. Use "Expand All" to see everything

### Regenerate Fresh Insights
1. On Insights page
2. Click "Regenerate with Latest Data"
3. This bypasses 1-hour cache

---

## 💡 Pro Tips

### Dashboard
- **Refresh button** reloads all stats and charts
- Charts are interactive - hover for details
- Stats update in real-time on refresh

### Responses List
- Use filters to find specific segments
- Pagination shows 50 per page
- Export includes ALL responses (not just current page)

### Response Details
- Color-coded sections for easy scanning
- Rating bars show 1-5 scale visually
- Highlighted fields = most important data

### AI Insights
- Insights cached for 1 hour (faster subsequent loads)
- "Fresh" badge = just generated
- "Cached" badge = from cache (< 1 hour old)
- Each section collapsible for focus
- Copy button → copies full JSON
- Export PDF → use browser print (Cmd/Ctrl+P)

---

## 🔥 Key Features

### Charts
- **Age Distribution**: See your user demographics
- **Frustrations**: Top pain points ranked
- **Partner Tool Interest**: Validation for partner features
- **Payment Willingness**: Monetization insights

### AI Analysis Sections
1. **Primary Market Gap**: Your biggest opportunity
2. **Secondary Gaps**: Other opportunities
3. **Target Audience**: Who to build for
4. **Partner Gap Validation**: Is this need real?
5. **Feature Prioritization**: What to build first
6. **Monetization**: How to price
7. **AI Adoption**: Will users trust AI?
8. **Recommendations**: Actionable next steps
9. **Quotes**: Real user voices
10. **Executive Summary**: TL;DR

---

## ⚠️ Troubleshooting

### Can't Login
- Check email matches `VITE_ADMIN_EMAIL` exactly
- Verify user exists in Firebase Auth
- Check Firebase project is correct

### "Not Authorized" Error
- Email doesn't match admin email
- Auto-logs you out for security

### Charts Empty
- No survey responses yet
- Check Firestore has `survey_responses` collection
- Verify Firestore rules allow read

### AI Insights Fail
- Check Gemini API key is valid
- Verify API quota not exceeded
- Check browser console for errors
- Need at least 1 survey response

### Slow Performance
- Normal for first AI generation (30-60s)
- Subsequent loads use cache (instant)
- Refresh cache expires after 1 hour

---

## 📊 Understanding the Data

### Question Mapping
- **Q1**: Age group
- **Q3**: Has partner
- **Q10_1 to Q10_5**: Comfort levels (1-5 scale)
- **Q15**: Would use partner tool
- **Q18**: Biggest frustration
- **Q19_1 to Q19_5**: Impact ratings (1-5 scale)
- **Q27**: Payment willingness
- **Q28**: Life stage
- **Q17, Q23, Q29**: Open-ended responses

### Completion Rate
- `completed: true` = user finished entire survey
- Use this to track survey quality

### Partner Data
- Filtered automatically when relevant
- Q15 = key validation question
- Q10 ratings = communication comfort

---

## 🎨 UI Features

### Color Coding
- 🟣 Purple gradient = primary actions
- 🟢 Green = refresh/regenerate
- 🔴 Red = logout/clear
- 🔵 Blue = secondary actions

### Responsive Design
- Mobile-friendly tables
- Collapsible filters on mobile
- Touch-friendly buttons

### Animations
- Smooth section expand/collapse
- Hover effects on cards
- Loading states

---

## 🚀 Next Steps After Setup

1. **Test Login**: Verify admin authentication works
2. **Check Dashboard**: Ensure charts render (if data exists)
3. **Generate Insights**: Run first AI analysis
4. **Review Insights**: Validate AI recommendations make sense
5. **Export Data**: Test CSV export functionality

---

## 📝 Notes

- **Cache Duration**: AI insights cache for 1 hour
- **Pagination**: 50 responses per page
- **CSV Export**: Includes all 31+ question columns
- **Security**: All admin routes protected
- **API Limits**: Gemini has free tier limits

---

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Review `ADMIN_SETUP.md` for detailed guide
3. Verify all environment variables set
4. Check Firebase Console for data/auth issues
5. Review Gemini API status

---

**Happy analyzing! 🎉**

