
const jwt = require('jsonwebtoken')

const thereIsAuthorizationData = authorization => authorization && authorization.toLowerCase().startsWith('bearer ')

const thereIsToken = token => token && token.trim().length > 0

const thereIsTokenId = token => token && token.id

const tokenExtractor = (request, response, next) => {
    try {
        if (request.method === 'GET') {

            next()

        } else if (request.url === '/api/login' || request.url === '/api/users') {

            next()

        } else {

            const authorizationContent = request.get('authorization')

            if (!thereIsAuthorizationData(authorizationContent))
                return response.status(401).json({ error: 'header authorization missing or invalid' })

            const token = authorizationContent.substring(7)

            if (!thereIsToken(token))
                return response.status(401).json({ error: 'token missing or invalid' })

            const decodedToken = jwt.verify(token, process.env.SIGN_TOKEN_SECRET)

            if (!thereIsTokenId(decodedToken))
                return response.status(401).json({ error: 'token invalid' })

            request.token = token

            next()
        }
    } catch (e) {

        next(e)

    }
}

module.exports = tokenExtractor