import { useState } from 'react'

const Header = ({ activePage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (page) => {
    onPageChange(page)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <img 
            src="/logo.svg" 
            alt="The She Talks Logo" 
            className="logo-image"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => handleNavClick('community')} 
                className={`nav-link ${activePage === 'community' ? 'nav-link-active' : ''}`}
              >
                Community
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('events')} 
                className={`nav-link ${activePage === 'events' ? 'nav-link-active' : ''}`}
              >
                Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('launches')} 
                className={`nav-link ${activePage === 'launches' ? 'nav-link-active' : ''}`}
              >
                Launches
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('updates')} 
                className={`nav-link ${activePage === 'updates' ? 'nav-link-active' : ''}`}
              >
                Updates
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li>
              <button 
                onClick={() => handleNavClick('community')} 
                className={`nav-link ${activePage === 'community' ? 'nav-link-active' : ''}`}
              >
                Community
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('events')} 
                className={`nav-link ${activePage === 'events' ? 'nav-link-active' : ''}`}
              >
                Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('launches')} 
                className={`nav-link ${activePage === 'launches' ? 'nav-link-active' : ''}`}
              >
                Launches
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('updates')} 
                className={`nav-link ${activePage === 'updates' ? 'nav-link-active' : ''}`}
              >
                Updates
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
