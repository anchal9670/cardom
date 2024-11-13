import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createModel } from "../../../store/cars/modelSlice";

const ModelNew = ({ isModelNewModelOpen, setIsModelNewModelOpen }) => {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.cars.brand.brand);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    fuelType: new Set(),
    transmission: new Set(),
    carBrand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevState) => {
      const selectedOptions = new Set(prevState[name]);
      if (checked) {
        selectedOptions.add(value);
      } else {
        selectedOptions.delete(value);
      }
      return { ...prevState, [name]: selectedOptions };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      fuelType: Array.from(formData.fuelType),
      transmission: Array.from(formData.transmission),
    };
    dispatch(createModel(formattedData, setIsModelNewModelOpen));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-6">
        <div className="text-xl font-bold uppercase">Add New Model</div>
        <IoIosCloseCircleOutline
          className="text-2xl cursor-pointer"
          onClick={() => setIsModelNewModelOpen(!isModelNewModelOpen)}
        />
      </div>

      <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="carBrand"
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Choose a brand</option>
            {brand?.map((b) => {
              return (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium px-4 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Model Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="year"
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
            required
          />
          <label
            htmlFor="year"
            className="peer-focus:font-medium absolute px-4 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Year
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Fuel Type
            </label>
            {["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "Other"].map(
              (fuel) => (
                <label key={fuel} className="inline-flex items-center px-4 cursor-pointer">
                  <input
                    type="checkbox"
                    name="fuelType"
                    value={fuel}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  {fuel}
                </label>
              )
            )}
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-2">Transmission</label>
            {["Manual", "Automatic"].map((transmission) => (
              <label
                key={transmission}
                className="inline-flex items-center px-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="transmission"
                  value={transmission}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {transmission}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ModelNew;
