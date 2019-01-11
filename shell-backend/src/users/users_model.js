const UsersModel = require('../entities/entityModel')
const usersQuery = require('./users_queries')
module.exports = new UsersModel(usersQuery)
