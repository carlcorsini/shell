const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const model = require('./items_model')
const env = require('../../env')
const authorize = require('../utils/authorize')
let itemValidators = require('./items_validator')
let EntityController = require('../entities/entityController')

const middleware = { authorize, bcrypt, jwt }

module.exports = new EntityController(model, middleware, itemValidators, env)
