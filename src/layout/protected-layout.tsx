import LoadingPage from "@/components/loading";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { AppRoutes } from "@/lib/routes";
import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export default function ProtectedLayout() {
  const token = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    !token && navigate(AppRoutes.root);
  }, [token]);

  if (navigation.state === "loading") {
    return <LoadingPage />;
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
