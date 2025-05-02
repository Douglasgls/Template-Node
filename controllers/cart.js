import Cart  from '../models/cart.js';
import CartItem from '../models/cartItem.js';
import Product from '../models/product.js';

export class CartController {
    hello(req, res) {
        res.json({ message: "Hello World" });
    }

    async allCart(req, res) {
        const user = req.user;

        const cartItems = await CartItem.findAll({
            where: { cartId: user.id }
        })

        if (cartItems.length === 0) {
            return res.status(200).json({ message: "Your cart is empty" });
        }

        return res.status(200).json({ cartItems });
    }

    async addItemToCart(req, res) {
        const user = req.user;

        const productId = req.params.id;
        const quantity = req.body.quantity;


        if (!productId || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity need it is bigger zero" });
        }

        const cart = await Cart.findOne({
            where: { userId: user.id }
        })

        const validProd = await Product.findOne({
            where: { id: productId }
        })

        if (!validProd) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })

        if (cartItem && cartItem.purchased === false) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartItem.create({
                cartId: cart.id,
                productId,
                quantity,
                unitPrice: validProd.price
            });
        }

        return res.status(200).json({ message: "Item added to cart,continue buying" });
    }

    async removeItemFromCart(req, res) {
        const user = req.user;

        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const cart = await Cart.findOne({
            where: { userId: user.id }
        })

        const validProd = await Product.findOne({
            where: { id: productId }
        })

        if (!validProd) {
            return res.status(404).json({ message: "Product not found" });
        }

        await CartItem.destroy({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })

        return res.status(200).json({ message: "Item removed from cart" });
    }

    async clearCart(req, res) {
        const user = req.user;

        const cart = await Cart.findOne({
            where: { userId: user.id }
        })

        await CartItem.destroy({
            where: {
                cartId: cart.id
            }
        })

        return res.status(200).json({ message: "Cart cleared" });
    }

    async quantityUpdate(req, res) {
        const user = req.user;

        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity need it is bigger zero" });
        }

        const cart = await Cart.findOne({
            where: { userId: user.id }
        })

        const validProd = await Product.findOne({
            where: { id: productId }
        })

        if (!validProd) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        await CartItem.update({
            quantity: quantity
        }, {
            where: {
                cartId: cart.id,
                productId: productId
            }
        })

        return res.status(200).json({ message: "Item quantity updated" });
    }
}