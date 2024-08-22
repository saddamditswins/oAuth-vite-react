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
import ErrorPage, { NotFound } from "@/components/error-ui";
import { DocsList } from "@/modules/files";
import { getAllFiles } from "@/repo/doc";
import { AppConstants, extractQueryParams, removeFromLS } from "@/lib/utils";

async function protectRoute(cb: Function) {
  try {
    const token = await isAuthenticated();
    logger("TOKEN from protected loader", "", token);

    if (!Boolean(token)) {
      return redirect(AppRoutes.root);
    }

    return await cb();
  } catch (error) {
    throw new Response("Error", { status: 500 });
  }
}

async function publicRoute() {
  try {
    const token = await isAuthenticated();
    logger("TOKEN from public loader", "", token);

    if (Boolean(token)) {
      return redirect(AppRoutes.files);
    }

    return null;
  } catch (error) {
    throw new Response("Error", { status: 500 });
  }
}
export function AppRouteProvider() {
  const router = createBrowserRouter([
    {
      path: AppRoutes.root,
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      loader: publicRoute,
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
      loader: async () =>
        await protectRoute(async () => {
          const user = await getUser();

          if (!user) {
            removeFromLS(AppConstants.auth_token);
            return redirect(AppRoutes.root);
          }
          return user;
        }),
      children: [
        {
          path: AppRoutes.profile,
          errorElement: <ErrorPage />,
          loader: async () => await protectRoute(() => null),
          element: <MyProfile />,
        },
        {
          path: AppRoutes.files,
          errorElement: <ErrorPage />,
          loader: async ({ request }) =>
            await protectRoute(async () => {
              const queryParams = extractQueryParams(request.url);
              const pageNum = +queryParams["page"] || 1;
              const limit = +queryParams["limit"] || 10;

              const files = await getAllFiles(pageNum, limit);
              return files.data;
            }),
          element: <DocsList />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
