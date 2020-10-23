
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    try {
        const authorizationContent = request.get('authorization')
        if (authorizationContent && authorizationContent.toLowerCase().startsWith('bearer ')) {
            const token = authorizationContent.substring(7)
            if (token && token.trim().length > 0) {
                const decodedToken = jwt.verify(token, process.env.SECRET)
                if (decodedToken && decodedToken.id) {
                    request.token = token
                    next()
                } else {
                    return response.status(401).json({ error: 'token invalid' })
                }
            } else {
                return response.status(401).json({ error: 'token missing or invalid' })
            }
        } else {
            return response.status(401).json({ error: 'header authorization missing or invalid' })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = tokenExtractor