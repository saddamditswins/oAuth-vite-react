import LoadingPage from "@/components/loading";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, getLS } from "@/lib/utils";
import { IAuthToken } from "@/types/auth";
import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const token = getLS<IAuthToken>(AppConstants.auth_token)?.token;

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
