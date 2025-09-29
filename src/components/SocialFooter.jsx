const SocialFooter = () => {
  const socialLinks = [
    { name: 'Instagram', icon: '/instagram.svg', url: '#' },
    { name: 'Facebook', icon: '/facebook.svg', url: '#' },
    { name: 'YouTube', icon: '/youtube.svg', url: '#' },
    { name: 'Pinterest', icon: '/pinterest.svg', url: '#' },
    { name: 'X', icon: '/x.svg', url: '#' }
  ]

  return (
    <footer className="social-footer">
      <div className="social-footer-content">
        <p className="social-footer-text">Follow The She Talks on</p>
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