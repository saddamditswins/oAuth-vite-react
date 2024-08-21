export interface IAuthToken {
  token: string;
}

export interface ILogin {
  loginSource: "email" | "google" | "apple";
  socialToken?: string;
  email?: string;
  password?: string;
}
