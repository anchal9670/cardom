import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import AddNewUser from "./AddNewUser";
import DeleteUser from "./DeleteUser";
import { deleteUserByAdmin, getAllUserByAdmin } from "../../../store/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.allUsers);

  const [isAddNewUserFormOpen, setIsAddNewUserFormOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  useEffect(() => {
    dispatch(getAllUserByAdmin());
  }, [dispatch]);



  const handleDeleteFunc = () => {
    dispatch(deleteUserByAdmin(deleteData));
  };

  const handleChange = (e) => {
    const userType = e.target.value;
    dispatch(getAllUserByAdmin(userType));
  };


  return (
    <>
      {isAddNewUserFormOpen && (
        <AddNewUser
          isAddNewUserFormOpen={isAddNewUserFormOpen}
          setIsAddNewUserFormOpen={setIsAddNewUserFormOpen}
        />
      )}


      {!isAddNewUserFormOpen && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Users
            </h4>
            <div>
              <button
                className="tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500 uppercase"
                onClick={() => setIsAddNewUserFormOpen(!isAddNewUserFormOpen)} // Pass a unique identifier like -1 for add modal
              >
                Add New User
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex mb-2">
              <p className="  text-2xl">Filters:</p>
              <div className="ml-1">
                <select
                  id="default"
                  name="user"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""}>Choose a User</option>
                  {["Admin", "User"].map((u) => {
                    return (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 rounded-sm bg-gray-200 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  No.
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  email
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Mobile No.
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            </div>

            {users?.map((user, index) => (
              <div
                className={`grid grid-cols-2 shadow sm:grid-cols-5`}
                key={index}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0"></div>
                  <p className="hidden text-black sm:block">{index + 1}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{user.name ?? ""}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{user.email ?? ""}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{user.phone_number ?? ""}</p>
                </div>

                <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                  <MdDelete
                    className="text-xl cursor-pointer "
                    onClick={() => {
                      setDeleteData(user);
                      setModelOpen(!modelOpen);
                    }}
                  />
                  <DeleteUser
                    modelOpen={modelOpen}
                    setModelOpen={setModelOpen}
                    handleDeleteFunc={handleDeleteFunc}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
