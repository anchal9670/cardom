import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VariantNew from "./VariantNew";
import { MdDelete, MdEditSquare } from "react-icons/md";
import VariantUpdate from "./VariantUpdate";
import VariantDeleteModel from "./VariantDeleteModel";
import { getBrand } from "../../../store/cars/brandSlice";
import { deleteVariant, getVariant } from "../../../store/cars/variantSlice";

const CarVariant = () => {
  const dispatch = useDispatch();

  const brand = useSelector((state) => state.cars.brand.brand);
  const variant = useSelector((state) => state.cars.variant.variant);

  const [isVariantEditFrom, setIsVariantEditFrom] = useState(false);
  const [isVariantNewModelOpen, setIsVariantNewModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [filters, setFilters] = useState({
    fuelType: '',
    brand: '',
    model: '',
  });


  useEffect(() => {
    dispatch(getBrand());
    dispatch(getVariant("", "", ""));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBrand) {
      const b = brand.find((b) => b._id === selectedBrand);
      setModels(b ? b.models : []);
      setFuelType([]);
      setFilters((prevState) => ({
        ...prevState,
        model: "", 
        fuelType: "", 
      }));
    }
  }, [selectedBrand, brand]);

  useEffect(() => {
    if (selectedModel && models.length > 0) {
      const model = models.find((m) => m._id === selectedModel);
      setFuelType(model ? model.fuelType : []);
      setFilters((prevState) => ({
        ...prevState,
        fuelType: "", 
      }));
    }
  }, [selectedModel, models]);


  const handleDeleteFunc = () => {
    dispatch(deleteVariant(deleteData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { fuelType, brand, model } = filters;
    dispatch(getVariant(brand, model, fuelType));
  }, [filters, dispatch]);

  return (
    <>
      {isVariantNewModelOpen && (
        <VariantNew
          isVariantNewModelOpen={isVariantNewModelOpen}
          setIsVariantNewModelOpen={setIsVariantNewModelOpen}
        />
      )}

      {isVariantEditFrom && (
        <VariantUpdate
          isVariantEditFrom={isVariantEditFrom}
          setIsVariantEditFrom={setIsVariantEditFrom}
          editData={editData}
        />
      )}

      {!isVariantEditFrom && !isVariantNewModelOpen && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Variant
            </h4>
            <div>
              <button
                className="tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500 uppercase"
                onClick={() => setIsVariantNewModelOpen(!isVariantNewModelOpen)} // Pass a unique identifier like -1 for add modal
              >
                Add New Variant
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex mb-2">
              <p className="  text-2xl">Filters:</p>
              <div className="ml-1">
                <select
                  id="default"
                  name="brand"
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    handleChange(e);
                  }}
                  value={filters.brand}
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
              <div className="ml-1">
                <select
                  id="default"
                  name="model"
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    handleChange(e);
                  }}
                  value={filters.model}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""}>Choose a Models</option>
                  {models?.map((m) => {
                    return (
                      <option key={m._id} value={m._id}>
                        {m.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="ml-1">
                <select
                  id="default"
                  name="fuelType"
                  onChange={handleChange}
                  value={filters.fuelType}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""}>Choose a fuelType</option>
                  {fuelType.map((f) => {
                    return (
                      <option key={f} value={f}>
                        {f}
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
                  model
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

            {variant?.map((v, index) => (
              <div
                className={`grid grid-cols-2 shadow sm:grid-cols-6`}
                key={index}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0"></div>
                  <p className="hidden text-black sm:block">{index + 1}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{v.name ?? ""}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{v.carModel?.name ?? ""}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{v.fuelType ?? ""}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{v.transmission ?? ""}</p>
                </div>

                <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                  <MdEditSquare
                    className="text-xl cursor-pointer "
                    onClick={() => {
                      setEditData(v);
                      setIsVariantEditFrom(!isVariantEditFrom);
                    }}
                  />
                  <MdDelete
                    className="text-xl cursor-pointer "
                    onClick={() => {
                      setDeleteData(v);
                      setModelOpen(!modelOpen);
                    }}
                  />
                  <VariantDeleteModel
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

export default CarVariant;
