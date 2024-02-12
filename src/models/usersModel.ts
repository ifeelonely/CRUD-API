import { users } from '../db/db';
import { User } from '../interfaces/UserInt';

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
