import { ENV_VAR } from "@/lib/env";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, setLS } from "@/lib/utils";

import { BsApple } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AppleSignInButton, {
  AppleAuthResponse as IAppleAuthResponse,
} from "react-apple-signin-auth";
import { signIn } from "@/repo/auth";

export default function AppleSignIn() {
  const navigate = useNavigate();

  return (
    <AppleSignInButton
      authOptions={{
        clientId: `${ENV_VAR.APPLE_CLIENT_ID}`,
        redirectURI: `${ENV_VAR.APP_DOMAIN}`,
        scope: "email name",
        nonce: "nonce",
        state: "state",
        usePopup: true,
      }}
      onSuccess={async (res: IAppleAuthResponse) => {
        try {
          const response = await signIn({
            socialToken: res.authorization.id_token,
            loginSource: "apple",
          });

          if (response && !response.error) {
            setLS(AppConstants.auth_token, JSON.stringify(response.data));
            navigate(AppRoutes.app);
          }
        } catch (error) {}
      }}
      onError={(error: any) => console.error(error)}
      skipScript={false}
      render={(props: any) => (
        <button
          {...props}
          className="w-full border p-2 flex justify-center items-center gap-2 hover:bg-gray-50"
        >
          <BsApple className="h-6 w-6" />
          <span className="text-base text-gray-700 font-medium">
            Continue With Apple
          </span>
        </button>
      )}
      uiType={"light"}
    />
  );
}
