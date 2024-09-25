const { Sequelize, Op } = require("sequelize"); // Import Op for operators
const catchAsync = require("../utils/catchAsync");
const user = require('../db/models/user');

const getAllUser = catchAsync(async (req, res, next) => {
  const users = await user.findAndCountAll({
    where: {
      userType: {
        [Op.ne]: '0',  // Use Sequelize.Op.ne for "not equal" operator
      },
    },
    attributes: { exclude: ['password'] },  // Exclude password from response
  });

  return res.status(200).json({
    status: 'success',
    data: users,
  });
});

module.exports = { getAllUser };
