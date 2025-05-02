import Cart from "../models/cart.js";
import CartItem from "../models/cartItem.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import OrderItem from "../models/orderItem.js";

export class OrderController {
    hello(req, res) {
        res.send("Hello World!");
    }

    async checkout(req, res) {
    const user = req.user;

    const cart = await Cart.findOne({
        where: { userId: user.id }
    })

    const cartItems = await CartItem.findAll({
        where: { cartId: cart.id }
    })

    for(const item of cartItems) {
        const product = await Product.findByPk(item.productId)
        if (product.quantity < item.quantity) {
            return res.status(400).json({ message: "Product out of stock" });
        }
    }

    var totalPrice = 0
    for(const item of cartItems) {
        totalPrice += item.quantity * item.unitPrice
    }

    if (cartItems.length === 0) {
        return res.status(200).json({ message: "Your cart is empty" });
    }

    const order = await Order.create({
        userId: user.id,
        cartId: cart.id,
        status: 'pendente',
        total: totalPrice
    })

    // marcar os itens do carrinho como comprados
    for (const item of cartItems) {
        const product = await Product.findByPk(item.productId);
      
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        });
      
        // Atualiza estoque
        await product.update({
          quantity: product.quantity - item.quantity
        });
      
        // Marca CartItem como comprado
        await item.destroy(
          {
            where: {
              id: item.id
            }
          }
        );
      }

    res.json({ id: order.id, message: "Order created successfully" });
}

    async OrderItems(req, res){
        const orderId = req.params.id

        const orders = await OrderItem.findAll({
            where: { orderId: orderId }
        })

        res.json({ orders });
    }
}