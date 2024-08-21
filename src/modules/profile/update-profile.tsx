import { logger } from "@/lib/logger";
import { AppRoutes } from "@/lib/routes";
import { updateUser } from "@/repo/user";
import { IUser } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";

export function UpdateProfile() {
  const user = useRouteLoaderData(AppRoutes.app) as IUser;
  const {revalidate, state} = useRevalidator();

  const { handleSubmit, register } = useForm<IUser>({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    disabled: state === "loading",
  });

  const onUpdate = async (updatedUser: IUser) => {
    logger("updatedUser", "", updatedUser);
    try {
      await updateUser(user._id, {
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
      });
      revalidate();
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)} className="grid grid-cols-2 gap-4">
      <input
        className="p-2 border rounded-md"
        placeholder="Enter your first name"
        {...register("firstname")}
      />
      <input
        className="p-2 border rounded-md"
        placeholder="Enter your last name"
        {...register("lastname")}
      />
      <input
        className="p-2 border rounded-md col-span-2"
        placeholder="Enter your email"
        {...register("email")}
      />

      <div className="flex justify-start col-span-2 mt-8">
        <button
          className="p-2 border rounded-md bg-blue-600 text-white"
          type="submit"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}
