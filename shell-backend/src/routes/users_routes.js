const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users_controller')

// ===============================================
// GET ROUTES FOR USER PROFILE
// ===============================================

router.get('/', ctrl.getAllUsers)
router.get('/:id', ctrl.getUserById)
router.post('/login', ctrl.loginUser)
router.post('/register', ctrl.createUser)
router.post('/token', ctrl.getToken)
router.delete('/:id', ctrl.deleteUser)
router.put('/:id', ctrl.updateUser)

module.exports = router
