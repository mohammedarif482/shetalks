import { useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <a href="#" className="logo animate-on-load">
          <img 
            src="/logo.png" 
            alt="The She Talks" 
            className="logo-image"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#community" className="nav-link animate-on-load">Community</a></li>
            <li><a href="#events" className="nav-link animate-on-load">Events</a></li>
            <li><a href="#launches" className="nav-link animate-on-load">Launches</a></li>
          </ul>
          
          <a href="#join" className="btn btn-primary animate-on-load">
            Join The She Talks
          </a>
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
            <li><a href="#community" className="nav-link">Community</a></li>
            <li><a href="#events" className="nav-link">Events</a></li>
            <li><a href="#launches" className="nav-link">Launches</a></li>
            <li>
              <a href="#join" className="btn btn-primary">
                Join The She Talks
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
