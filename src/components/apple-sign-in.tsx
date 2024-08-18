import { ENV_VAR } from "@/lib/env";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, setLS } from "@/lib/utils";

import { BsApple } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { appleAuthHelpers } from "react-apple-signin-auth";
import { AppleAuthResponse } from "@/types/auth";

export default function AppleSignIn() {
  const navigate = useNavigate();

  const login = async () => {
    await appleAuthHelpers.signIn({
      authOptions: {
        clientId: `${ENV_VAR.APPLE_CLIENT_ID}`,
        scope: "email name",
        redirectURI: `${ENV_VAR.APP_DOMAIN}`,
        state: "state",
        nonce: "nonce",
        usePopup: true,
      },
      onSuccess: (response: AppleAuthResponse) => {
        console.log(response);

        setLS(AppConstants.auth_token, JSON.stringify(response));
        navigate(AppRoutes.profile);
      },
      onError: (error: any) => console.log(error),
    });
  };

  return (
    <button
      onClick={login}
      className="w-full border p-2 flex justify-center items-center gap-2 hover:bg-gray-50"
    >
      <BsApple className="h-6 w-6" />
      <span className="text-base text-gray-700 font-medium">
        Continue With Apple
      </span>
    </button>
  );
}
