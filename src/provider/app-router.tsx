import { AppRoutes } from "@/lib/routes";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

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
import { logger } from "@/lib/logger";

export function AppRouteProvider() {
  const router = createBrowserRouter([
    {
      path: AppRoutes.root,
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      loader: async () => {
        try {
          const token = await isAuthenticated();
          logger("TOKEN", "", token);

          if (Boolean(token)) {
            return redirect(AppRoutes.app);
          }

          return null;
        } catch (error) {
          throw new Response("Error", { status: 500 });
        }
      },
      children: [
        {
          index: true,
          element: <SignIn />,
        },
      ],
    },
    {
      path: AppRoutes.app,
      element: <ProtectedLayout />,
      errorElement: <ErrorPage />,
      loader: async () => {
        const token = await isAuthenticated();
        if (!Boolean(token)) {
          return redirect(AppRoutes.root);
        }
        return token;
      },
      children: [
        {
          index: true,
          path: AppRoutes.profile,
          element: <MyProfile />,
        },
        {
          path: AppRoutes.files,
          element: <>FIles</>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
