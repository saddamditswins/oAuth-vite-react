import { useAppSidebar } from "@/hooks/use-app-sidebar";
import { logger } from "@/lib/logger";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, removeFromLS } from "@/lib/utils";
import { deleteUser } from "@/repo/user";
import { IUser } from "@/types/user";
import { BiTrashAlt } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate()
  const user = useLoaderData() as IUser;
  const { isOpen } = useAppSidebar();

  const navLinks = [
    {
      name: "Profile",
      Icon: ImProfile,
      path: AppRoutes.profile,
    },
  ];

  const onDeleteAccount = async () => {
    try {
      const res = await deleteUser(user._id);
      logger("Response on Delete", "",res)
      if (res.status) {
        removeFromLS(AppConstants.auth_token);
        navigate(AppRoutes.root);
      }
    } catch (error) {}
  };
  return (
    <div
      className={`relative pt-16 flex flex-col shadow-xl transition-all ${
        isOpen ? "w-60" : "w-12"
      }`}
    >
      <div className="flex-1 flex flex-col py-4">
        {navLinks.map(({ Icon, name, path }) => (
          <NavLink
            key={path}
            className={(isActive) =>
              `text-sm flex items-center gap-3 hover:bg-blue-500/5 p-4 border-r-2 border-r-transparent ${
                isActive.isActive
                  ? "text-blue-500 font-medium bg-blue-500/5 border-r-blue-500"
                  : ""
              }`
            }
            to={path}
          >
            <Icon className="h-4 w-4" />
            {isOpen && <span>{name}</span>}
          </NavLink>
        ))}
      </div>

      <div className="pt-10">
        <button
          onClick={onDeleteAccount}
          className={`w-full text-sm flex items-center gap-3 bg-red-500/10 text-red-500 hover:bg-red-500/15 p-4 border-r-2 border-r-transparent overflow-x-hidden`}
        >
          <BiTrashAlt />
          {isOpen && <span>Delete My Account</span>}
        </button>
      </div>
    </div>
  );
}
