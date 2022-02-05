import express from 'express';
import http from 'http';
import * as routes from './routes/index.js'
import { authenticateToken } from './lib/jwt.js'

const PORT = 8888;

const app = express();
const server = http.createServer(app);

app.use(authenticateToken)
for(const route of Object.values(routes)) app.use('/', route);

server.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}!`)
})
