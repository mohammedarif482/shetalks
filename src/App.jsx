import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Cards from './components/Cards'
import SocialFooter from './components/SocialFooter'
import ComingSoon from './components/ComingSoon'
import ArohaEvent from './components/ArohaEvent'
import './App.css'

function App() {
  // Check if we're on the aroha subdomain
  const isArohaSubdomain = window.location.hostname === 'aroha.theshetalks.club'
  
  const [activePage, setActivePage] = useState(isArohaSubdomain ? 'aroha' : 'community')

  // Prevent navigation away from Aroha page when on aroha subdomain
  useEffect(() => {
    if (isArohaSubdomain && activePage !== 'aroha') {
      setActivePage('aroha')
    }
  }, [isArohaSubdomain, activePage])

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
            <Cards />
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
      default:
        return (
          <>
            <Hero />
            <Cards />
            <SocialFooter />
          </>
        )
    }
  }

  return (
    <div className="app">
      <Header activePage={activePage} onPageChange={handlePageChange} />
      <main>
        {renderPageContent()}
      </main>
    </div>
  )
}

export default App