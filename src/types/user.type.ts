export default interface IUser {
  sub: string;
  id: string;
  role: string;
}

export interface IUserSignup {
  username: string;
  email: string;
  password: string;
}
