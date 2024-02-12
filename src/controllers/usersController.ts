import http from 'node:http';
import { findOneUser, findUsers } from '../models/usersModel';

export const getUsers = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  try {
    const users = await findUsers();
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Server Error!');
  }
};

export const getOneUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  try {
    const curId = req.url!.split('/')[3];
    const reg =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!reg.test(curId)) {
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end('Invalid user id!');
      return;
    }
    const user = await findOneUser(curId);
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    if (error === 'User not found!') {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end('User not found!');
    } else {
      res.writeHead(500, { 'Content-type': 'text/plain' });
      res.end('Server Error!');
    }
  }
};
