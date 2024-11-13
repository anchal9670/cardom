import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../../assets/logo/logo_white.png";
import { RxDashboard } from "react-icons/rx";
import { ImStatsBars } from "react-icons/im";
import { IoCarSport } from "react-icons/io5";
import { PiUsersThreeDuotone } from "react-icons/pi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Local state for storing sidebar expansion
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Event listener to close sidebar when clicking outside
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
  }, [sidebarOpen, setSidebarOpen, trigger]);

  // Event listener to close sidebar when pressing escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Effect to update localStorage and apply CSS class when sidebar expansion changes
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
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden shadow-lg bg-primary-500 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 pt-5 lg:pt-6 text-white">
        <NavLink
          to="/dashboard"
          className="items-center justify-center hidden lg:flex"
        >
          <img src={Logo} alt="Logo" className="w-16 h-16" />
          <div className="text-2xl">CARDOM</div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="items-center justify-center flex lg:hidden"
        >
          <img src={Logo} alt="Logo" className="w-16 h-16" />
          <div className="text-2xl">CARDOM</div>
        </button>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Dashboard */}

              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-green-700 ${
                    (pathname === "/dashboard" || pathname === "/dashboard/") &&
                    "bg-green-700"
                  }`}
                >
                  <RxDashboard />
                  Dashboard
                </NavLink>
              </li>

              {/* State Menu */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/state" ||
                  pathname.includes("dashboard/state")
                }
              >
                {(handleClick, open) => (
                  <React.Fragment>
                    <NavLink
                      to="/dashboard/state"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-green-700 ${
                        (pathname === "/dashboard/state" ||
                          pathname.includes("dashboard/state")) &&
                        "bg-green-700"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <ImStatsBars />
                      State
                      <svg
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && "rotate-180"
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                          fill=""
                        />
                      </svg>
                    </NavLink>
                    {/* Dropdown Menu */}
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <li>
                          <NavLink
                            to="/dashboard/state/state"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-medium  duration-300 ease-in-out " +
                              (isActive && "!text-white")
                            }
                          >
                            States
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dashboard/state/rto"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-medium  duration-300 ease-in-out " +
                              (isActive && "!text-white")
                            }
                          >
                            Rtos
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    {/* Dropdown Menu End */}
                  </React.Fragment>
                )}
              </SidebarLinkGroup>
              {/* State Menu End */}

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/cars" ||
                  pathname.includes("dashboard/cars")
                }
              >
                {(handleClick, open) => (
                  <React.Fragment>
                    <NavLink
                      to="/dashboard/cars"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-green-700 ${
                        (pathname === "/dashboard/ram" ||
                          pathname.includes("dashboard/cars")) &&
                        "bg-green-700"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <IoCarSport />
                      Cars
                      <svg
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && "rotate-180"
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                          fill=""
                        />
                      </svg>
                    </NavLink>
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <li>
                          <NavLink
                            to="/dashboard/cars/brand"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-medium  duration-300 ease-in-out " +
                              (isActive && "!text-white")
                            }
                          >
                            Brand
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dashboard/cars/model"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-medium  duration-300 ease-in-out " +
                              (isActive && "!text-white")
                            }
                          >
                            Model
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dashboard/cars/variant"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-medium  duration-300 ease-in-out " +
                              (isActive && "!text-white")
                            }
                          >
                            Variant
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/dashboard/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-green-700 ${
                    (pathname === "/dashboard/users" ||
                      pathname.includes("dashboard/users")) &&
                    "bg-green-700"
                  }`}
                >
                  <PiUsersThreeDuotone />
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu End */}
      </div>
    </aside>
  );
};

export default Sidebar;
