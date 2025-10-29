import { useEffect } from 'react'

const ComingSoon = ({ pageName, onPageChange }) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  const handleArohaClick = () => {
    if (onPageChange) {
      onPageChange('aroha')
    }
  }

  // Special handling for Events page to show Aroha event card
  if (pageName === 'Events') {
    return (
      <div className="events-page">
        <div className="events-container">
          <div className="events-header">
            <h1 className="events-title freude-text">Events</h1>
            <p className="events-subtitle">Join us for transformative experiences</p>
          </div>
          
          <div className="events-grid">
            <div className="event-card aroha-card" onClick={handleArohaClick}>
              <div className="event-card-image event-banner">
                <img src="/eventbanner.png" alt="Aroha - Celebrate Woman" />
              </div>
              <div className="event-card-content">
                <div className="event-card-logos">
                  <img src="/aroha/shetalk.png" alt="The She Talks" className="event-logo" />
                  <img src="/aroha/peaktale.png" alt="Peaktales" className="event-logo" />
                </div>
                <h2 className="event-card-title">Aroha</h2>
                <p className="event-card-subtitle">Celebrate Woman</p>
                <p className="event-card-description">
                  She gives. She heals. She creates. Now it's her time to breathe, to feel, to celebrate.
                </p>
                <div className="event-card-details">
                  <div className="event-date">🗓️ Nov 22–23, 2025</div>
                  <div className="event-location">📍 Petals Resort, Wayanad</div>
                </div>
                <div className="event-card-cta">
                  <span className="cta-text">Discover the Experience</span>
                  <img src="/arrow.svg" alt="Arrow" className="event-arrow" />
                </div>
              </div>
            </div>
            
            {/* Coming Soon Card */}
            <div className="event-card coming-soon-card">
              <div className="coming-soon-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#EB7470" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="#EB7470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="event-card-content">
                <h2 className="event-card-title">More Events</h2>
                <p className="event-card-description">
                  We're working on more amazing events. Stay tuned for updates!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default coming soon page for other sections
  return (
    <div className="coming-soon">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#EB7470" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="#EB7470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="coming-soon-title freude-text">
          {pageName} Coming Soon
        </h1>
        
        <p className="coming-soon-description">
          We're working hard to bring you something amazing. Stay tuned for updates!
        </p>
        
        <div className="coming-soon-cta">
          <a href="#community" className="cta-button">
            <span className="cta-dot">•</span> Back to Community
          </a>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon




