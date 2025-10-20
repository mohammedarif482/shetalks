import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Cards from './components/Cards'
import SocialFooter from './components/SocialFooter'
import ComingSoon from './components/ComingSoon'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('community')

  const handlePageChange = (page) => {
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