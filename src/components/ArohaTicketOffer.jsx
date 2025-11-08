import { useMemo, useState } from 'react'
import './ArohaTicketOffer.css'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdiWda9S2rmHrnYFyu1kZMzVIIwhF8jJPq7Q3F_MR5rKnmKFA/viewform?embedded=true'

const ArohaTicketOffer = () => {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false)

  const basePath = useMemo(() => {
    if (typeof window === 'undefined') return '/aroha'
    return window.location.hostname === 'aroha.theshetalks.club' ? '/' : '/aroha'
  }, [])

  const handleBackToEvent = () => {
    window.location.href = basePath
  }

  const handleFrameLoad = () => {
    setIsFrameLoaded(true)
  }

  return (
    <div className="ticket-offer-page">
      <div className="ticket-offer-overlay" />
      <div className="ticket-offer-container">
        <header className="ticket-offer-header">
          <span className="ticket-offer-badge">Exclusive SheCamp Offer</span>
          <h1>Claim Your Aroha Ticket Offer</h1>
          <p>
            Complete the form below to reserve your spot and unlock the special ticket offer for Aroha Celebrate Women
            2025. Once submitted, you will see a confirmation message, and our team will contact you shortly with the
            next steps.
          </p>
        </header>

        <div className="ticket-offer-frame-wrapper">
          {!isFrameLoaded && (
            <div className="ticket-offer-frame-loading">
              <span className="loading-spinner" aria-hidden="true" />
              <p>Loading form…</p>
            </div>
          )}
          <iframe
            src={GOOGLE_FORM_URL}
            title="Aroha Ticket Offer Form"
            className={`ticket-offer-iframe ${isFrameLoaded ? 'visible' : ''}`}
            onLoad={handleFrameLoad}
            allow="fullscreen"
          >
            Loading…
          </iframe>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={handleBackToEvent}>
            Back to Aroha Event Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArohaTicketOffer

