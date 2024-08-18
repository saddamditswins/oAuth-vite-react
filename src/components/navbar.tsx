type NavbarProps = {};

export function Navbar(props: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white px-8 py-4 shadow">
      <div className="flex items-center justify-between ">
        <div className={"text-3xl"}>
          OAuth <span className="text-blue-600">App</span>
        </div>

        <div className="flex gap-8">
          <div className="flex justify-center gap-4">
            <div className="text-base border rounded-full h-10 w-10 flex justify-center items-center bg-blue-500/5">J</div>
            <div className="flex flex-col items-start mt-1">
              <p className="text-base font-semibold leading-tight">John Doe</p>
              <p className="text-muted-foreground text-xs">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
