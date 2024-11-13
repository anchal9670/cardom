import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRtoData, getState, deleteRTO } from "../../../store/stateSlice";
import RtoModel from "./RtoModel";
import { MdDelete, MdEditSquare } from "react-icons/md";
import RtoUpdateModel from "./RtoUpdateModel";
import DeleteModel from "./DeleteModel";

const Rto = () => {
  const dispatch = useDispatch();
  const rtoCodes = useSelector((state) => state.state.rto);
  const [editModalOpen, setEditModalOpen] = useState({});
  const [isRtoModelOpen, setIsRtoModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [deleteData,setDeleteData] = useState({})
  const state = useSelector((state) => state.state.states);

  useEffect(() => {
    dispatch(getState());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    dispatch(getRtoData(selectedValue));
  };

  const openEditModal = (index) => {
    setEditModalOpen((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const closeEditModal = (index) => {
    setEditModalOpen((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleDeleteFunc = () => {
    dispatch(deleteRTO(deleteData))
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          RtoCodes
        </h4>
        <div>
          <button
            className="tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500 uppercase"
            onClick={() => setIsRtoModelOpen(!isRtoModelOpen)} // Pass a unique identifier like -1 for add modal
          >
            Add New Rto
          </button>
          <RtoModel
            isRtoModelOpen={isRtoModelOpen}
            setIsRtoModelOpen={setIsRtoModelOpen}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex mb-2">
          <p className="  text-2xl">Filters:</p>
          <div className="ml-1">
            <select
              id="default"
              onChange={handleChange}
              defaultValue={""}
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>Choose a state</option>
              {state.map((s) => {
                return (
                  <option key={s._id} value={s._id}>
                    {s.state}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 rounded-sm bg-gray-200 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No.</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              RtoCodes
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              City
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {rtoCodes?.map((s, index) => (
          <div className={`grid grid-cols-2 shadow sm:grid-cols-4`} key={index}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0"></div>
              <p className="hidden text-black dark:text-white sm:block">
                {index + 1}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{s.code}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{s.city}</p>
            </div>
            <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
              <MdEditSquare
                className="text-xl cursor-pointer "
                onClick={() => openEditModal(index)}
              />
              <RtoUpdateModel
                isRtoModelOpen={editModalOpen[index]}
                setIsRtoModelOpen={(isOpen) => {
                  if (isOpen) openEditModal(index);
                  else closeEditModal(index);
                }}
                editData={s}
              />
              <MdDelete
                className="text-xl cursor-pointer "
                onClick={() => {
                  setDeleteData(s);
                  setModelOpen(!modelOpen);
                }}
              />
              <DeleteModel
                modelOpen={modelOpen}
                setModelOpen={setModelOpen}
                handleDeleteFunc={handleDeleteFunc}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rto;
