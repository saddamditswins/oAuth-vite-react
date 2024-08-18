import { AppRoutes } from "@/lib/routes";
import { AppConstants, setLS } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn() {
  const navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Post auth token to backend which will verify it and return a valid - 
      // 1. auth token (For Google APIs) 
      // 2. id_token (JWT)
      // 3. refresh token
      
      setLS(AppConstants.auth_token, JSON.stringify(tokenResponse));
      navigate(AppRoutes.profile)
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
