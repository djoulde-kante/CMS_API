const { DataTypes } = require('sequelize');
const db = require('../config/config');
const e = require('express');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
},
    lastName: {
    type: DataTypes.STRING,
    allowNull: false
},
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
},
role: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ['admin', 'editor', 'viewer'],
    defaultValue: 'viewer'
},
    password: {
    type: DataTypes.STRING,
    allowNull: false
},
createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
},
updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
}
}, {
  tableName: 'users',
});

module.exports = User;

