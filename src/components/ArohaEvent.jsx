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
        {/* Logos */}
        <div className="aroha-logos">
          <div className="logo-left">
            <img src="/logo.svg" alt="The She Talks" className="logo-image" />
          </div>
          <div className="logo-right">
            <div className="peak-tale-logo">Peak Tale Trips</div>
          </div>
        </div>

        {/* Geometric Background Elements */}
        <div className="geometric-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        {/* Main Content */}
        <div className="aroha-hero-content">
          <h1 className="aroha-title">
            <span className="title-main">AROHA:</span>
            <span className="title-script">Celebrate Woman</span>
          </h1>
          
          <div className="aroha-hero-text">
            <p className="hero-subtitle">She gives. She heals. She creates.</p>
            <p className="hero-description">Now it's her time to breathe, to feel, to celebrate.</p>
          </div>

          <div className="event-details">
            <div className="event-date">🗓️ Nov 22–23, 2025</div>
            <div className="event-location">📍 Petals Resort, Wayanad</div>
          </div>

          <div className="aroha-cta">
            <button className="aroha-btn primary">Get Early Bird Access</button>
            <button className="aroha-btn secondary">Discover the Experience</button>
          </div>
        </div>
      </section>

      {/* About Aroha */}
      <section className="aroha-about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Aroha</h2>
              <p>
                Aroha isn't just an event — it's a homecoming.
                Two serene days of yoga, sound healing, art, music, and sisterhood 
                in the calm green hills of Wayanad.
              </p>
            </div>
            <div className="about-visual">
              <div className="visual-placeholder">
                <div className="geometric-pattern"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="aroha-experiences">
        <div className="container">
          <h2 className="section-title">What Awaits You</h2>
          <div className="experiences-grid">
            <div className="experience-card">
              <div className="card-icon">🧘</div>
              <h3>Yoga & Breathwork</h3>
              <p>Connect with your inner rhythm</p>
            </div>
            <div className="experience-card">
              <div className="card-icon">🎵</div>
              <h3>Sound Healing</h3>
              <p>Harmonize your soul</p>
            </div>
            <div className="experience-card">
              <div className="card-icon">🎨</div>
              <h3>Art & Expression</h3>
              <p>Paint your emotions</p>
            </div>
            <div className="experience-card">
              <div className="card-icon">🎶</div>
              <h3>Music Evenings</h3>
              <p>Dance under the stars</p>
            </div>
            <div className="experience-card">
              <div className="card-icon">🤝</div>
              <h3>Sisterhood Circles</h3>
              <p>Share sacred stories</p>
            </div>
            <div className="experience-card">
              <div className="card-icon">🌿</div>
              <h3>Forest Walks</h3>
              <p>Nature's gentle embrace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists & Facilitators */}
      <section className="aroha-facilitators">
        <div className="container">
          <h2 className="section-title">Meet the Souls Guiding You</h2>
          <div className="facilitators-grid">
            <div className="facilitator-card">
              <div className="facilitator-portrait"></div>
              <h3>Priya Sharma</h3>
              <p>Sound Healer</p>
            </div>
            <div className="facilitator-card">
              <div className="facilitator-portrait"></div>
              <h3>Meera Patel</h3>
              <p>Yoga Guide</p>
            </div>
            <div className="facilitator-card">
              <div className="facilitator-portrait"></div>
              <h3>Anita Kumar</h3>
              <p>Artist</p>
            </div>
            <div className="facilitator-card">
              <div className="facilitator-portrait"></div>
              <h3>Deepa Singh</h3>
              <p>Music Therapist</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Venue */}
      <section className="aroha-venue">
        <div className="venue-image">
          <div className="venue-overlay">
            <h2>In the heart of nature, where stillness meets soul.</h2>
            <button className="venue-btn">View Gallery</button>
          </div>
        </div>
      </section>

      {/* Tickets / Early Bird */}
      <section className="aroha-tickets">
        <div className="container">
          <div className="tickets-content">
            <h2>Reserve Your Space</h2>
            <p>Early bird tickets dropping soon! Sign up to be the first to know.</p>
            
            <form className="tickets-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="tickets-input"
              />
              <button type="submit" className="tickets-btn">Notify Me</button>
            </form>
          </div>
        </div>
      </section>

      {/* Presented By */}
      <section className="aroha-presented">
        <div className="container">
          <div className="presented-content">
            <div className="presented-logos">
              <div className="presented-logo">
                <img src="/logo.svg" alt="The She Talks" />
                <span>The She Talks</span>
              </div>
              <div className="presented-x">×</div>
              <div className="presented-logo">
                <div className="peak-tale-logo-large">Peak Tale Trips</div>
              </div>
            </div>
            <p className="presented-caption">
              A soulful collaboration celebrating the spirit of womanhood.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="aroha-footer">
        <div className="footer-content">
          <div className="footer-social">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">📺</a>
          </div>
          <div className="footer-hashtags">
            <span>#Aroha2025</span>
            <span>#CelebrateWoman</span>
            <span>#SheTalks</span>
            <span>#PeakTaleTrips</span>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 The She Talks × Peak Tale Trips. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ArohaEvent
