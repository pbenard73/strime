const { Sequelize } = require('sequelize');
const initOrder = require('./models/order');
const initOrderLine = require('./models/orderLine');
const initProduct = require('./models/product');
const initUser = require('./models/user');

let models = {}

const initDatabase = () => {
    const sequelize = new Sequelize('postgres://postgres:admin@database:5432/strime')

    models = {
        product: initProduct(sequelize),
        order:  initOrder(sequelize),
        orderLine: initOrderLine(sequelize),
        user: initUser(sequelize)
    }

    models.orderLine.belongsTo(models.order)
    models.orderLine.belongsTo(models.product)
    models.order.belongsTo(models.user)

    sequelize.sync()
}

const getDatabase = modelName => models[modelName]

module.exports = {
    initDatabase,
    getDatabase
}