// const model = require('../models/users_model')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const env = require('../../env')
// const authorize = require('../utils/authorize')
// let usersValidators = require('../utils/validators/users_validator')
// let UsersController = require('./entityController')
//
// const middleware = { authorize, usersValidators, bcrypt }
//
// module.exports = new UsersController(model, middleware)

// const getAllUsers = async (req, res, next) => {
//   try {
//     let authorization = await authorize(req.headers.authorization)
//     if (authorization.error) {
//       return next(authorization)
//     }
//
//     let users = await model.getAll()
//     return res.status(200).json(users)
//   } catch (error) {
//     return next(error)
//   }
// }
//
// const getUserById = async (req, res, next) => {
//   try {
//     let authorization = await authorize(req.headers.authorization)
//     if (authorization.error) {
//       return next(authorization)
//     }
//
//     let user = await model.getById(req.params.id)
//
//     // let [followers, following] = await Promise.all([
//     //   model.getFollowers(user.id),
//     //   model.getFollowing(user.id),
//     // ])
//     //
//     // user.followers = followers
//     // user.following = following
//
//     if (user.error == 'error retrieving user') {
//       return next(user)
//     }
//     delete user.hashedPassword
//     return res.status(200).json(user)
//   } catch (error) {
//     return next(error)
//   }
// }
//
// const getUserByUsername = async (req, res, next) => {
//   try {
//     let user = await model.getByAttribute(
//       'username',
//       req.params.username.toLowerCase()
//     )
//     return user.error ? next(user) : res.status(200).json(user)
//   } catch (error) {
//     return next(error)
//   }
// }
//
// const loginUser = async (req, res, next) => {
//   try {
//     const credentials = req.body
//     const user = await model.getByEitherOr(
//       'email',
//       'username',
//       credentials.username.toLowerCase()
//     )
//
//     if (user.error) {
//       return next(user)
//     }
//
//     const isValid = await bcrypt.compare(
//       credentials.password,
//       user.hashedPassword
//     )
//
//     if (isValid) {
//       // let [followers, following] = await Promise.all([
//       //   model.getFollowers(user.id),
//       //   model.getFollowing(user.id),
//       // ])
//       //
//       // user.followers = followers
//       // user.following = following
//
//       delete user.hashedPassword
//       // create JWT token
//       const timeIssued = Math.floor(Date.now() / 1000)
//       const timeExpires = timeIssued + 86400 * 28
//       const token = await jwt.sign(
//         {
//           iss: 'auth_test',
//           aud: 'auth_test',
//           iat: timeIssued,
//           exp: timeExpires,
//           identity: user.id,
//         },
//         env.JWT_KEY
//       )
//
//       user.token = token
//       return res
//         .status(200)
//         .set({ authorization: token })
//         .json(user)
//     }
//
//     return next({ error: 'username or password is incorrect', status: 400 })
//   } catch (error) {
//     return next(error)
//   }
// }
//
// const createUser = async (req, res, next) => {
//   try {
//     let payload = req.body
//     let isValid = usersValidators.createUser(payload)
//     if (!isValid) return next(isValid)
//
//     payload.profile_pic =
//       'https://cdn1.iconfinder.com/data/icons/ios-edge-line-12/25/User-Square-512.png'
//
//     // console.log('does user')
//     // let doesUsernameExist = await model.getByAttr('username',
//     //   payload.username.toLowerCase()
//     // )
//     // console.log('does email')
//     // let doesEmailExist = await model.getByAttr('email',
//     //   payload.email.toLowerCase()
//     // )
//
//     let [doesEmailExist, doesUsernameExist] = await Promise.all([
//       model.getByAttr('username', payload.username),
//       model.getByAttr('email', payload.email),
//     ])
//
//     if (doesEmailExist.email) {
//       return next({ error: 'that email is taken', status: '404' })
//     }
//
//     if (doesUsernameExist.username) {
//       console.log('hey')
//       return next({ error: 'that username is taken', status: '404' })
//     }
//     // if (!doesEmailExist && !doesUsernameExist) {
//     payload.hashedPassword = await bcrypt.hash(payload.password, 10)
//     delete payload.password
//
//     let user = await model.create(payload)
//     delete user[0].hashedPassword
//     return user.error ? next(user) : res.status(201).json(user)
//     // }
//   } catch (error) {
//     return next(error)
//   }
// }
//
// const deleteUser = async (req, res, next) => {
//   try {
//     let id = Number(req.params.id)
//
//     let user = await model.delete(id)
//     return res.status(201).json(user)
//   } catch (error) {
//     next(error)
//   }
// }
//
// const updateUser = async (req, res, next) => {
//   try {
//     let id = Number(req.params.id)
//     let payload = req.body
//
//     let user = await model.update(id, payload)
//     console.log(user)
//     return res.status(201).json(user)
//   } catch (error) {
//     return next(error)
//   }
// }
//
// const getToken = async (req, res, next) => {
//   try {
//     let authorization = await authorize(req.headers.authorization)
//     if (authorization.error) {
//       return next(authorization)
//     }
//     return res.status(200).json({ message: 'token valid' })
//   } catch (error) {
//     return next(error)
//   }
// }
//
// module.exports = {
//   getAllUsers,
//   getUserById,
//   loginUser,
//   getUserByUsername,
//   createUser,
//   deleteUser,
//   updateUser,
//   getToken,
// }
