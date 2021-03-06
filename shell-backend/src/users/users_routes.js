const express = require('express')
const router = express.Router()
const ctrl = require('./users_controller')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/login', ctrl.login)
router.post('/register', ctrl.create)
router.post('/token', ctrl.token)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.delete)

module.exports = router
