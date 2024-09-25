const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Generate JWT Token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Signup Handler
const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  // Validate userType
  if (!['1', '2'].includes(body.userType)) {
    throw new AppError('Invalid user Type', 400);
  }

  // Create a new user
  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password, // No hashing of the password
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    return next(new AppError('Failed to create new user', 400));
  }

  const result = newUser.toJSON();

  // Delete sensitive data
  delete result.password;
  delete result.confirmPassword;
  delete result.deletedAt;

  // Generate token and add it to result
  result.token = generateToken({ id: result.id });

  // Return success response with created user data (excluding password)
  return res.status(201).json({
    status: 'Success',
    data: result, // Send user info with token, excluding password and other sensitive data
  });
});

// Login Handler
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: 'success',
    token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  // Get the token from the headers
  let idToken = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract the token from the "Authorization" header
    idToken = req.headers.authorization.split(' ')[1];
  }

  // Check if token is missing
  if (!idToken) {
    return next(new AppError('Please login to get access', 401));
  }

  // Token verification
  let tokenDetail;
  try {
    tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new AppError('Invalid or expired token, please log in again', 401));
  }

  // Get the user detail from db and add to req object
  const freshUser = await user.findByPk(tokenDetail.id);

  // Check if the user still exists
  if (!freshUser) {
    return next(new AppError('The user belonging to this token no longer exists', 401));
  }

  // Attach the user to the request object for future middlewares
  req.user = freshUser;

  // Proceed to the next middleware
  return next();
});

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(
        new AppError(
          "You don't have permission to perform this action", 403
        )
      )
    }
     return next()
  }

  return checkPermission
}

module.exports = { signup, login, authentication, restrictTo };
