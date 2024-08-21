import { AppRoutes } from "@/lib/routes";
import { IUser } from "@/types/user";
import { Link } from "react-router-dom";

export function Navbar({user}: {user: IUser}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white px-8 py-4 shadow">
      <div className="flex items-center justify-between ">
        <Link to={AppRoutes.app} className={"text-3xl cursor-pointer"}>
          OAuth <span className="text-blue-600">App</span>
        </Link>

        <div className="flex gap-8">
          <div className="flex justify-center gap-4">
            <div className="text-base border rounded-full h-10 w-10 flex justify-center items-center bg-blue-500/5">
              {user.firstname[0]}
            </div>
            <div className="flex flex-col items-start mt-1">
              <p className="text-base font-semibold leading-tight">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-muted-foreground text-xs">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
