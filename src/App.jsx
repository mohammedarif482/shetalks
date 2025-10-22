import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Cards from './components/Cards'
import SocialFooter from './components/SocialFooter'
import ComingSoon from './components/ComingSoon'
import ArohaEvent from './components/ArohaEvent'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('community')

  useEffect(() => {
    // Check if we're on the aroha subdomain
    if (window.location.hostname === 'aroha.theshetalks.club') {
      setActivePage('aroha')
    }
  }, [])

  const handlePageChange = (page) => {
    setActivePage(page)
  }

  const renderPageContent = () => {
    switch (activePage) {
      case 'aroha':
        return <ArohaEvent />
      case 'community':
        return (
          <>
            <Hero />
            <Cards />
            <SocialFooter />
          </>
        )
      case 'events':
        return <ComingSoon pageName="Events" />
      case 'launches':
        return <ComingSoon pageName="Launches" />
      case 'updates':
        return <ComingSoon pageName="Updates" />
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