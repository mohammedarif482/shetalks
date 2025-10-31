import { useState } from 'react'

// Helper function to track Meta Pixel events reliably
const trackMetaEvent = (eventName, params = {}, isCustom = false) => {
  try {
    if (typeof window !== 'undefined') {
      // Check if fbq is available as a function
      if (typeof window.fbq === 'function') {
        // Use trackCustom for custom events, track for standard events
        if (isCustom) {
          window.fbq('trackCustom', eventName, params)
        } else {
          window.fbq('track', eventName, params)
        }
        console.log('Meta Pixel event tracked:', eventName, params)
        return true
      }
      // Fallback: queue event if fbq isn't ready yet
      else if (window._fbq && Array.isArray(window._fbq)) {
        if (isCustom) {
          window._fbq.push(['trackCustom', eventName, params])
        } else {
          window._fbq.push(['track', eventName, params])
        }
        console.log('Meta Pixel event queued:', eventName, params)
        return true
      } else {
        console.warn('Meta Pixel not loaded yet, event not tracked:', eventName)
        return false
      }
    }
  } catch (error) {
    console.error('Meta Pixel tracking error:', error)
    return false
  }
  return false
}

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Track Join Community button clicks
  const handleJoinCommunityClick = (e) => {
    // Track as standard Lead event
    trackMetaEvent('Lead', {
      content_name: 'Join The She Talks Community',
      content_category: 'Community Signup'
    })
    // Also track as a custom event with specific name for easier identification in Overview
    trackMetaEvent('CommunityJoinClick', {
      content_name: 'Join The She Talks Community',
      content_category: 'Community Signup'
    }, true)
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-left">
            {/* Badge */}
            <img 
              src="/womans.png" 
              alt="50+ Women, One Safe Sisterhood United" 
              className="badge-full-image"
            />

            {/* Main Heading */}
            <h1 className="hero-heading">
              <span className="line">Let's Talk.</span>
              <span className="line">Heal Together.</span>
              <span className="line">Rise Fearlessly.</span>
            </h1>

            {/* Description */}
            <div className="hero-description">
              <p>
                Here, we hold space for each other, to speak, to listen, to heal.
                Because every shared story lights a path for another woman to rise.
              </p>
              <p>
                In this circle, no one has to pretend to be strong all the time.
                We come together to unlearn silence, to find comfort in honesty,
                and to remind one another that healing is not a destination, it's a journey we walk, hand in hand.
              </p>
            </div>

            {/* CTA Button */}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfQtaS_iGAdCvsRVQeeHcZ5r3cQTPIkbbMcoMBy_grINDx_ZQ/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-primary hero-cta" onClick={handleJoinCommunityClick}>
              Join <span className="cta-dot">.</span><span className="freude-text">The She Talks</span> <span className="cta-dot">.</span>Community
            </a>
          </div>

          {/* Right Content - Video */}
          <div className="hero-right">
            <div className="video-container" onClick={handleVideoClick}>
              <iframe
                className="character-video"
                src="https://www.youtube.com/embed/3LEud9pHDzk?autoplay=1&mute=1&loop=1&playlist=3LEud9pHDzk&controls=0&modestbranding=1&playsinline=1&rel=0&start=0"
                title="The She Talks Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
              <div className="video-overlay">
                <svg 
                  className="play-icon" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  width="60" 
                  height="60"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="speaker-badge">
                <div className="speaker-name">Arya Biju</div>
                <div className="speaker-title">Founder <span className="freude-text">The She Talks</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      {isModalOpen && (
        <div className="video-modal" onClick={handleCloseModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <iframe
              className="video-modal-iframe"
              src="https://www.youtube.com/embed/3LEud9pHDzk?autoplay=1&mute=0&loop=1&playlist=3LEud9pHDzk&controls=1&modestbranding=1&playsinline=1&rel=0&start=0"
              title="The She Talks Video Fullscreen"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
