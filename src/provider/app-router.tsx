import { AppRoutes } from "@/lib/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layouts
import ProtectedLayout from "@/layout/protected-layout";
import AuthLayout from "@/layout/auth-layout";

// Modules
import { SignIn } from "@/modules/auth";
import { MyProfile } from "@/modules/profile";

// Services
import { isAuthenticated } from "@/repo/auth";

// UI
import ErrorPage from "@/components/error-ui";

export function AppRouteProvider() {
  const router = createBrowserRouter([
    {
      path: AppRoutes.root,
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      loader: isAuthenticated,
      children: [
        {
          index: true,
          element: <SignIn />,
        },
      ],
    },
    {
      path: AppRoutes.profile,
      element: <ProtectedLayout />,
      errorElement: <ErrorPage />,
      loader: isAuthenticated,
      children: [
        {
          index: true,
          element: <MyProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
