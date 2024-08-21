import AppleSignIn from "@/components/apple-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, setLS } from "@/lib/utils";
import { signIn } from "@/repo/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInForm = {
  email: string;
  password: string;
};
export function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignInForm>({
    defaultValues: {
      email: "rajan@ditstek.com",
      password: "test@123",
    },
  });

  const onLogin = async ({ email, password }: SignInForm) => {
    try {
      const response = await signIn({
        email,
        password,
        loginSource: "email",
      });

      if (response && !response.error) {
        setLS(AppConstants.auth_token, JSON.stringify(response.data));
        navigate(AppRoutes.app);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-white shadow-xl min-w-[32rem] border p-6 space-y-8">
        {/* Heading */}
        <div className="space-y-1">
          <h4 className="text-3xl font-semibold">Sign In</h4>
          <p className="text-md font-light text-gray-500">
            Please enter the details below to login and continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
          <input
            className="p-2 border rounded-md"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <input
            className="p-2 border rounded-md"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          <button
            className="p-2 border rounded-md bg-blue-600 text-white"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex gap-4 items-center">
          <hr className="flex-1 border" />
          <p className="text-sm font-medium">OR</p>
          <hr className="flex-1 border" />
        </div>

        {/* OAuth Login */}
        <div className="flex gap-4">
          <div className="flex-1">
            <GoogleSignIn />
          </div>
          <div className="flex-1">
            <AppleSignIn />
          </div>
        </div>
      </div>
    </>
  );
}
