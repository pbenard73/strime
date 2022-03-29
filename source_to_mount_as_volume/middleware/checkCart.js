const cartManager = require('../widget/cart')

const checkCart = (req, res, next) => {
    cartManager.checkCartExistence(req)

    return next()
}

module.exports = checkCart