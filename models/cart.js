const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
  },
});

module.exports = Cart;

// userId: {
//   type: Sequelize.INTEGER,
//   unique: true
// }
