import { useRouteLoaderData } from "react-router-dom";
import { UpdateProfile } from "./update-profile";
import { AppRoutes } from "@/lib/routes";
import { IUser } from "@/types/user";
import { bytesToGB, bytesToMB } from "@/lib/utils";

export function MyProfile() {
  const user = useRouteLoaderData(AppRoutes.app) as IUser;
  const sizeInMb = bytesToGB(user.maxStorageLimit);
  const usedMb = bytesToMB(user.totalFileSize);
  return (
    <>
      <div className="bg-white shadow min-w-[32rem] max-w-[32rem] border p-6 space-y-8">
        {/* Heading */}
        <div className="flex justify-between items-start">
          <div className="">
            <h4 className="text-2xl font-medium">My Profile</h4>
            <p className="text-base font-light text-gray-500">
              Below are your details and you can update them
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Storage Used - </span>
            <span className="text-sm font-medium">
              {usedMb} MB / {sizeInMb} GB
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <UpdateProfile />
      </div>
    </>
  );
}
