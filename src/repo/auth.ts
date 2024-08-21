import apiHelper, { END_POINTS } from "@/lib/api-helper";
import { AppConstants, getLS } from "@/lib/utils";
import { APIResponse } from "@/types/app";
import { IAuthToken, ISignIn, ISignInResponse } from "@/types/auth";

export async function isAuthenticated() {
  const tokenObj = getLS<IAuthToken>(AppConstants.auth_token);
  return Boolean(tokenObj?.token);
}

export async function signIn(data: ISignIn) {
  const { loginSource, email, password, socialToken } = data;

  switch (loginSource) {
    case "apple":
      return !!socialToken ? await loginWithApple(socialToken) : null;

    case "google":
      return !!socialToken ? await loginWithGoogle(socialToken) : null;

    default:
      return !!email && !!password
        ? await loginWithCreds({
            email,
            password,
          })
        : null;
  }
}

async function loginWithGoogle(socialToken: string) {
  const res = await apiHelper.post<APIResponse<ISignInResponse>, ISignIn>(
    END_POINTS.LOGIN,
    {
      socialToken,
      loginSource: "google",
    }
  );

  return res.data;
}

async function loginWithApple(socialToken: string) {
  const res = await apiHelper.post<APIResponse<ISignInResponse>, ISignIn>(
    END_POINTS.LOGIN,
    {
      socialToken,
      loginSource: "apple",
    }
  );

  return res.data;
}

async function loginWithCreds({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await apiHelper.post<APIResponse<ISignInResponse>, ISignIn>(
    END_POINTS.LOGIN,
    {
      email,
      password,
      loginSource: "email",
    }
  );

  return res.data;
}
