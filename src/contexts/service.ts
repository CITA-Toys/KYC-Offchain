import * as path from 'path'
const Sequelize = require('sequelize')
require('dotenv').config({
  path: path.join(__dirname, '../../config/.env'),
})
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
  },
)

export const HashedFile = sequelize.define('hashed_file', {
  name: { type: Sequelize.STRING, allowNull: false },
  hash: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  url: { type: Sequelize.STRING, allowNull: false },
})

export default sequelize
