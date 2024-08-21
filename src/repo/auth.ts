import { AppConstants, getLS } from "@/lib/utils";
import { IAuthToken } from "@/types/auth";

export async function isAuthenticated() {
  const tokenObj = getLS<IAuthToken>(AppConstants.auth_token);
  return Boolean(tokenObj?.token);
}
