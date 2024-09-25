const { authentication, restrictTo } = require('../controllers/auth.controller')
const { createProject, getAllProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectController')

const router = require('express').Router()

router
.route('/')
.post(authentication, restrictTo('2'), createProject)
.get(authentication, restrictTo('2'), getAllProject)

router
.route('/:id')
.get(authentication, restrictTo('2'), getProjectById)
.put(authentication, restrictTo('2'), updateProject)
.delete(authentication, restrictTo('2'), deleteProject)


module.exports = router