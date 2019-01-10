const model = require('../models/users_model')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const signJwt = promisify(jwt.sign)
const bcrypt = require('bcryptjs')
const authenticate = require('../utils/authenticate')
const env = require('../../env')
let usersValidators = require('../utils/validators/users_validator')

const getAllUsers = async (req, res, next) => {
  try {
    let authorization = authenticate(req.headers.authorization)
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
    let authorization = authenticate(req.headers.authorization)
    if (authorization.error) {
      return next(authorization)
    }

    let user = await model.getUserById(req.params.id)

    if (user.error == 'error retrieving user') {
      return next(user)
    }
    delete result.hashedPassword
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const getUserByUsername = (req, res, next) => {
  let promise = model.getUserByUsername(req.params.username.toLowerCase())

  promise.then(result => {
    return result.error ? next(result) : res.status(200).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

const loginUser = async (req, res, next) => {
  const credentials = req.body

  // find user in database using username off of request body
  const user = await model.getUserByUsername(credentials.username.toLowerCase())

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
    const token = await signJwt(
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

    return res
      .status(200)
      .set({ authorization: token })
      .json(user)
  }

  //respond with 404 and error message if not found
  return next({ error: 'username or password is incorrect', status: 400 })
}

const createUser = async (req, res, next) => {
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

  let promise = model.createUser(payload)

  promise.then(result => {
    delete result[0].hashedPassword
    return result.error ? next(result) : res.status(201).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

const deleteUser = (req, res, next) => {
  let id = Number(req.params.id)

  let promise = model.deleteUser(id)

  promise.then(result => {
    res.status(201).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

const updateUser = (req, res, next) => {
  let id = Number(req.params.id)
  let payload = req.body
  let promise = model.updateUser(id, payload)

  promise.then(result => {
    res.status(201).json(result)
  })

  promise.catch(error => {
    next(error)
  })
}

const getToken = (req, res, next) => {
  let authorization = authenticate(req.headers.authorization)
  if (authorization.error) {
    return next(authorization)
  }
  res.status(200).json({ message: 'token valid' })
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
