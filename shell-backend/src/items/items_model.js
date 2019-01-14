const entityModel = require('../entities/entityModel')
const itemsQuery = require('./items_queries')

module.exports = new entityModel(itemsQuery, 'items')
