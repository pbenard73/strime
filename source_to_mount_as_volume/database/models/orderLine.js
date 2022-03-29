const { Sequelize, Model, DataTypes } = require('sequelize');

class OrderLine extends Model {}

const initOrderLine = (sequelize) => {
  OrderLine.init({
    quantity: DataTypes.FLOAT,
  }, { sequelize, modelName: 'orderline' });

  return OrderLine

}
module.exports = initOrderLine