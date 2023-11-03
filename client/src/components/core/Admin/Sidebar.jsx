import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io"; // Import the IoIosHome icon
import Logo from "../../../images/logo/logo.svg";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
         <h1 className="text-2xl font-bold text-white">Admin</h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <IoIosHome size={20} /> {/* Use the IoIosHome icon */}
        </button>
      </div>

      <SidebarLinkGroup
        activeCondition={pathname === "/" || pathname.includes("dashboard")}
      >
        {(handleClick, open) => {
          return (
            <>
               <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover-bg-meta-4 ${
                  (pathname === "/" || pathname.includes("dashboard")) &&
                  "bg-graydark dark:bg-meta-4"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                }}
              >
                <IoIosHome size={18} /> {/* Use the IoIosHome icon */}
                Dashboard
                <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                    open && "rotate-180"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
              </NavLink>
            </>
          );
        }}
      </SidebarLinkGroup>
    </aside>
  );
}

export default Sidebar;
