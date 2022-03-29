const defaultCart = {
    items: [],
    total: 0
}

class CartManager {
    getCart(req) {
        return req.session.cart;
    }

    resetCart(req) {
        req.session.cart = defaultCart;
    }

    addItem(req, product, quantity) {
        const items = [...req.session.cart.items]

        const exists = items.find(i => i.productId === product.id) || null

        if (null === exists) {
            items.push({productId: product.id, quantity: quantity})
        } else {
            exists.quantity += quantity
        }

        req.session.cart.items = items
    }

    removeItem(req, product, quantity) {
        const items = [...req.session.cart.items]

        const exists = items.find(i => i.productId === product.id) || null

        if (null !== exists) {           
            exists.quantity -= quantity
            if (exists.quantity <= 0) {
                items = items.filter(i => i.prodcutId !== product.id)
            }
        }

        req.session.cart.items = items
    }

    checkCartExistence(req) {
        if (req.session.cart === undefined) {
            req.session.cart =  {
                items: [],
                total: 0
            }
        }
    }
}

const cartManager = new CartManager()

module.exports = cartManager;