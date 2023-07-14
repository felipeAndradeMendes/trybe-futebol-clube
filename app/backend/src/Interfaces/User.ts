export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserModel {
  findByEmail(email: string): Promise<IUser | null>,
}
