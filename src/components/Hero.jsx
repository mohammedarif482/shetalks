import { useEffect } from 'react'

const Hero = () => {


  return (
    <section className="hero">
      <div className="hero-content">
        {/* Left Content */}
        <div className="hero-left">
          {/* Badge */}
          <div className="badge animate-on-load">
            <div className="badge-images">
              <img 
                src="/people.png" 
                alt="Community of women" 
                className="badge-image"
              />
            </div>
            <span className="badge-text">
              <div>50+ Women, One Safe</div>
              <div>Sisterhood United</div>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-heading">
            <span className="line animate-slide-left">Let's Talk.</span>
            <span className="line animate-slide-left">Heal Together.</span>
            <span className="line animate-slide-left">Rise Fearlessly.</span>
          </h1>

          {/* Description */}
          <p className="hero-description animate-on-load">
            Join our vibrant community of empowered women who are creating meaningful connections, 
            sharing experiences, and supporting each other's growth. Together, we're building a 
            safe space where every voice matters and every story inspires.
          </p>
        </div>

        {/* Right Content - Character */}
        <div className="hero-right">
          <img 
            src="/character.png" 
            alt="Confident woman with glasses" 
            className="character-image"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
