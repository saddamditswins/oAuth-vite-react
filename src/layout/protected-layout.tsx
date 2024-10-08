import { NotFound } from "@/components/error-ui";
import LoadingPage from "@/components/loading";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { logger } from "@/lib/logger";
import { getUserProfile } from "@/repo/user";
import { IUser } from "@/types/user";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";

export const getUser = async () => {
  const res = await getUserProfile();
  if (res) {
    return res.data;
  }

  return null;
};

export default function ProtectedLayout() {
  const user = useLoaderData() as IUser;
  logger("USER", "", user)
  const navigation = useNavigation();

  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar user={user} />

        <div className="flex-1 overflow-auto pt-[5rem] pl-4">
          {navigation.state === "loading" ? (
            <LoadingPage />
          ) : !user ? (
            <NotFound />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
