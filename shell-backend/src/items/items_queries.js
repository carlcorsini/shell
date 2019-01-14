const EntityQuery = require('../entities/EntityQuery')
const db = require('../db')

module.exports = new EntityQuery('items', db)
