function AuthPage({
  authName,
  authEmail,
  authPassword,
  onAuthNameChange,
  onAuthEmailChange,
  onAuthPasswordChange,
  onAuthSubmit,
}) {
  return (
    <section className="auth-card">
      <h2>Login or sign up</h2>
      <form className="auth-form">
        <input
          type="text"
          placeholder="Name for signup"
          value={authName}
          onChange={(event) => onAuthNameChange(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={authEmail}
          onChange={(event) => onAuthEmailChange(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          minLength="6"
          required
          value={authPassword}
          onChange={(event) => onAuthPasswordChange(event.target.value)}
        />
        <div className="auth-actions">
          <button type="submit" onClick={(event) => onAuthSubmit(event, 'login')}>
            Login
          </button>
          <button
            className="secondary-button"
            type="submit"
            onClick={(event) => onAuthSubmit(event, 'signup')}
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthPage
