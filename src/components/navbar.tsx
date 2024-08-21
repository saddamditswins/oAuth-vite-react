import { useAppSidebar } from "@/hooks/use-app-sidebar";
import { AppRoutes } from "@/lib/routes";
import { IUser } from "@/types/user";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Navbar({ user }: { user: IUser }) {
  const { isOpen, toggle } = useAppSidebar();
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white px-8 py-4 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to={AppRoutes.app}
            className={"text-blue-600 text-xl font-bold font-serif cursor-pointer self-stretch w-48"}
          >
           My App Logo
          </Link>
          <button
            className="p-2 rounded-sm bg-blue-100 text-blue-700"
            onClick={() => toggle(!isOpen)}
          >
            <FaBarsStaggered />
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex justify-center gap-4">
            <div className="text-base border rounded-full h-10 w-10 flex justify-center items-center bg-blue-500/5">
              {user.firstname[0]}
            </div>
            <div className="flex flex-col items-start mt-1">
              <p className="text-base font-semibold leading-tight">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
