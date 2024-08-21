import { NotFound } from "@/components/error-ui";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { IAuthToken } from "@/types/auth";
import { Outlet, useLoaderData } from "react-router-dom";

export default function ProtectedLayout() {
  const { token } = useLoaderData() as { token: IAuthToken };
  if (!token) {
    return <NotFound />;
  }
  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1 overflow-auto pt-[5rem] pl-4 bg-primary/5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
