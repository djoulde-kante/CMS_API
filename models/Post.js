const { DataTypes } = require('sequelize');
const db = require('../config/config');

const Post = db.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,        
    },
    authorId:{
        type: DataTypes.INTEGER,
        allowNull: false,   
    },
    tags:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,   
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false, 
        enum: ['technology', 'health', 'finance', 'education', 'entertainment', 'travel', 'lifestyle', 'food', 'sports', 'news'],
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,   
        defaultValue: DataTypes.NOW,  
    },
}, {
    tableName: 'posts',
});


module.exports = Post;