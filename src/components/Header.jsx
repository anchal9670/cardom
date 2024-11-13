import React, { useState, useEffect } from "react";
import SignIn from "../modals/SignIn";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { useSelector } from "react-redux";
import DropdownUser from "../components/DropdownUser";

const Header = () => {
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);
  let user = useSelector((state) => state.auth.users);
  const toggleMenu = () => {
    const menu = document.querySelector('[data-name="nav-menu"]');
    const isHidden = menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    menu.classList.toggle("bg-gray-900");
    // menu.classList.add("slide-up");
    if (isHidden) {
      menu.classList.remove("slide-up");
      menu.classList.add("slide-down");
    } else {
      menu.classList.remove("slide-down");
      menu.classList.add("slide-up");
    }
  };

  const closeMenuOnClick = () => {
    const menu = document.querySelector('[data-name="nav-menu"]');
    if (menu.classList.contains("hidden")) return;
    toggleMenu();
  };

  useEffect(() => {
    const links = document.querySelectorAll('[data-name="nav-menu"] a');
    links.forEach((link) => {
      link.addEventListener("click", closeMenuOnClick);
    });
    const button = document.querySelector('[data-name="nav-menu"] button');
    button.addEventListener("click", closeMenuOnClick);
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", closeMenuOnClick);
      });
      button.removeEventListener("click", closeMenuOnClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <header className="bg-gray-900 bg-opacity-95 py-2">
      <div className="container mx-auto relative">
        <nav className="flex flex-wrap lg:flex-row flex-col items-center px-4 max-h-full uppercase">
          <div className="flex justify-between w-full lg:w-auto">
            <Link
              to="/"
              className="font-bold font-sans hover:text-opacity-75 inline-flex items-center justify-center leading-none mr-4 space-x-1 text-primary-500 text-xl uppercase"
            >
              <img src={logo} alt="Cardom Logo" className="w-10 h-10" />
              <span>Cardom</span>
            </Link>

            <button
              className="hover:bg-primary-500 hover:text-white ml-auto px-3 py-2 rounded text-white lg:hidden"
              data-name="nav-toggler"
              onClick={toggleMenu}
            >
              <span className="block border-b-2 border-current my-1 w-6" />
              <span className="block border-b-2 border-current my-1 w-6" />
              <span className="block border-b-2 border-current my-1 w-6" />
            </button>
          </div>
          <div
            className="flex-1 hidden absolute z-10 text-center w-screen lg:sticky space-y-2 top-11  lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto uppercase transition-all duration-500"
            data-name="nav-menu"
          >
            <div className="flex flex-col mr-auto lg:flex-row">
              <Link
                to="/"
                className="hover:text-gray-400 lg:p-4 py-2 text-white"
              >
                Home
              </Link>
              <Link
                to="/buy-a-car"
                className="hover:text-gray-400 lg:p-4 py-2 text-white"
              >
                Buy a Car
              </Link>
              <Link
                to="/sell-a-car"
                className="hover:text-gray-400 lg:p-4 py-2 text-white"
              >
                SELL A CAR
              </Link>
              {user.role === "Admin" && (
                <Link
                  to="/dashboard"
                  className="hover:text-gray-400 lg:p-4 py-2 text-white"
                >
                  dashboard
                </Link>
              )}
            </div>
            <div className="flex-wrap inline-flex items-center py-1 space-x-2 uppercase">
              {Object.keys(user).length <= 0 ? (
                <button
                  className="border border-primary-500 hover:bg-primary-500 hover:text-white inline-block px-6 py-2 text-primary-500 uppercase"
                  onClick={() => setIsLoginModelOpen(true)}
                >
                  Log In
                </button>
              ) : (
                <DropdownUser user={user} />
              )}
              <SignIn
                isLoginModelOpen={isLoginModelOpen}
                setIsLoginModelOpen={setIsLoginModelOpen}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
