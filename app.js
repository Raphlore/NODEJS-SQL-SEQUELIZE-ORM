require('dotenv').config({path: `${process.cwd()}/.env` })
const express = require('express')

const authRouter = require('./routes/authRoute')
const projectRouter = require('./routes/projectRoute')
const catchAsync = require('./utils/catchAsync')
const AppError = require('./utils/appError')
const { stack } = require('sequelize/lib/utils')
const globalErrorHandler = require('./controllers/errorController')
const userRoute = require('./routes/userRoute')

const app = express()

app.use(express.json())

// All routes will be here
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/projects', projectRouter)

// Mount the user routes
app.use('/api/v1/users', userRoute);

// Wrong routes error 
app.use('*', catchAsync(async (req, res, next) => {
  throw new AppError(`can't find ${req.originalUrl} on this server`, 404)
})
)

app.use(globalErrorHandler)


const PORT = process.env.APP_PORT || 4000

app.listen(PORT, () => {
  console.log('Server up and running', PORT)
})