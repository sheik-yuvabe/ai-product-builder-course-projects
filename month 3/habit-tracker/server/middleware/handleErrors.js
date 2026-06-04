function handleErrors(error, request, response, next) {
  console.error(error)

  if (response.headersSent) {
    return next(error)
  }

  return response.status(500).json({
    message: 'Something went wrong on the server',
  })
}

export default handleErrors
