import LoadingPage from "@/components/loading";
import { AppRoutes } from "@/lib/routes";
import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate, useNavigation } from "react-router-dom";

export default function AuthLayout() {
  const token = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    token && navigate(AppRoutes.profile);
  }, [token]);

  if (navigation.state === "loading") {
    return <LoadingPage />
  }

  return (
    <div className="h-full flex justify-center items-center">
      <Outlet />
    </div>
  );
}
