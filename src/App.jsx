import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import AnnouncementBar from './components/AnnouncementBar'
import Hero from './components/Hero'
import Cards from './components/Cards'
import SocialFooter from './components/SocialFooter'
import Preloader from './components/Preloader'
import CursorTrail from './components/CursorTrail'
import './App.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const appRef = useRef(null)

  useEffect(() => {
    // Initialize animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
      initializeAnimations()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  const initializeAnimations = () => {
    // Set initial states for animations
    gsap.set('.animate-on-load', { opacity: 0, y: 50 })
    gsap.set('.animate-slide-left', { opacity: 0, x: -50 })
    gsap.set('.animate-scale', { opacity: 0, scale: 0.8 })
    gsap.set('.animate-cards', { opacity: 0, y: 100 })

    // Create timeline for initial load animations
    const tl = gsap.timeline({ delay: 0.5 })

    tl.to('.animate-on-load', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    })
    .to('.animate-slide-left', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power2.out'
    }, '-=0.4')
    .to('.animate-scale', {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    }, '-=0.2')
    .to('.animate-cards', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.4')

    // Setup scroll animations
    setupScrollAnimations()

    // Setup hover animations
    setupHoverAnimations()

    // Setup character floating animation
    setupCharacterAnimation()
  }

  const setupScrollAnimations = () => {
    // Cards animation on scroll only - header scroll animations removed

    // Cards animation on scroll
    ScrollTrigger.batch('.card', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2,
            ease: 'power2.out'
          }
        )
      },
      once: true
    })
  }

  const setupHoverAnimations = () => {
    // Navigation links hover
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          color: 'var(--primary-pink)',
          duration: 0.3
        })
      })
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          color: 'var(--text-dark)',
          duration: 0.3
        })
      })
    })

    // Button hover animations
    const buttons = document.querySelectorAll('.btn-primary')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: '0 4px 20px rgba(235, 116, 112, 0.3)',
          duration: 0.3
        })
      })
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: 'none',
          duration: 0.3
        })
      })
    })

    // Cards hover animations
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          duration: 0.3
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: 'none',
          duration: 0.3
        })
      })
    })

    // Logo pulse animation
    const logo = document.querySelector('.logo')
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.05,
          duration: 0.3
        })
      })
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3
        })
      })
    }
  }

  const setupCharacterAnimation = () => {
    const character = document.querySelector('.character-image')
    if (character) {
      // Continuous floating animation
      gsap.to(character, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      })

      // Hover rotation
      character.addEventListener('mouseenter', () => {
        gsap.to(character, {
          rotation: 2,
          duration: 0.3
        })
      })
      character.addEventListener('mouseleave', () => {
        gsap.to(character, {
          rotation: 0,
          duration: 0.3
        })
      })
    }
  }

  // Floating Join Button component
const FloatingJoinButton = () => {
  return (
    <button className="floating-join-btn">
      Join The She Talks
    </button>
  )
}

return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <CursorTrail />
      <div className="app" ref={appRef}>
        <Header />
        <main>
          <Hero />
          <Cards />
          <SocialFooter />
        </main>
        <AnnouncementBar />
      </div>
    </>
  )
}

export default App