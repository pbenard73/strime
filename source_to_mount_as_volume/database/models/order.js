const { Sequelize, Model, DataTypes } = require('sequelize');

class Order extends Model {}

const initOrder = (sequelize) => {
  Order.init({
    status: {
        type: DataTypes.ENUM("active", "processed", "error"),
        defaultValue:'active'
    },
  }, { sequelize, modelName: 'order' });

  return Order
}

module.exports = initOrder