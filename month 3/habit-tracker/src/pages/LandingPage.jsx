import { Link } from 'react-router-dom'

function LandingPage({ token }) {
  return (
    <section className="landing-card">
      <h2>Track simple daily routines</h2>
      <p>
        Create habits, mark them complete each day, and review your completion
        history.
      </p>
      <Link className="primary-link" to={token ? '/dashboard' : '/auth'}>
        {token ? 'Go to Dashboard' : 'Get Started'}
      </Link>
    </section>
  )
}

export default LandingPage
