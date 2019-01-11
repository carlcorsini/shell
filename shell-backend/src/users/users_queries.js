const EntityQuery = require('../entities/EntityQuery')
const db = require('../db')

module.exports = new EntityQuery('users', db)
