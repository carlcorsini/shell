const bcrypt = require('bcryptjs')
const UsersModel = require('./entityModel')
const usersQuery = require('../queries/users_queries')
module.exports = new UsersModel(usersQuery)
