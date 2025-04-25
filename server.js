import http  from 'node:http';
import app from "./app.js";
const hostname = '127.0.0.1';
const port = 3000;

var server = http.createServer(app);

server.listen(port);