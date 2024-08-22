import { AppRoutes } from "@/lib/routes";
import { AppConstants, setLS } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/repo/auth";

export default function GoogleSignIn({onSuccess}: {onSuccess: () => void}) {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      onSuccess();
      try {
        const response = await signIn({
          socialToken: tokenResponse.access_token,
          loginSource: "google",
        });

        if (response && !response.error) {
          setLS(AppConstants.auth_token, JSON.stringify(response.data));
          navigate(AppRoutes.files);
        }
      } catch (error) {}
    }
  });

  return (
    <button
      onClick={() => login()}
      className="border p-2 flex justify-center items-center gap-2 hover:bg-gray-50"
    >
      <FcGoogle className="h-6 w-6" />
      <span className="text-base text-gray-700 font-medium">
        Continue With Google
      </span>
    </button>
  );
}
