const bcrypt = require('bcrypt')
const { QueryInterface, Sequelize } = require("sequelize");

module.exports = {
  up: (QueryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD
    const hashPassword = bcrypt.hashSync(password, 10)
    return QueryInterface.bulkInsert('user', [{
      userType: '0',
      firstName: 'John',
      lastName: 'Peter',
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (QueryInterface, Sequelize) => {
    return QueryInterface.bulkDelete('user', {userType: '0'}, {})
  }
}