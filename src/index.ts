import http from 'node:http';
import dotenv from 'dotenv';
import 'dotenv/config';
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from './controllers/usersController';

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer();

server.listen(PORT, () => {
  console.log(`Server started running on port: ${PORT}`);
});

server.on('request', (req, res) => {
  const uuid = req.url?.split('/')[3];
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (uuid && req.method === 'GET') {
    getOneUser(req, res);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (uuid && req.method === 'PUT') {
    updateUser(req, res);
  } else if (uuid && req.method === 'DELETE') {
    deleteUser(req, res);
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('The requested resourse is not found!');
  }
});
