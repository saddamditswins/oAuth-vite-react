import { useAppSidebar } from "@/hooks/use-app-sidebar";
import { AppRoutes } from "@/lib/routes";
import { AppConstants, removeFromLS } from "@/lib/utils";
import { BiChevronLeft, BiChevronRight, BiLogOut } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const { isOpen, toggle } = useAppSidebar();

  const navLinks = [
    {
      name: "Profile",
      Icon: ImProfile,
      path: AppRoutes.profile,
    },
    {
      name: "Logout",
      Icon: BiLogOut,
      clickEvent: () => {
        removeFromLS(AppConstants.auth_token);
        navigate(AppRoutes.root);
      },
    },
  ];
  return (
    <div
      className={`relative pt-16 flex flex-col shadow-xl transition-all ${
        isOpen ? "w-60" : "w-12"
      }`}
    >
      <div className="flex flex-col py-4">
        {navLinks.map(({ Icon, name, path, clickEvent }) =>
          path ? (
            <NavLink
              key={path}
              className={(isActive) =>
                `text-sm flex items-center gap-3 hover:bg-blue-500/5 p-4 border-r-2 border-r-transparent overflow-x-hidden ${
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
          ) : (
            <button
              onClick={clickEvent}
              className={`text-sm flex items-center gap-3 hover:bg-blue-500/5 p-4 border-r-2 border-r-transparent overflow-x-hidden`}
            >
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </button>
          )
        )}
      </div>

      <button
        className="absolute bottom-4 -right-4 z-40 px-2 h-8 rounded-full bg-blue-600 text-white"
        onClick={() => toggle(!isOpen)}
      >
        {isOpen ? <BiChevronLeft /> : <BiChevronRight />}
      </button>
    </div>
  );
}
