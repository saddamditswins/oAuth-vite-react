export interface IUserCreate {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  login_source: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  google_token?: string;
}