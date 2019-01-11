const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const model = require('./users_model')
const env = require('../../env')
const authorize = require('../utils/authorize')
let usersValidators = require('./users_validator')
let EntityController = require('../entities/entityController')

class UsersController extends EntityController {
  constructor(model, middleware, env) {
    super(model, middleware, env)
    this.login = this.login.bind(this)
    this.token = this.token.bind(this)
    this.getById = this.getById.bind(this)
  }
  async getById(req, res, next) {
    try {
      let authorization = await this.middleware.authorize(
        req.headers.authorization
      )
      if (authorization.error) {
        return next(authorization)
      }

      let user = await model.getById(req.params.id)

      if (user.error == 'error retrieving user') {
        return next(user)
      }
      delete user.hashedPassword
      return res.status(200).json(user)
    } catch (error) {
      return next(error)
    }
  }

  async login(req, res, next) {
    try {
      const credentials = req.body
      const user = await this.model.getByEitherOr(
        'email',
        'username',
        credentials.username.toLowerCase()
      )

      if (user.error) {
        return next(user)
      }

      const isValid = await this.middleware.bcrypt.compare(
        credentials.password,
        user.hashedPassword
      )

      if (isValid) {
        // let [followers, following] = await Promise.all([
        //   this.model.getFollowers(user.id),
        //   this.model.getFollowing(user.id),
        // ])
        //
        // user.followers = followers
        // user.following = following

        delete user.hashedPassword

        const timeIssued = Math.floor(Date.now() / 1000)
        const timeExpires = timeIssued + 86400 * 28
        const token = await this.middleware.jwt.sign(
          {
            iss: 'auth_test',
            aud: 'auth_test',
            iat: timeIssued,
            exp: timeExpires,
            identity: user.id,
          },
          this.env.JWT_KEY
        )

        user.token = token
        return res
          .status(200)
          .set({ authorization: token })
          .json(user)
      }

      return next({ error: 'username or password is incorrect', status: 400 })
    } catch (error) {
      return next(error)
    }
  }

  async token(req, res, next) {
    try {
      let authorization = await this.middleware.authorize(
        req.headers.authorization
      )
      if (authorization.error) {
        return next(authorization)
      }
      return res.status(200).json({ message: 'token valid' })
    } catch (error) {
      return next(error)
    }
  }
}

const middleware = { authorize, usersValidators, bcrypt, jwt }

module.exports = new UsersController(model, middleware, env)
