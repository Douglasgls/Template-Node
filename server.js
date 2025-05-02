import http  from 'node:http';
import app from "./app.js";
const port = 3000;

var server = http.createServer(app);

server.listen(port);