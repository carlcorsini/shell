const usersQuery = require('./users_queries')
const EntityModel = require('../entities/entityModel')

module.exports = new EntityModel(usersQuery, 'users')
