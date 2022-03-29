var express = require('express');
const { getDatabase } = require('../database/db');
const cartManager = require('../widget/cart');
var router = express.Router();

/**
 * @api {post} /order Generate Order from cart
 * @apiName AddCartItem
 * @apiGroup Order
 * 
 */
router.post('/', async (req, res, next) => {
  const cart = cartManager.getCart(req)

  if (cart.items.length < 1) {
    return res.json({valid: false, cart})
  }

  const newOrder = await getDatabase('order').create({})

  const promises = cart.items.map(({productId, quantity}) => getDatabase('orderLine').create({orderId: newOrder.id, productId, quantity}))

  await Promise.all(promises)

  res.json({valid:true})
});

module.exports = router;
