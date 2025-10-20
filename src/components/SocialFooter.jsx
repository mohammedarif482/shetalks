const SocialFooter = () => {
  const socialLinks = [
    { name: 'Instagram', icon: '/instagram.svg', url: 'https://www.instagram.com/the.she.talks/' },
    { name: 'Facebook', icon: '/facebook.svg', url: 'https://www.facebook.com/people/The-She-Talks/61581217366290' },
    { name: 'YouTube', icon: '/youtube.svg', url: 'https://www.youtube.com/@TheSheTalksCommunity' },
    { name: 'Pinterest', icon: '/pinterest.svg', url: 'https://pin.it/3pgootz70' },
    { name: 'X', icon: '/x.svg', url: 'https://x.com/theshetalksclub' }
  ]

  return (
    <footer className="social-footer">
      <div className="social-footer-content">
        <p className="social-footer-text">Follow <span className="freude-text">The She Talks</span> on</p>
        <div className="social-icons-row">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="social-icon-link"
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="social-icon-img"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default SocialFooter