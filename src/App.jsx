import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Cards from './components/Cards';
import SocialFooter from './components/SocialFooter';
import ComingSoon from './components/ComingSoon';
import ArohaEvent from './components/ArohaEvent';
import ArohaTerms from './components/ArohaTerms';
import ArohaTicketOffer from './components/ArohaTicketOffer';
import Survey from './components/Survey';

// Admin imports
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ResponsesList from './admin/ResponsesList';
import ResponseView from './admin/ResponseView';
import InsightsPage from './admin/InsightsPage';
import ProtectedRoute from './admin/ProtectedRoute';

import './App.css';

function MainApp() {
  const resolveActivePage = () => {
    const { hostname, pathname } = window.location;
    const isArohaSubdomain = hostname === 'aroha.theshetalks.club';
    if (pathname === '/aroha/terms' || pathname.includes('/terms')) {
      return 'aroha-terms';
    }
    if (
      pathname === '/aroha/claim-ticket-offer' ||
      pathname.includes('/claim-ticket-offer') ||
      (isArohaSubdomain && pathname === '/claim-ticket-offer')
    ) {
      return 'aroha-ticket-offer';
    }
    if (isArohaSubdomain) {
      return 'aroha';
    }
    return 'community';
  };

  const [activePage, setActivePage] = useState(resolveActivePage);

  useEffect(() => {
    setActivePage(resolveActivePage());
  }, []);

  const handlePageChange = (page) => {
    if (window.location.hostname === 'aroha.theshetalks.club') {
      return;
    }
    setActivePage(page);
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'community':
        return (
          <>
            <Hero />
            <Cards onPageChange={handlePageChange} />
            <SocialFooter />
          </>
        );
      case 'events':
        return <ComingSoon pageName="Events" onPageChange={handlePageChange} />;
      case 'launches':
        return <ComingSoon pageName="Launches" />;
      case 'updates':
        return <ComingSoon pageName="Updates" />;
      case 'aroha':
        return <ArohaEvent />;
      case 'aroha-terms':
        return <ArohaTerms />;
      case 'aroha-ticket-offer':
        return <ArohaTicketOffer />;
      case 'survey':
        return <Survey onClose={() => handlePageChange('community')} />;
      default:
        return (
          <>
            <Hero />
            <Cards onPageChange={handlePageChange} />
            <SocialFooter />
          </>
        );
    }
  };

  const showHeader = activePage !== 'aroha-terms' && activePage !== 'aroha-ticket-offer' && activePage !== 'survey';

  return (
    <div className="app">
      {showHeader && <Header activePage={activePage} onPageChange={handlePageChange} />}
      <main>
        {renderPageContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/responses"
          element={
            <ProtectedRoute>
              <ResponsesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/response/:id"
          element={
            <ProtectedRoute>
              <ResponseView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/insights"
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect /admin to /admin/login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
        {/* Main App Routes - everything else */}
        <Route path="*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
