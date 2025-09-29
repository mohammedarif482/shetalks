import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

const CursorTrail = () => {
  const [trail, setTrail] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }

      setTrail(prev => [...prev.slice(-10), newPoint])

      // Remove old trail points
      setTimeout(() => {
        setTrail(prev => prev.filter(point => point.id !== newPoint.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="cursor-trail">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="trail-point"
          style={{
            left: point.x,
            top: point.y,
            opacity: 1 - (index / trail.length),
            scale: 1 - (index / trail.length) * 0.5
          }}
        />
      ))}
    </div>
  )
}

export default CursorTrail

