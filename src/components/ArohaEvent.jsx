import { useState, useRef, useEffect } from 'react'
import './ArohaEvent.css'

// Helper function to track Meta Pixel events reliably
const trackMetaEvent = (eventName, params = {}) => {
  try {
    if (typeof window !== 'undefined') {
      // Check if fbq is available as a function
      if (typeof window.fbq === 'function') {
        window.fbq('track', eventName, params)
        console.log('Meta Pixel event tracked:', eventName, params)
        return true
      }
      // Fallback: queue event if fbq isn't ready yet
      else if (window._fbq && Array.isArray(window._fbq)) {
        window._fbq.push(['track', eventName, params])
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

const ArohaEvent = () => {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const experiencesRef = useRef(null)
  const heroRef = useRef(null)

  // Scroll handler to show floating button after hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
        // Show floating button when scrolled past the hero section
        setShowFloatingButton(window.scrollY > heroBottom - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const artists = [
    {
      id: 1,
      name: "Arya Biju",
      title: "Health & Wellness Session",
      description: (<>
        Join Arya Biju, founder of <strong>Adowlz</strong> and <strong>The She Talk Community</strong>, for a heartfelt conversation on <strong>wellness, womanhood, and the beautiful chaos of finding balance</strong>. A passionate young entrepreneur and advocate for women's voices, Arya opens up real, honest discussions around <strong>mental health, self-worth, and the everyday challenges women face</strong>.
      </>),
      image: "/aroha/artists/arya.png",
      instagram: "https://instagram.com/arya__biju"
    
    },
    {
      id: 2,
      name: "Udukku",
      title: "Sound Journey & Drum Circle",
      description: (<>
        Led by Udukku, rhythm alchemist and founder of the Iyashi Sound Experience, this transformative session blends <strong>ancient drumming traditions with meditative soundscapes</strong> to create a deeply immersive healing experience. The Sound Journey & Drum Circle invites you to connect with your inner rhythm through <strong>grounding drum beats, soothing vibrations, resonant tones</strong> where every beat becomes a path to harmony, balance, and emotional release.
      </>),
      image: "/aroha/artists/udukku.png",
      instagram: "https://instagram.com/udukku"
    },
    {
      id: 3,
      name: "Rizvana Khalid",
      title: "Eco-Printing & Natural Dye Workshop",
      description: (<>
        Led by Rizvana Khalid, artist and eco-textile creator, this enchanting workshop invites you to <strong>immerse yourself in the ancient art of eco-printing and natural dyeing</strong> where nature and creativity beautifully intertwine. Participants will explore the <strong>alchemy of leaves, flowers, and fibers</strong>, learning through <strong>gentle mordanting, careful bundling, and mindful steaming</strong> how to transfer nature's delicate imprints onto fabric in a celebration of <strong>sustainability, self-expression, and the magic of nature's palette</strong>.
      </>),
      image: "/aroha/artists/rizwa.png",
      instagram: "https://instagram.com/_rizvanakhalid"
    },
    {
      id: 4,
      name: "Anjali Pandey",
      title: "Yoga & Mindfulness Session",
      description: (<>
        Led by Anjali Pandey, yoga facilitator and founder of <strong>Yogaendless</strong>, this session is a gentle invitation to return to yourself through <strong>movement, breath, and awareness</strong>. Anjali's approach to yoga goes beyond postures — it's about <strong>honest connection, mindful presence, and inner clarity</strong>. Feel <strong>grounded yet light, centered yet open</strong>.
      </>),
      image: "/aroha/artists/anjali.png",
      instagram: "https://instagram.com/anjalipandey_yoga"
    },
    {
      id: 5,
      name: "Jinil M",
      title: "Art Flow Workshop",
      description: (<>
        Led by visionary artist and creative guide Jinil, the Art Flow Workshop is a soulful blend of <strong>intuitive art, mindful expression, and emotional healing</strong> through color. This transformative experience invites you to <strong>slow down, reconnect, and awaken your creative energy</strong> — turning painting into a journey of <strong>self-discovery and inner balance</strong>. Through <strong>expressive art and free-flow painting</strong>, <strong>creativity becomes meditation, breathe, release, and rediscover your true flow.</strong>
      </>),
      image: "/aroha/artists/jinil.png",
      instagram: "https://instagram.com/jinil_jinn"
    },
    {
      id: 6,
      name: "S. J. Ajesh",
      title: "Healing Through Books",
      description: (<>
        Led by S. J. Ajesh, writer and wellness enthusiast, this soulful session explores the <strong>transformative power of books and storytelling</strong> as tools for healing the mind and heart. Through heartfelt reflections, Ajesh guides you to discover how <strong>reading, writing, and self-expression</strong> can help you reflect, release, and realign with your inner self. Participants will explore how stories can bring <strong>peace, balance, and clarity</strong> to their thoughts — and how words can become gentle medicine for the soul. Alongside this enlightening talk, experience <strong>motivational insights and intuitive guidance</strong> through tarot reflections, helping you reconnect with your intuition, find direction, and embrace emotional healing. This session is a celebration of <strong>literature, self-awareness, and the quiet strength found within pages and pauses alike</strong>.
      </>),
      image: "/aroha/artists/ajesh.png",
      instagram: "https://instagram.com/fooooofighter_"
    }
  ]

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist)
  }

  const handleCloseModal = () => {
    setSelectedArtist(null)
  }

  const scrollToExperiences = () => {
    experiencesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  // Track ticket booking button clicks
  const handleTicketBookingClick = (e) => {
    trackMetaEvent('Lead', {
      content_name: 'Aroha Ticket Booking',
      content_category: 'Event Registration'
    })
  }

  const getInstagramUsername = (url) => {
    // Extract username from Instagram URL
    // Formats: https://instagram.com/username or https://www.instagram.com/username
    const match = url.match(/instagram\.com\/([^/?]+)/);
    return match ? match[1] : url;
  }
  return (
    <div className="aroha-event">
      {/* Hero Section */}
      <section className="aroha-hero" ref={heroRef}>
        {/* Logos */}
        <div className="aroha-logos">
          <div className="logo-left">
            <img src="/aroha/shetalk.png" alt="The She Talks" className="logo-image" />
          </div>
          <div className="logo-right">
            <img src="/aroha/peaktale.png" alt="Peaktales" className="logo-image" />
          </div>
        </div>

        {/* Main Content */}
        <div className="aroha-hero-content">
          <div className="aroha-title-images">
            <img src="/aroha/aroha.png" alt="Aroha" className="aroha-title-image" />
            <img src="/aroha/celebratewoman.png" alt="Celebrate Woman" className="celebrate-woman-image" />
          </div>
          
          <div className="aroha-hero-text">
          </div>

          <div className="aroha-cta">
            <a href="https://in.bookmyshow.com/events/aroha-celebrate-women/ET00468598" target="_blank" rel="noopener noreferrer" className="aroha-btn primary" onClick={handleTicketBookingClick}>Get Early Bird Tickets</a>
            <button className="aroha-btn secondary" onClick={scrollToExperiences}>Discover the Experience</button>
          </div>

          <div className="instagram-follow">
            <div className="instagram-handles">
              <a href="https://instagram.com/the.she.talks" target="_blank" rel="noopener noreferrer" className="instagram-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {getInstagramUsername("https://instagram.com/the.she.talks")}
              </a>
              <a href="https://instagram.com/peaktaletrips" target="_blank" rel="noopener noreferrer" className="instagram-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {getInstagramUsername("https://instagram.com/peaktaletrips")}
              </a>
              <a href="https://instagram.com/aroha_event_s" target="_blank" rel="noopener noreferrer" className="instagram-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {getInstagramUsername("https://instagram.com/aroha_event_s")}
              </a>
            </div>
          </div>
        </div>
        
        {/* Hero Corner Images */}
        <div className="hero-corner-images">
          <img src="/aroha/2night.png" alt="2 Days & Nights" className="hero-corner-image left" />
          <img src="/aroha/date.png" alt="Event Date" className="hero-corner-image right" />
        </div>
      </section>

      {/* About Aroha */}
      <section className="aroha-about">
        <div className="container">
          <h1>Welcome to Aroha<br />Celebrating Women: The First of its Kind in India!</h1>
          
          <h4>The Revolution Starts Here: India's Premier Women-Only SheCamp</h4>
          
          <p>
            Aroha is not just a retreat—it is a pioneering movement. We are proud to launch India's first-ever luxurious, immersive SheCamp designed exclusively for women ready to reset, reconnect, and celebrate their power. Held in a breathtaking, hidden sanctuary in the Western Ghats—Petals Resorts Wayanad—Aroha is where contemporary elegance meets the wild, healing energy of nature.
          </p>
          
          <p>
            For two soulful days, step away from the city's demands and find your truest self. Watch the sunset from a stunning infinity pool, indulge in farm-to-table cuisine, and experience activities carefully curated to nurture your mind, body, and spirit.
          </p>
        </div>
      </section>

      {/* Artists Section */}
      <section className="aroha-artists">
        <div className="container">
          <h2>Meet Our Artists & Facilitators</h2>
          <div className="artists-grid">
            {artists.map((artist) => (
              <div 
                key={artist.id}
                className="artist-card"
                onClick={() => handleArtistClick(artist)}
              >
                <div className="artist-image">
                  <img src={artist.image} alt={artist.name} />
                </div>
                <div className="artist-overlay">
                  <h3>{artist.name}</h3>
                  <h4>{artist.title}</h4>
                  <p>{artist.description}</p>
                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features: What Makes Aroha a Transformation */}
      <section className="aroha-features">
        <div className="container">
          <h2>What Makes Aroha a Transformation?</h2>
          <p className="features-intro">
            Aroha is structured around three core pillars: <strong>Restoration</strong>, <strong>Creativity</strong>, and <strong>Connection</strong>.
          </p>
          
          <div className="features-grid">
            {/* Pillar 1: Deep Restoration & Inner Health */}
            <div className="feature-pillar">
              <div className="pillar-header">
                <div className="pillar-number">1</div>
                <h3>Deep Restoration & Inner Health</h3>
              </div>
              <p className="pillar-description">
                This is your time to genuinely breathe and heal. We blend ancient wisdom with modern wellness to ensure you return home completely recharged.
              </p>
              <div className="pillar-items">
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Women's Health & Wellness Workshops</h4>
                    <p>Focused sessions on hormonal balance, stress management, and holistic health specific to women's needs.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Yoga & Sound Healing</h4>
                    <p>Experience deeply relaxing practices designed to regulate your nervous system and restore inner peace.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Creative Expression & Joyful Energy */}
            <div className="feature-pillar">
              <div className="pillar-header">
                <div className="pillar-number">2</div>
                <h3>Creative Expression & Joyful Energy</h3>
              </div>
              <p className="pillar-description">
                Unleash your playful side and tap into your creative flow through immersive, hands-on activities designed for therapeutic release and fun.
              </p>
              <div className="pillar-items">
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Creative Soul Sessions</h4>
                    <p>Engaging Tie-dye, Eco Printing, and guided Art Therapy.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Interactive Mentalist Session</h4>
                    <p>A thrilling and engaging session to spark curiosity and conversation.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Curated Pop-up Market</h4>
                    <p>Shop for unique Art, Clothing, Jewellery, and specialty Food & Beverage items from our exclusive pop-up market, supporting women entrepreneurs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3: Power of Sisterhood & Networking */}
            <div className="feature-pillar">
              <div className="pillar-header">
                <div className="pillar-number">3</div>
                <h3>Power of Sisterhood & Networking</h3>
              </div>
              <p className="pillar-description">
                This is where authentic, soulful connection happens. Aroha is designed for networking that nourishes the soul. You will be surrounded by a community of uplifting women from diverse backgrounds who share a common goal: self-celebration and growth.
              </p>
              <div className="pillar-items">
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Evening Gatherings under the Stars</h4>
                    <p>Spend evenings sharing stories and building bonds in a judgment-free, supportive circle.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Drum Circle</h4>
                    <p>A joyous, energetic activity to release stress and find collective rhythm and unity with your new community.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="item-content">
                    <h4>Meaningful Conversations</h4>
                    <p>Forge relationships that extend beyond the event, creating a powerful, authentic support system for your personal and professional journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets / Early Bird */}
      <section className="aroha-tickets">
        <div className="container">
          <h2>The Complete Experience for ₹14,000/- (All-Inclusive Value)</h2>
          <p className="pricing-intro">
            Your investment of ₹14,000/- covers everything you need for a truly transformative and seamless two-day experience. There are no hidden costs—simply arrive and immerse yourself!
          </p>
          
          <div className="pricing-inclusions">
            <table className="inclusions-table">
              <thead>
                <tr>
                  <th>Inclusion</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="inclusion-label"><strong>Premium Accommodation</strong></td>
                  <td className="inclusion-detail">A serene stay for 2 Days & 2 Nights at Petals Resorts Wayanad, ensuring comfort, tranquility, and safety (primarily on a shared basis).</td>
                </tr>
                <tr>
                  <td className="inclusion-label"><strong>All-Inclusive Dining</strong></td>
                  <td className="inclusion-detail">Farm-to-table, wholesome, delicious cuisine. Includes all meals (Breakfast, Lunch, Dinner) and snacks/beverages during the retreat.</td>
                </tr>
                <tr>
                  <td className="inclusion-label"><strong>Full Workshop Access</strong></td>
                  <td className="inclusion-detail">Access to ALL Women's Health, Wellness, Creative, and Mentalist sessions.</td>
                </tr>
                <tr>
                  <td className="inclusion-label"><strong>Wellness Activities</strong></td>
                  <td className="inclusion-detail">Participation in all Yoga, Sound Healing, Drum Circle, and Art Therapy sessions.</td>
                </tr>
                <tr>
                  <td className="inclusion-label"><strong>Curated Access</strong></td>
                  <td className="inclusion-detail">Exclusive access to the Women-led Pop-up Market and Evening Networking Gatherings.</td>
                </tr>
                <tr>
                  <td className="inclusion-label"><strong>Venue Amenities</strong></td>
                  <td className="inclusion-detail">Access to all luxurious resort facilities, including the stunning infinity pool and nature walks within the sanctuary.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="pricing-cta">
            Ready to claim your spot in this luxurious, transformative SheCamp?
          </p>
          
          <div className="pricing-cta-buttons">
            <a href="https://in.bookmyshow.com/events/aroha-celebrate-women/ET00468598" target="_blank" rel="noopener noreferrer" className="aroha-btn primary pricing-btn" onClick={handleTicketBookingClick}>
              <span className="pricing-btn-text">Book Now</span>
              <div className="pricing-btn-logo-wrapper">
                <span className="pricing-btn-on">on</span>
                <img src="/aroha/bmslogo.svg" alt="BookMyShow" className="pricing-btn-logo" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="aroha-experiences" ref={experiencesRef}>
        <div className="container">
          <h2>What Awaits You</h2>
          <div className="experiences-grid">
            <div className="experience-card">
              <div className="experience-image">
                <img src="/aroha/events/yoga.png" alt="Yoga & Breathwork" />
              </div>
              <div className="experience-overlay">
                <h3>Yoga & Breathwork</h3>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-image">
                <img src="/aroha/events/sound.png" alt="Sound Healing" />
              </div>
              <div className="experience-overlay">
                <h3>Sound Healing</h3>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-image">
                <img src="/aroha/events/art.png" alt="Art & Expression" />
              </div>
              <div className="experience-overlay">
                <h3>Art & Expression</h3>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-image">
                <img src="/aroha/music.png" alt="Music Evenings" />
              </div>
              <div className="experience-overlay">
                <h3>Music Evenings</h3>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-image">
                <img src="/aroha/sisterhood.png" alt="Sisterhood Circles" />
              </div>
              <div className="experience-overlay">
                <h3>Sisterhood Circles</h3>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-image">
                <img src="/aroha/events/forest.png" alt="Forest Walks" />
              </div>
              <div className="experience-overlay">
                <h3>Forest Walks</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Inclusions Section */}
      <section className="aroha-inclusions">
        <div className="container">
          <h2>Why Attend</h2>
          <div className="inclusions-grid">
            <div className="inclusion-card">
              <div className="inclusion-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Community & Empowerment</h3>
              <p>Recharge your social batteries with a supportive community. Aroha is dedicated to uplifting women, ensuring you leave with a powerful, authentic sisterhood and connections that genuinely empower your life.</p>
            </div>
            <div className="inclusion-card">
              <div className="inclusion-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3>Holistic Wellness Activities</h3>
              <p>Dive into Women's Health and Wellness Workshops, daily Yoga, and deep relaxation with Sound Healing, hands-on Art Therapy/Eco Printing, and a joyous Drum Circle under the stars.</p>
            </div>
            <div className="inclusion-card">
              <div className="inclusion-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3v4"></path>
                  <path d="M19 3v4"></path>
                  <rect width="18" height="18" x="3" y="8" rx="2"></rect>
                  <path d="M3 12h18"></path>
                </svg>
              </div>
              <h3>Luxury Amidst Nature</h3>
              <p>Experience a premium retreat at Petals Resorts Wayanad with stunning views of Banasura Hill and access to amenities like the infinity pool.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="aroha-contact">
        <div className="container">
          <div className="contact-content">
            <p className="contact-intro">For details:</p>

            <div className="contact-numbers">
              <a href="tel:+919847896003" className="contact-link"> +91 98478 96003</a>
              <span className="contact-separator">|</span>
              <a href="tel:+918089369113" className="contact-link">+91 80893 69113</a>
              <span className="contact-separator">|</span>
              <a href="tel:+919048120488" className="contact-link">+91 90481 20488</a>
              <span className="contact-separator">|</span>
              <a href="tel:8592044723" className="contact-link">8592044723</a>
            </div>
            <p className="contact-closing">With love,<br />Team Aroha</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="aroha-footer">
        <div className="container">
          <div className="footer-content">
            <a href="/aroha/terms" className="terms-link">Terms & Conditions</a>
            <p>&copy; 2025 The She Talks × Peak Tale Trips. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Artist Modal */}
      {selectedArtist && (
        <div className="artist-modal" onClick={handleCloseModal}>
          <div className="artist-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="artist-modal-close" onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" fill="#FFF3DD" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <div className="artist-modal-info">
              <h2>{selectedArtist.name}</h2>
              <h3>{selectedArtist.title}</h3>
              <p>{selectedArtist.description}</p>
              <a 
                href={selectedArtist.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {getInstagramUsername(selectedArtist.instagram)}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {showFloatingButton && (
        <a 
          href="https://in.bookmyshow.com/events/aroha-celebrate-women/ET00468598" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="aroha-floating-btn"
          onClick={handleTicketBookingClick}
        >
          <span className="floating-btn-text">Get Early Bird Tickets</span>
          <div className="floating-btn-logo-wrapper">
            <span className="floating-btn-on">on</span>
            <img src="/aroha/bmslogo.svg" alt="BookMyShow" className="floating-btn-logo" />
          </div>
        </a>
      )}
    </div>
  )
}

export default ArohaEvent
