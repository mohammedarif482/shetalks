import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Cards = () => {
  const cardsRef = useRef(null)
  
  const cards = [
    {
      id: 1,
      title: "Community",
      description: "Connect with like-minded women in our supportive community. Share your experiences, ask questions, and build lasting friendships in a safe, inclusive environment.",
      type: "filled"
    },
    {
      id: 2,
      title: "Events",
      description: "Join our regular events, workshops, and meetups designed to inspire and empower. From networking sessions to skill-building workshops, there's something for everyone.",
      type: "outlined"
    },
    {
      id: 3,
      title: "Launches",
      description: "Be the first to know about new features, partnerships, and opportunities within our community. Stay updated with exclusive launches and early access benefits.",
      type: "outlined"
    }
  ]

  useEffect(() => {
    const cardElements = cardsRef.current.querySelectorAll('.card')
    
    gsap.fromTo(cardElements, 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [])

  return (
    <section className="cards-section" ref={cardsRef}>
      <div className="cards-container">
        <div className="cards-wrapper">
          {cards.map((card) => (
            <div 
              key={card.id}
              className={`card card-${card.type}`}
            >
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cards