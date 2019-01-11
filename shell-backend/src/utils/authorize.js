const jwt = require('jsonwebtoken')
const env = require('../../env')

const authorize = async token => {
  try {
    if (!token) return { error: 'JWT required', status: 401 }

    let verify = await jwt.verify(token, env.JWT_KEY)
    console.log(verify)

    if (verify.exp > Date.now()) return { error: 'JWT expired', status: 401 }
    return true
  } catch (error) {
    console.error(error) // eslint-disable-line no-console

    return { error: 'unknown error', status: 500 }
  }
}

module.exports = authorize
