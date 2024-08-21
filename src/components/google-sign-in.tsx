import { useUser } from "@/hooks/use-user";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, setLS } from "@/lib/utils";
import { signIn } from "@/repo/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("tokenResponse", tokenResponse);
        // Post auth token to backend
        const res = await signIn({
          socialToken: tokenResponse.access_token,
          loginSource: "google",
        });

        if (res) {
          setLS(
            AppConstants.auth_token,
            JSON.stringify({ token: res.data.token })
          );
          setUser(res.data.user);
          navigate(AppRoutes.files);
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    },
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
