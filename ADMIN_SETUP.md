# SheTalks Admin Dashboard - Setup Guide

## 📋 Overview

A comprehensive admin dashboard for analyzing survey responses with AI-powered insights, charts, filters, and more.

## 🎯 Features

### 1. Admin Login (`/admin/login`)
- Secure email/password authentication via Firebase
- Admin email validation
- Automatic redirect to dashboard on success

### 2. Dashboard Overview (`/admin/dashboard`)
- **Stats Cards**: Total responses, completed surveys, completion rate, today's responses
- **Charts**:
  - Age Distribution (Pie Chart)
  - Biggest Frustrations (Bar Chart)
  - Partner Tool Interest (Pie Chart)
  - Payment Willingness (Bar Chart)
- Real-time refresh functionality

### 3. All Responses (`/admin/dashboard/responses`)
- Paginated table (50 per page)
- **Filters**:
  - Age groups (checkbox)
  - Life stages (checkbox)
  - Date range (date picker)
- Export all responses to CSV
- View individual response details

### 4. Single Response View (`/admin/dashboard/response/:id`)
- Organized by sections:
  - Demographics
  - Health Tracking
  - Partner Communication (with comfort ratings)
  - Pain Points (with impact ratings)
  - AI & Technology
  - Final Questions
- Visual rating bars for matrix questions

### 5. AI Gap Analysis (`/admin/dashboard/insights`)
The most powerful feature! AI-powered market analysis using Gemini API.

**Insights Generated**:
- Primary Market Gap (with severity and evidence)
- Top 3 Secondary Gaps
- Best Target Audience
- Partner Communication Gap Validation
- Feature Prioritization (Must-Have, Differentiating, Nice-to-Have)
- Monetization Insights (pricing, conversion rates)
- AI Adoption Readiness
- Product Strategy Recommendations
- Supporting User Quotes
- Executive Summary

**Features**:
- 1-hour caching system
- Regenerate with latest data
- Collapsible sections
- Copy to clipboard
- Export to PDF (via browser print)

## 🚀 Installation & Setup

### 1. Install Dependencies

The required packages have already been installed:
```bash
npm install firebase recharts date-fns jspdf
```

### 2. Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Admin Configuration
VITE_ADMIN_EMAIL=admin@example.com

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Firebase Setup

#### Enable Authentication:
1. Go to Firebase Console → Authentication
2. Enable "Email/Password" sign-in method
3. Create an admin user with the email you specified in `VITE_ADMIN_EMAIL`

#### Firestore Database:
Set up these collections:

**Collection: `survey_responses`**
- Auto-created when users submit surveys
- Fields: q1, q2, q3, ... q31, submittedAt, completed

**Collection: `insights_reports`**
- Stores historical AI analysis reports
- Fields: content (string), responseCount (number), generatedAt (timestamp)

**Collection: `admin_cache`**
- Stores cached insights
- Document ID: `insights_latest`
- Fields: data (object), generatedAt (timestamp), expiresAt (timestamp), responseCount (number)

#### Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Survey responses - read-only for authenticated users
    match /survey_responses/{responseId} {
      allow read: if request.auth != null;
      allow write: if true; // Allow public writes for survey submission
    }
    
    // Admin cache - only for authenticated admin
    match /admin_cache/{document=**} {
      allow read, write: if request.auth != null && 
                          request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
    
    // Insights reports - only for authenticated admin
    match /insights_reports/{document=**} {
      allow read, write: if request.auth != null && 
                          request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
  }
}
```

### 4. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

### 5. Run Development Server

```bash
npm run dev
```

## 🔐 Admin Access

### Login
1. Navigate to `http://localhost:5173/admin/login`
2. Enter your admin email and password
3. On successful login, you'll be redirected to the dashboard

### Security Features
- Protected routes (redirect to login if not authenticated)
- Email validation (only specified admin email can access)
- Automatic logout if unauthorized email attempts to access
- Firebase authentication persistence

## 📊 Using the Dashboard

### Dashboard Overview
- View real-time statistics at the top
- Scroll down to see various charts
- Click "Refresh" to reload latest data
- Click "View All Responses" to see detailed list
- Click "AI Insights" for gap analysis

### Viewing Responses
- Use filters to narrow down responses
- Click "View" on any row to see full details
- Export all data to CSV for external analysis

### AI Gap Analysis
1. Click "Generate AI Gap Analysis" button
2. Wait 30-60 seconds for analysis (progress shown)
3. Review generated insights in collapsible sections
4. Use "Expand All" / "Collapse All" for easy navigation
5. Click "Regenerate" to analyze with latest data (bypasses cache)
6. Copy insights to clipboard or export to PDF

## 📁 Project Structure

```
src/
├── admin/
│   ├── AdminLogin.jsx         # Login page
│   ├── AdminLogin.css
│   ├── AdminDashboard.jsx     # Overview dashboard
│   ├── AdminDashboard.css
│   ├── ResponsesList.jsx      # All responses with filters
│   ├── ResponsesList.css
│   ├── ResponseView.jsx       # Single response detail
│   ├── ResponseView.css
│   ├── InsightsPage.jsx       # AI gap analysis
│   ├── InsightsPage.css
│   └── ProtectedRoute.jsx     # Route protection wrapper
├── firebase/
│   └── config.js              # Firebase configuration
└── App.jsx                    # Main app with routing
```

## 🎨 Features Breakdown

### Charts (recharts)
- Responsive design
- Interactive tooltips
- Color-coded for easy reading
- Pie charts for distributions
- Bar charts for comparisons

### Filters
- Multiple filter types (checkboxes, date range)
- Real-time filtering
- Clear filters button
- Filter state preserved during pagination

### Pagination
- 50 items per page
- Smart page number display
- Previous/Next navigation
- Scroll to top on page change

### CSV Export
- Exports all responses
- Includes all question columns
- Properly escapes special characters
- Timestamped filename

### AI Analysis
- Uses Gemini 1.5 Flash model
- Comprehensive data aggregation
- Structured JSON response
- 1-hour caching system
- Error handling

## 🔧 Troubleshooting

### "Not authorized" error on login
- Verify the logged-in email matches `VITE_ADMIN_EMAIL` in `.env`
- Check Firebase Console that the user exists

### Charts not displaying
- Check that `survey_responses` collection has data
- Verify Firestore security rules allow read access

### AI insights generation fails
- Verify `VITE_GEMINI_API_KEY` is correct
- Check browser console for API errors
- Ensure you have sufficient Gemini API quota

### Firebase connection errors
- Double-check all Firebase config variables in `.env`
- Verify project ID matches your Firebase project

## 🚀 Deployment Notes

### Environment Variables
Make sure to set all environment variables in your hosting platform:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Build & deploy → Environment

### Build Command
```bash
npm run build
```

### Routes Configuration
For hosting platforms, ensure `/admin/*` routes are handled by your app:

**Vercel (`vercel.json`)**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Netlify (`_redirects`)**:
```
/*    /index.html   200
```

## 📝 Notes

### Performance
- Dashboard loads quickly with optimized queries
- Charts render efficiently with recharts
- Pagination keeps response list performant
- AI analysis cached for 1 hour to reduce API calls

### Data Privacy
- Admin access is restricted to specified email
- All routes are protected
- Firebase security rules enforce access control

### Future Enhancements
- Add more chart types (line charts for trends over time)
- Advanced filters (search by keywords)
- Email notifications for new responses
- Scheduled AI reports
- User management (multiple admin users)

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all environment variables are set
3. Check Firebase Console for authentication/database issues
4. Review Gemini API quota and errors

---

**Built with ❤️ for SheTalks**

