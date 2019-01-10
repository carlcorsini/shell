const knex = require('./db')

const getAllUsers = () => {
  return knex('users').orderBy('created_at', 'desc')
}

const getUserById = id => {
  return knex('users')
    .where('id', id)
    .first()
    .catch(error => {
      console.log(error)
      return { error: 'error retrieving user', status: 500 }
    })
}

const getUserByUsername = username => {
  return knex('users')
    .whereRaw(`Lower(username) LIKE ?`, `%${username}%`)
    .orWhereRaw(`Upper(username) LIKE ?`, `%${username}%`)
    .orWhereRaw(`Lower(email) LIKE ?`, `%${username}%`)
    .orWhereRaw(`Upper(email) LIKE ?`, `%${username}%`)
    .first()
}

const createUser = payload => {
  return knex('users')
    .insert(payload)
    .returning('*')
}

const getUserSongs = id => {
  return knex('songs')
    .where('user_id', id)
    .orderBy('created_at', 'desc')
}

const getFollowers = id => {
  return knex('friendships')
    .join('users', 'users.id', '=', 'friendships.followee_id')
    .where('friendships.follower_id', id)
    .select('users.id', 'users.username', 'users.profile_pic')
    .orderBy('friendships.created_at', 'desc')
}

const getFollowing = id => {
  return knex('friendships')
    .join('users', 'users.id', '=', 'friendships.follower_id')
    .where('friendships.followee_id', id)
    .select('users.id', 'users.username', 'users.profile_pic')
    .orderBy('friendships.created_at', 'desc')
}

const deleteUser = id => {
  return knex('users')
    .where('id', id)
    .del()
    .then(result => {
      return knex('users')
    })
}

const updateUser = (id, payload) => {
  return knex('users')
    .where('id', id)
    .update(payload)
    .returning('*')
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  getUserSongs,
  getFollowers,
  getFollowing,
  deleteUser,
  updateUser,
}
