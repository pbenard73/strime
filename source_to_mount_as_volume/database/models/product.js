const { Sequelize, Model, DataTypes } = require('sequelize');

class Product extends Model {}

const initProduct = (sequelize) => {
  Product.init({
    label: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, { sequelize, modelName: 'product' });

  return Product
}

module.exports = initProduct