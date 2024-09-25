const { Sequelize } = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config')

const sequelize = new Sequelize(config[env])

module.exports = sequelize

// const { Sequelize } = require('sequelize'); // Correct import

// const env = process.env.NODE_ENV || 'development';
// const config = require('./config')[env]; // Ensure you reference the correct environment configuration

// // Initialize Sequelize with the configuration for the environment
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     port: config.port,
//     dialect: config.dialect
//   }
// );

// module.exports = sequelize;
