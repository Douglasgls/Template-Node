import path from 'path';
import express from 'express';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';

// Router
import auth from './routes/auth.js';
import user from './routes/user.js';

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(, 'public'))); 


// Router
app.use('/auth/v1', auth);
app.use('/user/v1', user);

export default app;