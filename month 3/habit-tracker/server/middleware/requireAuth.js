import jwt from 'jsonwebtoken'

function requireAuth(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Authentication required' })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    request.user = {
      id: payload.userId,
      email: payload.email,
    }

    return next()
  } catch {
    return response.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default requireAuth
