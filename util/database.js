const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Thesaneman12_', {
  dialect: 'mysql',
  host: 'localhost',
});


module.exports = sequelize