const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const model = require('./items_model')
const env = require('../../env')
const authorize = require('../utils/authorize')
let itemsValidators = require('./items_validator')
let EntityController = require('../entities/entityController')

class ItemsController extends EntityController {
  constructor(model, middleware, env) {
    super(model, middleware, env)
  }
}

const middleware = { authorize, itemsValidators, bcrypt, jwt }

module.exports = new ItemsController(model, middleware, env)
