import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelNew from "./ModelNew";
import { MdDelete, MdEditSquare } from "react-icons/md";
import ModelUpdate from "./ModelUpdate";
import ModelDeleteModel from "./ModelDeleteModel";
import { getBrand } from "../../../store/cars/brandSlice";
import { getModel, deleteModel } from "../../../store/cars/modelSlice";

const CarModel = () => {
  const dispatch = useDispatch();
  const [isModelEditFrom, setIsModelEditFrom] = useState(false);
  const [isModelNewModelOpen, setIsModelNewModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  const brand = useSelector((state) => state.cars.brand.brand);
  const model = useSelector((state) => state.cars.model.model);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getModel("", "", ""));
  }, [dispatch]);

  const handleDeleteFunc = () => {
    dispatch(deleteModel(deleteData));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const brand = e.target.value;
    setSelectedBrand(brand);
    dispatch(getModel(brand, "", ""));
  };

  return (
    <>
      {isModelNewModelOpen && (
        <ModelNew
          isModelNewModelOpen={isModelNewModelOpen}
          setIsModelNewModelOpen={setIsModelNewModelOpen}
        />
      )}

      {isModelEditFrom && (
        <ModelUpdate
          isModelEditFrom={isModelEditFrom}
          setIsModelEditFrom={setIsModelEditFrom}
          editData={editData}
        />
      )}

      {!isModelEditFrom && !isModelNewModelOpen && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Model
            </h4>
            <div>
              <button
                className="tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500 uppercase"
                onClick={() => setIsModelNewModelOpen(!isModelNewModelOpen)} // Pass a unique identifier like -1 for add modal
              >
                Add New Model
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex mb-2">
              <p className="  text-2xl">Filters:</p>
              <div className="ml-1">
                <select
                  id="default"
                  onChange={handleChange}
                  defaultValue={selectedBrand}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""}>Choose a Brand</option>
                  {brand.map((b) => {
                    return (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 rounded-sm bg-gray-200 sm:grid-cols-6">
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
                  year
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  fuelType
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  transmission
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            </div>

            {model?.map((m, index) => (
              <div
                className={`grid grid-cols-2 shadow sm:grid-cols-6`}
                key={index}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0"></div>
                  <p className="hidden text-black sm:block">{index + 1}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{m.name}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{m.year}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <div className="text-center">
                    <div className="flex flex-wrap justify-center">
                      {m.fuelType.map((f) => (
                        <div
                          key={f}
                          className="px-3 py-1 bg-blue-500 text-white rounded-full m-1"
                        >
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <div className="text-center">
                    <div className="flex flex-wrap justify-center">
                      {m.transmission.map((t) => (
                        <div
                          key={t}
                          className="px-3 py-1 bg-blue-500 text-white rounded-full m-1"
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                  <MdEditSquare
                    className="text-xl cursor-pointer "
                    onClick={() => {
                      setEditData(m);
                      setIsModelEditFrom(!isModelEditFrom);
                    }}
                  />
                  <MdDelete
                    className="text-xl cursor-pointer "
                    onClick={() => {
                      setDeleteData(m);
                      setModelOpen(!modelOpen);
                    }}
                  />
                  <ModelDeleteModel
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

export default CarModel;
