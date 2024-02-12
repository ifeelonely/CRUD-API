import http from 'node:http';
import { createOneUser, findOneUser, findUsers } from '../models/usersModel';
import { users as usersDb } from '../db/db';

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
      res.writeHead(400, { 'Content-type': 'text/plain' });
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

export const createUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || !age || !hobbies) {
        res.writeHead(400, { 'Content-type': 'text/plain' });
        res.end('Body does not contain required fields!');
        return;
      }
      createOneUser({ username, age, hobbies }).then(newUser => {
        res.writeHead(201, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(newUser));
      });
    });
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Server Error!');
  }
};

export const updateUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  const curId = req.url!.split('/')[3];
  const reg =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!reg.test(curId)) {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Invalid user id!');
    return;
  }
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || !age || !hobbies) {
        res.writeHead(400, { 'Content-type': 'text/plain' });
        res.end('Body does not contain required fields!');
        return;
      }
      for (let i = 0; i < usersDb.length; i++) {
        if (usersDb[i].id === curId) {
          usersDb[i] = { username, age, hobbies, id: curId };
          res.writeHead(200, { 'Content-type': 'application/json' });
          res.end(JSON.stringify(usersDb[i]));
          return;
        }
      }
      res.writeHead(404, { 'Content-type': 'text/plain' });
      res.end('User does not exist!');
    });
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Server Error!');
  }
};

export const deleteUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  const curId = req.url!.split('/')[3];
  const reg =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!reg.test(curId)) {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Invalid user id!');
    return;
  }
  try {
    let isFound = false;
    let forDelete = 0;
    for (let i = 0; i < usersDb.length; i++)
      if (usersDb[i].id === curId) {
        isFound = true;
        forDelete = i;
      }
    if (!isFound) {
      res.writeHead(404, { 'Content-type': 'text/plain' });
      res.end('User does not exist!');
      return;
    }

    usersDb.splice(forDelete, 1);
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end(`User with id ${curId} has been removed!`);
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Server Error!');
  }
};
