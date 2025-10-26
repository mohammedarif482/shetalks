import { useState, useRef } from 'react'
import './ArohaEvent.css'

const ArohaEvent = () => {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const experiencesRef = useRef(null)

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

  const getInstagramUsername = (url) => {
    // Extract username from Instagram URL
    // Formats: https://instagram.com/username or https://www.instagram.com/username
    const match = url.match(/instagram\.com\/([^/?]+)/);
    return match ? match[1] : url;
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
          </div>

          <div className="aroha-cta">
            <button className="aroha-btn primary">Get Early Bird Access</button>
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
                {getInstagramUsername(selectedArtist.instagram)}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArohaEvent
