import http from 'node:http';
import { getOneUser, getUsers } from './controllers/usersController';

const PORT = process.env.PORT || 5000;
const server = http.createServer();

server.listen(PORT, () => {});

server.on('request', (req, res) => {
  const uuid = req.url?.split('/')[3];
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (uuid && req.method === 'GET') {
    getOneUser(req, res);
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('The requested resourse is not found!');
  }
});
