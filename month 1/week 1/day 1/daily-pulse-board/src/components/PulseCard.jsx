function PulseCard({ title, description, isActive, onSelect }) {
  return (
    <button
      className={`pulse-card ${isActive ? 'pulse-card--active' : ''}`}
      onClick={onSelect}
    >
      <span className="pulse-card__label">
        {isActive ? 'Selected' : 'Click to select'}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </button>
  )
}

export default PulseCard
