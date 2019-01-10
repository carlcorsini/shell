const model = require('../models/users_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const env = require('../../env')
const authorize = require('../utils/authorize')
let usersValidators = require('../utils/validators/users_validator')

const getAllUsers = async (req, res, next) => {
  try {
    let authorization = await authorize(req.headers.authorization)
    if (authorization.error) {
      return next(authorization)
    }

    let users = await model.getAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    return next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    let authorization = await authorize(req.headers.authorization)
    if (authorization.error) {
      return next(authorization)
    }

    let user = await model.getUserById(req.params.id)

    if (user.error == 'error retrieving user') {
      return next(user)
    }
    delete user.hashedPassword
    return res.status(200).json(user)
  } catch (error) {
    return next(error)
  }
}

const getUserByUsername = async (req, res, next) => {
  try {
    let user = await model.getUserByUsername(req.params.username.toLowerCase())
    return user.error ? next(user) : res.status(200).json(user)
  } catch (error) {
    return next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const credentials = req.body
    // find user in database using username off of request body
    const user = await model.getUserByUsername(
      credentials.username.toLowerCase()
    )
    // if no match, respond with 404 not found
    if (user.error) {
      return next(user)
    }
    // if user found, compare payload password with result from getByUsername with bcrypt.js
    const isValid = await bcrypt.compare(
      credentials.password,
      user.hashedPassword
    )
    // if password is valid omit hashedPassword from user body
    if (isValid) {
      delete user.hashedPassword
      // create JWT token
      const timeIssued = Math.floor(Date.now() / 1000)
      const timeExpires = timeIssued + 86400 * 28
      const token = await jwt.sign(
        {
          iss: 'auth_test',
          aud: 'auth_test',
          iat: timeIssued,
          exp: timeExpires,
          identity: user.id,
        },
        env.JWT_KEY
      )
      // attach token to response header
      // respond with status 200 and user object
      user.token = token
      return res
        .status(200)
        .set({ authorization: token })
        .json(user)
    }
    //respond with 404 and error message if not found
    return next({ error: 'username or password is incorrect', status: 400 })
  } catch (error) {
    return next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    let payload = req.body
    let isValid = usersValidators.createUser(payload)
    if (!isValid) return next(isValid)

    payload.profile_pic =
      'https://cdn1.iconfinder.com/data/icons/ios-edge-line-12/25/User-Square-512.png'

    let doesUsernameExist = await model.getUserByUsername(
      payload.username.toLowerCase()
    )

    let doesEmailExist = await model.getUserByUsername(
      payload.email.toLowerCase()
    )

    if (doesEmailExist.email) {
      return next({ error: 'that email is taken', status: '404' })
    }

    if (doesUsernameExist.username) {
      return next({ error: 'that username is taken', status: '404' })
    }
    let user = await model.createUser(payload)
    delete user[0].hashedPassword
    return user.error ? next(user) : res.status(201).json(user)
  } catch (error) {
    return next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    let id = Number(req.params.id)

    let user = await model.deleteUser(id)
    return res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    let id = Number(req.params.id)
    let payload = req.body
    let user = await model.updateUser(id, payload)

    return res.status(201).json(user)
  } catch (error) {
    return next(error)
  }
}

const getToken = async (req, res, next) => {
  try {
    let authorization = await authorize(req.headers.authorization)
    if (authorization.error) {
      return next(authorization)
    }
    return res.status(200).json({ message: 'token valid' })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser,
  getToken,
}
