const db = require('../db')
const EntityQuery = require('../entities/EntityQuery')

module.exports = new EntityQuery('items', db)
