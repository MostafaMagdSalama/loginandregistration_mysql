const Sequelize = require('sequelize');
const sequelize=require('../database');


const user = sequelize.define('user', {
    // attributes
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports=user;