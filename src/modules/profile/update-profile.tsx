import { logger } from "@/lib/logger";
import { AppRoutes } from "@/lib/routes";
import { updateUser } from "@/repo/user";
import { IUser, IUserCreate } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";

export function UpdateProfile() {
  const user = useRouteLoaderData(AppRoutes.app) as IUser;
  const { revalidate, state } = useRevalidator();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control: { setError },
  } = useForm<IUserCreate>({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    disabled: state === "loading",
  });

  const onUpdate = async (updatedUser: IUserCreate) => {
    logger("updatedUser", "", updatedUser);
    try {
      const res = await updateUser(user._id, {
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
      });

      if (!res.error) {
        revalidate();
      } else {
        setError("root", {
          message: res.message,
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="grid grid-cols-2 gap-4"
      >
        <input
          className="p-2 border rounded-md"
          placeholder="Enter your first name"
          {...register("firstname", { required: "First Name is required!" })}
        />
        <input
          className="p-2 border rounded-md"
          placeholder="Enter your last name"
          {...register("lastname", { required: "Last Name is required!" })}
        />
        <input
          className="p-2 border rounded-md col-span-2"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required!" })}
        />

        <div className="col-span-2 mt-6">
          {Object.keys(errors).length > 0 && <ul className="bg-red-50 text-red-600 p-2 col-span-2 mb-2 space-y-1">
            <li className="text-sm">Please fix following errors - </li>
            {Object.keys(errors).map((err) => {
              const error = errors[err as keyof typeof errors];
              return <li className="text-sm ml-2">{error?.message}</li>;
            })}
          </ul>}

          <button
            className="p-2 border rounded-md bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            type="submit"
            disabled={isSubmitting}
          >
            Update Profile
          </button>
        </div>
      </form>
      <p>{errors.root?.message}</p>
    </>
  );
}
