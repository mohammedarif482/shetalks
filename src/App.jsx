import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Cards from './components/Cards'
import SocialFooter from './components/SocialFooter'
import ComingSoon from './components/ComingSoon'
import ArohaEvent from './components/ArohaEvent'
import ArohaTerms from './components/ArohaTerms'
import './App.css'

function App() {
  // Check if we're on the aroha subdomain
  const isArohaSubdomain = window.location.hostname === 'aroha.theshetalks.club'
  
  // Check if we're on the terms page
  const isTermsPage = window.location.pathname === '/aroha/terms' || window.location.pathname.includes('/terms')
  
  const [activePage, setActivePage] = useState(() => {
    if (isTermsPage) return 'aroha-terms'
    if (isArohaSubdomain) return 'aroha'
    return 'community'
  })

  // Update active page based on pathname changes
  useEffect(() => {
    if (isTermsPage) {
      setActivePage('aroha-terms')
    } else if (isArohaSubdomain) {
      setActivePage('aroha')
    }
  }, [isTermsPage, isArohaSubdomain])

  const handlePageChange = (page) => {
    // Don't allow navigation away from aroha page when on aroha subdomain
    if (isArohaSubdomain) {
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

  // Don't show header on terms page
  const showHeader = activePage !== 'aroha-terms'

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