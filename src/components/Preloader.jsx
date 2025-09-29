import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Animate out
          gsap.to('.preloader', {
            opacity: 0,
            duration: 0.5,
            onComplete: onComplete
          })
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-logo">
          <img 
            src="/logo.png" 
            alt="The She Talks" 
            className="preloader-logo-image"
          />
        </div>
        <div className="preloader-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  )
}

export default Preloader
