import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandNew from "./BrandNew";
import { MdDelete, MdEditSquare } from "react-icons/md";
import BrandUpdate from "./BrandUpdate";
import BrandDeleteModel from "./BrandDeleteModel";
import { deleteBrand, getBrand } from "../../../store/cars/brandSlice";

const Brand = () => {
  const dispatch = useDispatch();
  const [isBrandEditFrom, setIsBrandEditFrom] = useState(false);
  const [isBrandNewModelOpen, setIsBrandNewModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  const brand = useSelector((state) => state.cars.brand.brand);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleDeleteFunc = () => {
    dispatch(deleteBrand(deleteData));
  };

  return (
    <>
      {isBrandNewModelOpen && (
        <BrandNew
          isBrandNewModelOpen={isBrandNewModelOpen}
          setIsBrandNewModelOpen={setIsBrandNewModelOpen}
        />
      )}

      {isBrandEditFrom && (
        <BrandUpdate
          isBrandEditFrom={isBrandEditFrom}
          setIsBrandEditFrom={setIsBrandEditFrom}
          editData={editData}
        />
      )}

      {!isBrandEditFrom && !isBrandNewModelOpen && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Brand
            </h4>
            <div>
              <button
                className="tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500 uppercase"
                onClick={() => setIsBrandNewModelOpen(!isBrandNewModelOpen)} // Pass a unique identifier like -1 for add modal
              >
                Add New Brand
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex mb-2">
            </div>
            <div className="grid grid-cols-2 rounded-sm bg-gray-200 sm:grid-cols-6">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  No.
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  logo
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  founded
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  country
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            </div>

            {brand &&
              brand?.map((b, index) => (
                <div
                  className={`grid grid-cols-2 shadow sm:grid-cols-6`}
                  key={index}
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <div className="flex-shrink-0"></div>
                    <p className="hidden text-black dark:text-white sm:block">
                      {index + 1}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <img src={b?.logo?.url ?? ""} alt="" className="w-12 h-12" />
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black">{b.name}</p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black">{b.founded}</p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black">{b.country}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                    <MdEditSquare
                      className="text-xl cursor-pointer "
                      onClick={() => {
                        setEditData(b);
                        setIsBrandEditFrom(!isBrandEditFrom);
                      }}
                    />
                    <MdDelete
                      className="text-xl cursor-pointer "
                      onClick={() => {
                        setDeleteData(b);
                        setModelOpen(!modelOpen);
                      }}
                    />
                    <BrandDeleteModel
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

export default Brand;
