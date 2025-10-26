import { useState, useRef } from 'react'
import './ArohaEvent.css'

const ArohaEvent = () => {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const experiencesRef = useRef(null)

  const artists = [
    {
      id: 1,
      name: "Anjali Pandey",
      title: "Yoga & Mindfulness Session",
      description: "Led by Anjali Pandey, yoga facilitator and founder of Yogaendless, this session is a gentle invitation to return to yourself through movement, breath, and awareness. Anjali's approach to yoga goes beyond postures — it's about honest connection, mindful presence, and inner clarity.",
      image: "/aroha/artists/anjali.png",
      instagram: "https://instagram.com/anjalipandey_yoga"
    },
    {
      id: 2,
      name: "Udukku",
      title: "Sound Journey & Drum Circle",
      description: "Led by Udukku, rhythm alchemist and founder of the Iyashi Sound Experience, this transformative session blends ancient drumming traditions with meditative soundscapes to create a deeply immersive healing experience. The Sound Journey & Drum Circle invites you to connect with your inner rhythm, where every beat becomes a path to harmony, balance, and emotional release.",
      image: "/aroha/artists/udukku.png",
      instagram: "https://instagram.com/udukku"
    },
    {
      id: 3,
      name: "Rizvana Khalid",
      title: "Eco-Printing & Natural Dye Workshop",
      description: "Led by Rizvana Khalid, artist and eco-textile creator, this enchanting workshop invites you to immerse yourself in the ancient art of eco-printing and natural dyeing where nature and creativity beautifully intertwine. Participants will explore the alchemy of leaves, flowers, and fibers, learning how to transfer nature's delicate imprints onto fabric.",
      image: "/aroha/artists/rizwa.png",
      instagram: "https://instagram.com/_rizvanakhalid"
    },
    {
      id: 4,
      name: "Arya Biju",
      title: "Health & Wellness Session",
      description: "Join Arya Biju, founder of Adowlz and The She Talk Community, for a heartfelt conversation on wellness, womanhood, and the beautiful chaos of finding balance. A passionate young entrepreneur and advocate for women's voices, Arya opens up real, honest discussions around mental health, self-worth, and the everyday challenges women face.",
      image: "/aroha/artists/arya.png",
      instagram: "https://instagram.com/arya__biju"
    },
    {
      id: 5,
      name: "Jinil M",
      title: "Art Flow Workshop",
      description: "Led by visionary artist and creative guide Jinil, the Art Flow Workshop is a soulful blend of intuitive art, mindful expression, and emotional healing through color. This transformative experience invites you to slow down, reconnect, and awaken your creative energy — turning painting into a journey of self-discovery and inner balance.",
      image: "/aroha/artists/jinil.png",
      instagram: "https://instagram.com/jinil_jinn"
    },
    {
      id: 6,
      name: "Ajesh",
      title: "Special Workshop",
      description: "Join Ajesh for an inspiring workshop that brings together creativity, mindfulness, and personal growth. Details about this transformative session will be announced soon.",
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
  return (
    <div className="aroha-event">
      {/* Hero Section */}
      <section className="aroha-hero">
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
            <p className="hero-subtitle">She gives. She heals. She creates.</p>
          </div>

          <div className="event-details">
            <div className="event-date" style={{ color: '#FFF3DD', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFF3DD">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Nov 22–23, 2025
            </div>
            <div className="event-location" style={{ color: '#FFF3DD', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFF3DD">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Petals Resort, Wayanad
            </div>
          </div>

          <div className="aroha-cta">
            <button className="aroha-btn primary">Get Early Bird Access</button>
            <button className="aroha-btn secondary" onClick={scrollToExperiences}>Discover the Experience</button>
          </div>
        </div>
      </section>

      {/* About Aroha */}
      <section className="aroha-about">
        <div className="container">
          <h2>About Aroha</h2>
          <p>
            Aroha is a soulful SheCamp curated by peaktaletrips and The She Talks to help women unwind, reconnect, and celebrate themselves amidst nature. <strong>Set against the stunning backdrop of Banasura Hill at the luxurious and tranquil Petals Resorts Wayanad</strong>, this retreat offers a peaceful escape. Here, you can truly breathe, rest, and rediscover yourself, perhaps even while enjoying a view from the breathtaking infinity pool.
            The complete experience includes: Women's Health and Wellness Workshops, Yoga and Sound Healing, an Interactive Mentalist Session, Tie-dye, Eco Printing, and Art Therapy, plus a Drum Circle and Evening Gatherings under the Stars.
            Enjoy meaningful conversations, soulful music, locally-sourced, wholesome food, and a serene stay in premium accommodation — all in the company of inspiring women.
            It's not just a retreat — it's a complete women's experience, a celebration of you in every sense, designed to restore mind, body, and soul.
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
              <div className="experience-image placeholder-image">
                <div className="placeholder-content">Music Evenings</div>
              </div>
              <div className="experience-overlay">
                <h3>Music Evenings</h3>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-image placeholder-image">
                <div className="placeholder-content">Sisterhood Circles</div>
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

      {/* Tickets / Early Bird */}
      <section className="aroha-tickets">
        <div className="container">
        </div>
      </section>

      {/* Footer */}
      <footer className="aroha-footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 The She Talks × Peak Tale Trips. All rights reserved.</p>
            <a href="/aroha/terms" className="terms-link">Terms & Conditions</a>
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
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArohaEvent
