const itemsQuery = require('./items_queries')
const EntityModel = require('../entities/entityModel')

module.exports = new EntityModel(itemsQuery, 'items')
