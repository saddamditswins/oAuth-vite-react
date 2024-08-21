import { IUser } from "./user";

// Token stored in LS
export interface IAuthToken {
  token: string;
}

// Interface for login request
export interface ISignIn {
  loginSource: "email" | "google" | "apple";
  socialToken?: string;
  email?: string;
  password?: string;
}

// Response from sign in API
export type ISignInResponse = {
  user: IUser;
  token: string;
};
