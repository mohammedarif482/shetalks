import './ArohaTerms.css'

const ArohaTerms = () => {
  return (
    <div className="aroha-terms-page">
      <div className="terms-container">
        <header className="terms-header">
          <div className="terms-logos">
            <div className="logo-left">
              <img src="/aroha/shetalk.png" alt="The She Talks" className="logo-image" />
            </div>
            <div className="logo-right">
              <img src="/aroha/peaktale.png" alt="Peaktales" className="logo-image" />
            </div>
          </div>
        </header>

        <main className="terms-main">
          <div className="terms-wrapper">
            <h1>Terms & Conditions</h1>
            
            <div className="terms-section">
              <div className="terms-item">
                <h2>All-Women Retreat</h2>
                <p>Attendance is restricted to women participants only.</p>
              </div>

              <div className="terms-item">
                <h2>Accommodation</h2>
                <p>The ticket price includes premium accommodation for Nov 22–23, 2025 at Petals Resort, Wayanad.</p>
              </div>

              <div className="terms-item">
                <h2>Cancellations & Refunds</h2>
                <p>Tickets once sold cannot be exchanged or refunded, except in case of cancellation of the event. No refunds within 7 days of the event date. Please note that ticket details cannot be changed once sales begin.</p>
              </div>

              <div className="terms-item">
                <h2>Wellness Participation</h2>
                <p>Participants are advised to inform the organizers of any health conditions before participating in Yoga or Wellness Workshops.</p>
              </div>

              <div className="terms-item">
                <h2>Event Policies</h2>
                <ul>
                  <li>An internet handling fee per ticket may be levied. Please check the total amount before payment.</li>
                  <li>The event organizers reserve the right to admission, without assigning any reason.</li>
                  <li>No ticket categories will be added or cancelled after sales begin.</li>
                </ul>
              </div>

              <div className="terms-item">
                <h2>Organizer Contact</h2>
                <p>For support and queries, please contact:</p>
                <div className="contact-info">
                  <a href="tel:+919847896003">+91 98478 96003</a>
                  <a href="tel:+918089369113">+91 80893 69113</a>
                  <a href="tel:+919048120488">+91 90481 20488</a>
                </div>
              </div>
            </div>

            <div className="terms-footer-actions">
              <a href="/aroha" className="back-btn">Back to Aroha</a>
            </div>
          </div>
        </main>

        <footer className="terms-page-footer">
          <p>&copy; 2025 The She Talks × Peak Tale Trips. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default ArohaTerms

