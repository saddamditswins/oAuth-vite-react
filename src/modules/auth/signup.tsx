import AppleSignIn from "@/components/apple-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import LoadingPage from "@/components/loading";
import { logger } from "@/lib/logger";
import { AppRoutes } from "@/lib/routes";
import { notify } from "@/lib/utils";
import { createUser } from "@/repo/user";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control: { setError },
  } = useForm<SignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSignup = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpForm) => {
    try {
      const response = await createUser({
        email,
        password,
        firstname: firstName,
        lastname: lastName,
      });

      if (response && !response.error) {
        notify(response.message);
        navigate(AppRoutes.root);
      }
    } catch (error) {
      logger("RESPONSE DATA FOR UPLOAD", "", error);
      if (error instanceof AxiosError) {
        setError("root", {
          message: error.response?.data.message,
        });
      }
    }
  };

  if (loading) {
    return (
      <>
        <LoadingPage text="Redirecting..." />
      </>
    );
  }
  return (
    <>
      <div className="bg-white shadow-xl min-w-[32rem] border p-6 space-y-8">
        {/* Heading */}
        <div className="space-y-1">
          <h4 className="text-3xl font-semibold">Sign Up</h4>
          <p className="text-md font-light text-gray-500">
            Please enter the details below to create a new account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSignup)} className="flex flex-col gap-4">
          <input
            className="p-2 border rounded-md"
            placeholder="Enter your first name"
            {...register("firstName")}
          />
          <input
            className="p-2 border rounded-md"
            placeholder="Enter your last name"
            {...register("lastName")}
          />
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

          {Object.keys(errors).length > 0 && (
            <ul className="bg-red-50 text-red-600 p-2 col-span-2 mb-2 space-y-1">
              {Object.keys(errors).map((err) => {
                const error = errors[err as keyof typeof errors];
                return <li className="text-sm ml-2">{error?.message}</li>;
              })}
            </ul>
          )}

          <button
            className="p-2 border rounded-md bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating.." : "Create Account"}
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
            <GoogleSignIn onSuccess={() => setLoading(true)} />
          </div>
          <div className="flex-1">
            <AppleSignIn onSuccess={() => setLoading(true)} />
          </div>
        </div>

        {/* Divider */}
        <div className="flex gap-4 items-center">
          <hr className="flex-1 border" />
          <p className="text-sm font-medium">OR</p>
          <hr className="flex-1 border" />
        </div>

        {/* Sign Up */}
        <div className="flex justify-center">
          <p className="mr-1">Already have an account ?</p>
          <Link to={AppRoutes.root} className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
