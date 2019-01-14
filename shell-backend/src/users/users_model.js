const EntityModel = require('../entities/entityModel')
const usersQuery = require('./users_queries')

module.exports = new EntityModel(usersQuery, 'users')
