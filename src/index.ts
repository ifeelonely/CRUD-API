import fs from 'node:fs';
import http from 'node:http';
import { hostname } from 'node:os';

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.end('jopawerw');
});

server.listen(port, host, () => {
  console.log('jfsdo1s1111pa');
});

const a = a => {
  const as = 3242;
  return a + as;
};
