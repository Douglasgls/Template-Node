import express from 'express';

// Router
import auth from './routes/auth.js';
import user from './routes/user.js';
import product from './routes/product.js';
import cart from './routes/cart.js';
import order from './routes/order.js';
import cob from './routes/cob.js';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Router
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/product', product);
app.use('/api/v1/cart', cart);
app.use('/api/v1/order', order);
app.use('/api/v1/cob', cob);

app.get('/', (req, res) => {
    res.send('API funcionando 🎉');
  });

export default app;