const Cards = ({ onPageChange }) => {
  const cards = [
    {
      id: 1,
      title: "Community",
      description: "A safe space where women connect, share, and grow together. It's where real stories meet real support, reminding us that healing feels lighter when we're not alone.",
      type: "filled"
    },
    {
      id: 2,
      title: "Events",
      description: "Conversations and workshops that nurture healing, self-awareness, and connection, helping women find strength in shared experiences.",
      type: "outlined",
      page: "events"
    },
    {
      id: 3,
      title: "Launches",
      description: "Products and services designed to support women's well-being, growth, and everyday life, created with purpose and care.",
      type: "outlined"
    }
  ]

  const handleCardClick = (card) => {
    if (card.page && onPageChange) {
      onPageChange(card.page)
    }
  }

  return (
    <section className="cards-section">
      <div className="cards-container">
        <div className="cards-wrapper">
          {cards.map((card) => (
            <div 
              key={card.id}
              className={`card card-${card.type}`}
              onClick={() => handleCardClick(card)}
            >
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
              <div className="card-icon">
                <img 
                  src="/arrow.svg" 
                  alt="Arrow icon" 
                  className="card-arrow-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cards