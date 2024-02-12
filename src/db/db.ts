import { randomUUID } from 'crypto';
import { User } from '../interfaces/UserInt';

export const users: User[] = [
  {
    id: randomUUID(),
    username: 'Vasya',
    age: 23,
    hobbies: ['diving', 'cars'],
  },
  {
    id: randomUUID(),
    username: 'Nikolay',
    age: 25,
    hobbies: ['languages', 'gym'],
  },
];
