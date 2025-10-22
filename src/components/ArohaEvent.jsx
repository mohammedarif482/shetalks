import { useState, useEffect } from 'react'
import './ArohaEvent.css'

const ArohaEvent = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`aroha-event ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="aroha-hero">
        <div className="aroha-hero-content">
          <div className="aroha-logo">
            <h1 className="aroha-title">AROHA</h1>
            <p className="aroha-subtitle">A Celebration of Women's Voices</p>
          </div>
          
          <div className="aroha-hero-text">
            <h2>Join us for an extraordinary evening</h2>
            <p>An exclusive event celebrating the power, resilience, and achievements of women from all walks of life.</p>
          </div>

          <div className="aroha-cta">
            <button className="aroha-btn primary">Register Now</button>
            <button className="aroha-btn secondary">Learn More</button>
          </div>
        </div>
        
        <div className="aroha-hero-visual">
          <div className="aroha-gradient-circle"></div>
        </div>
      </section>

      {/* Event Details */}
      <section className="aroha-details">
        <div className="container">
          <div className="aroha-info-grid">
            <div className="aroha-info-card">
              <h3>📅 Date & Time</h3>
              <p>Coming Soon</p>
              <span>Stay tuned for updates</span>
            </div>
            
            <div className="aroha-info-card">
              <h3>📍 Location</h3>
              <p>To be announced</p>
              <span>Details coming soon</span>
            </div>
            
            <div className="aroha-info-card">
              <h3>🎤 Speakers</h3>
              <p>Inspiring women leaders</p>
              <span>Lineup to be revealed</span>
            </div>
            
            <div className="aroha-info-card">
              <h3>🎟️ Tickets</h3>
              <p>Limited availability</p>
              <span>Early bird pricing available</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="aroha-about">
        <div className="container">
          <div className="aroha-about-content">
            <h2>About Aroha</h2>
            <p>
              Aroha is more than just an event—it's a movement. We're creating a space where women's stories, 
              achievements, and aspirations take center stage. Join us as we celebrate the incredible women 
              who are shaping our world and inspiring the next generation.
            </p>
            <p>
              This exclusive gathering will feature inspiring speakers, meaningful conversations, and 
              opportunities to connect with like-minded individuals who share our vision of empowerment and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="aroha-newsletter">
        <div className="container">
          <div className="aroha-newsletter-content">
            <h2>Stay Updated</h2>
            <p>Be the first to know about event details, speaker announcements, and exclusive updates.</p>
            
            <form className="aroha-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="aroha-input"
              />
              <button type="submit" className="aroha-btn primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="aroha-footer">
        <div className="container">
          <div className="aroha-footer-content">
            <p>&copy; 2024 SheTalks. All rights reserved.</p>
            <div className="aroha-social">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ArohaEvent
