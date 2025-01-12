const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const obj = {
    host: process.env.DB_HOST,
    dialect: process.env.dialect,
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,obj)

const db = {sequelize: sequelize }

// all modle call 
db.Registration = require('../models/Registration')(sequelize)
db.User = require('../models/user')(sequelize)



module.exports = db;

