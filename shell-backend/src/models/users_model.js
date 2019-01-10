const usersQuery = require('../queries/users_queries')
const bcrypt = require('bcryptjs')

const getAllUsers = async () => {
  try {
    let users = await usersQuery.getAllUsers()
    return users
  } catch (error) {
    return next(error)
  }
}

const getUserById = async id => {
  try {
    let user = await usersQuery.getUserById(id)
    return !user ? { message: 'user not found', status: 404 } : user
  } catch (error) {
    return next(error)
  }
}

const getUserByUsername = async username => {
  try {
    let user = await usersQuery.getUserByUsername(username)

    return !user
      ? { error: 'username or password incorrect', status: 404 }
      : user
  } catch (error) {
    return next(error)
  }
}

const createUser = async payload => {
  try {
    payload.hashedPassword = await bcrypt.hash(payload.password, 10)
    delete payload.password

    let user = await usersQuery.createUser(payload)
    return !user ? { error: 'user was not created', status: 404 } : user
  } catch (error) {
    return next(error)
  }
}

const deleteUser = async id => {
  try {
    let user = await usersQuery.deleteUser(id)
    return user
  } catch (error) {
    return next(error)
  }
}

const updateUser = async (id, payload) => {
  try {
    let user = await usersQuery.updateUser(id, payload)
    return user
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser,
}
