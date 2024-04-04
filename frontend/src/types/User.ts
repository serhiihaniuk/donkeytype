export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};
export type UserSignUpType = Omit<User, 'id'>
export type UserSignInType = Omit<UserSignUpType, 'username'>
