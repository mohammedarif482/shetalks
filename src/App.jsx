import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Cards from './components/Cards'
import SocialFooter from './components/SocialFooter'
import ComingSoon from './components/ComingSoon'
import ArohaEvent from './components/ArohaEvent'
import ArohaTerms from './components/ArohaTerms'
import ArohaTicketOffer from './components/ArohaTicketOffer'
import './App.css'

function App() {
  // Check if we're on the aroha subdomain
  const resolveActivePage = () => {
    const { hostname, pathname } = window.location
    const isArohaSubdomain = hostname === 'aroha.theshetalks.club'
    if (pathname === '/aroha/terms' || pathname.includes('/terms')) {
      return 'aroha-terms'
    }
    if (
      pathname === '/aroha/claim-ticket-offer' ||
      pathname.includes('/claim-ticket-offer') ||
      (isArohaSubdomain && pathname === '/claim-ticket-offer')
    ) {
      return 'aroha-ticket-offer'
    }
    if (isArohaSubdomain) {
      return 'aroha'
    }
    return 'community'
  }

  const [activePage, setActivePage] = useState(resolveActivePage)

  // Update active page based on pathname changes
  useEffect(() => {
    setActivePage(resolveActivePage())
  }, [])

  const handlePageChange = (page) => {
    // Don't allow navigation away from aroha page when on aroha subdomain
    if (window.location.hostname === 'aroha.theshetalks.club') {
      return
    }
    setActivePage(page)
  }

  const renderPageContent = () => {
    switch (activePage) {
      case 'community':
        return (
          <>
            <Hero />
            <Cards onPageChange={handlePageChange} />
            <SocialFooter />
          </>
        )
      case 'events':
        return <ComingSoon pageName="Events" onPageChange={handlePageChange} />
      case 'launches':
        return <ComingSoon pageName="Launches" />
      case 'updates':
        return <ComingSoon pageName="Updates" />
      case 'aroha':
        return <ArohaEvent />
      case 'aroha-terms':
        return <ArohaTerms />
      case 'aroha-ticket-offer':
        return <ArohaTicketOffer />
      default:
        return (
          <>
            <Hero />
            <Cards onPageChange={handlePageChange} />
            <SocialFooter />
          </>
        )
    }
  }

  // Don't show header on terms page or ticket offer page
  const showHeader = activePage !== 'aroha-terms' && activePage !== 'aroha-ticket-offer'

  return (
    <div className="app">
      {showHeader && <Header activePage={activePage} onPageChange={handlePageChange} />}
      <main>
        {renderPageContent()}
      </main>
    </div>
  )
}

export default App