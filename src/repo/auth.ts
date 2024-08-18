import { AppConstants, getLS } from "@/lib/utils";
import { IGoogleAuthToken } from "@/types/auth";

export async function isAuthenticated() {
  const token = getLS(AppConstants.auth_token) as IGoogleAuthToken;
  return token ? { token } : null;
}
