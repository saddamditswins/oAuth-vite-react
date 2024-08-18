export interface IGoogleAuthToken {
  access_token: string;
  // More props by google signin
}
interface Authorization {
  state: string;
  code: string;
  id_token: string;
}

interface User {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
}

export interface AppleAuthResponse {
  authorization: Authorization;
  user: User;
}
