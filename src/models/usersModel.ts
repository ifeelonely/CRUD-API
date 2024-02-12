import { randomUUID } from 'crypto';
import { users } from '../db/db';
import { User, UserNoId } from '../interfaces/UserInt';

export const findUsers = async (): Promise<User[]> => {
  return new Promise<User[]>(resolve => {
    resolve(users);
  });
};

export const findOneUser = async (id: string | undefined): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) resolve(users[i]);
    }
    reject('User not found!');
  });
};

export const createOneUser = async (user: UserNoId): Promise<UserNoId> => {
  return new Promise(resolve => {
    const newUser = { id: randomUUID(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
};
