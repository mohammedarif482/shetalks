import { useEffect } from 'react'

const ComingSoon = ({ pageName }) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

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

