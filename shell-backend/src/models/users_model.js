const usersQuery = require('../queries/users_queries')
const bcrypt = require('bcryptjs')

const getAllUsers = () => {
  users = usersQuery.getAllUsers()

  return users.then(result => {
    return result
  })
}

const getUserById = id => {
  user = usersQuery.getUserById(id)

  return user.then(result => {
    return !result ? { message: 'user not found', status: 404 } : result
  })
}

const getUserByUsername = username => {
  user = usersQuery.getUserByUsername(username)
  return user.then(result => {
    return !result
      ? { error: 'username or password incorrect', status: 404 }
      : result
  })
}

const loginUser = payload => {
  user = usersQuery.loginUser(payload)

  return user.then(result => {
    return result
  })
}

const createUser = payload => {
  payload.hashedPassword = bcrypt.hashSync(payload.password, 10)
  delete payload.password

  user = usersQuery.createUser(payload)

  return user.then(result => {
    return !result ? { error: 'user was not created', status: 404 } : result
  })
}

const getUserSongs = id => {
  songs = usersQuery.getUserSongs(id)

  return songs.then(result => {
    return result
  })
}

const getFollowers = id => {
  friends = usersQuery.getFollowers(id)

  return friends.then(result => {
    return result
  })
}

const getFollowing = id => {
  friends = usersQuery.getFollowing(id)

  return friends.then(result => {
    return result
  })
}

const deleteUser = id => {
  user = usersQuery.deleteUser(id)

  return user.then(result => {
    return result
  })
}

const updateUser = (id, payload) => {
  user = usersQuery.updateUser(id, payload)

  return user.then(result => {
    return result
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  getUserByUsername,
  createUser,
  getUserSongs,
  deleteUser,
  updateUser,
  getUserSongs,
  getFollowers,
  getFollowing
}
