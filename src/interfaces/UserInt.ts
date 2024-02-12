export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export interface UserNoId {
  username: string;
  age: number;
  hobbies: string[] | [];
}
