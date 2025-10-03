const sequelize = require('sequelize');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL n\'est pas définie dans le fichier .env');
}

const db = new sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

module.exports = db;