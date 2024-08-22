import { AppRoutes } from "@/lib/routes";
import { logger } from "@/lib/logger";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

// Layouts
import AuthLayout from "@/layout/auth-layout";
import ProtectedLayout, { getUser } from "@/layout/protected-layout";

// Modules
import { SignIn, SignUp } from "@/modules/auth";
import { MyProfile } from "@/modules/profile";

// Services
import { isAuthenticated } from "@/repo/auth";

// UI
import ErrorPage from "@/components/error-ui";
import { DocsList } from "@/modules/files";
import { getAllFiles } from "@/repo/doc";
import { extractQueryParams } from "@/lib/utils";

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
        {
          path: AppRoutes.signUp,
          element: <SignUp />,
        },
      ],
    },
    {
      path: AppRoutes.app,
      element: <ProtectedLayout />,
      errorElement: <ErrorPage />,
      id: AppRoutes.app,
      loader: async () => {
        const token = await isAuthenticated();
        if (!token) {
          return redirect(AppRoutes.root);
        }
        const user = await getUser(token.user._id);
        return user;
      },
      children: [
        {
          path: AppRoutes.profile,
          element: <MyProfile />
        },
        {
          path: AppRoutes.files,
          errorElement: <ErrorPage />,
          loader: async ({request}) => {
            const queryParams = extractQueryParams(request.url);
            const pageNum = +queryParams["page"] || 1;
            const limit = +queryParams["limit"] || 10;
            
            const files = await getAllFiles(pageNum, limit);
            return files.data;
          },
          element: <DocsList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
