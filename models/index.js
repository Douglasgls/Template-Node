import User from './users.js';
import Product from './product.js';
import Cart from './cart.js';
import CartItem from './cartItem.js';
import Order from './order.js';
// import OrderItem from './orderItem.js';

User.hasOne(Cart, { foreignKey: 'userId' }); // um usuário possui um carrinho de compras
Cart.hasMany(CartItem, { foreignKey: 'cartId' }); // um carrinho de compras possui vários itens de carrinho de compras

CartItem.belongsTo(Cart, { foreignKey: 'cartId' }); // um item de carrinho de compras pertence a um carrinho de compras
CartItem.belongsTo(Product , { foreignKey: 'productId' }); // um item de carrinho de compras pertence a um produto

User.hasMany(Order, { foreignKey: 'userId' }); // um usuário possui vários pedidos


export default { User, Product, Cart, CartItem };