import { Link } from "react-router-dom";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import LogoIcon from "../../../assets/logo/logo.png";
import { CiSearch } from "react-icons/ci";
import { IoReorderThreeSharp } from "react-icons/io5";
import { getUser } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector((state) => state.auth.users);
  const isLoading = useSelector((state) => state.loading.isLoading);
 
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "Admin")) {
      navigate("/");
    }
  }, [user, navigate,isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <header className="sticky top-0 z-999 flex w-full bg-white shadow-lg">
          <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              {/* <!-- Hamburger Toggle BTN --> */}
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <IoReorderThreeSharp className="w-12 h-12" />
              </button>
              {/* <!-- Hamburger Toggle BTN --> */}

              <Link className="block flex-shrink-0 lg:hidden" to="/dashboard">
                <img src={LogoIcon} alt="Logo" className="w-12 h-12" />
              </Link>
            </div>

            <div className="hidden sm:block">
              <form action="#" method="POST">
                <div className="relative">
                  <button className="absolute left-0 top-1/2 -translate-y-1/2">
                    <CiSearch />
                  </button>

                  <input
                    type="text"
                    placeholder="Type to search..."
                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center gap-3 2xsm:gap-7">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                {/* <!-- Notification Menu Area --> */}
                <DropdownNotification />
                {/* <!-- Notification Menu Area --> */}

                {/* <!-- Chat Notification Area --> */}
                <DropdownMessage />
                {/* <!-- Chat Notification Area --> */}
              </ul>

              {/* <!-- User Area --> */}
              <DropdownUser user={user} />
              {/* <!-- User Area --> */}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
