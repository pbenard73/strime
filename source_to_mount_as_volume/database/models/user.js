const { Sequelize, Model, DataTypes } = require('sequelize');

class User extends Model {}

const initUser = (sequelize) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: 'user' });

  return User
}

module.exports = initUser