var express = require('express');
const { getDatabase } = require('../database/db');
const cartManager = require('../widget/cart')
var router = express.Router();

/**
 * @api {get} /cart Get Cart
 * @apiName GetCart
 * @apiGroup Cart
 *
 * @apiSuccess {Object} cart cart.
 *
 */
router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});

/**
 * @api {delete} /cart Delete Cart
 * @apiName DeleteCart
 * @apiGroup Cart
 */
router.delete('/', (req, res, next) => {
  cartManager.resetCart(req);
  res.json(cartManager.getCart(req))
});

/**
 * @api {post} /cart/addItem Add Item to Cart
 * @apiName AddCartItem
 * @apiGroup Cart
 * 
 * @apiParam {Number} productId ProductId.
 * @apiParam {Number} quantity Quantity.
 */
router.post('/addItem', async (req, res, next) => {
  const {productId, quantity} = req.body

  const product = await getDatabase('product').findByPk(productId, {raw:true})

  if (product === null || isNaN(quantity) || quantity <= 0) {
    return res.json({valid:false})
  }

  cartManager.addItem(req, product, quantity);
  res.json(cartManager.getCart(req))
});

/**
 * @api {put} /cart/removeItem Remove Item from Cart
 * @apiName RemoveCartItem
 * @apiGroup Cart
 * 
 * @apiParam {Number} productId ProductId.
 * @apiParam {Number} quantity Quantity.
 */
router.put('/removeItem', async (req, res, next) => {
  const {productId, quantity} = req.body

  const product = await getDatabase('product').findByPk(productId, {raw:true})

  if (product === null || isNaN(quantity) || quantity <= 0) {
    return res.json({valid:false})
  }

  cartManager.removeItem(req, product, quantity);
  res.json(cartManager.getCart(req))
});

module.exports = router;
