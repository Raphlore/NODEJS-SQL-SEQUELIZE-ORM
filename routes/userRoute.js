const { authentication, restrictTo } = require('../controllers/auth.controller')
const { getAllUser } = require('../controllers/userController')



const router = require('express').Router()

router.route('/').get(authentication, restrictTo('0'), getAllUser)

module.exports = router