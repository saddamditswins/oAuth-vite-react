import AppleSignIn from "@/components/apple-sign-in";
import GoogleSignIn from "@/components/google-sign-in";

export function SignIn() {
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form onSubmit={onLogin} className="flex flex-col gap-4">
          <input
            className="p-2 border rounded-md"
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="p-2 border rounded-md"
            type="password"
            placeholder="Enter password"
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
