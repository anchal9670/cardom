import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModel } from "../../../store/cars/modelSlice";

const CarInfoModel = ({
  setVisited,
  setActiveComponent,
  carFormData,
  handleCarChange,
}) => {
  const dispatch = useDispatch();
  const models = useSelector((state) => state.cars.model.model);
  useEffect(() => {
    const { brand, manufacturerYear } = carFormData;
    dispatch(getModel(brand, manufacturerYear));
  }, [dispatch,carFormData]);

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Model");
  };

  const handleModelSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.value;
    const { brand, manufacturerYear } = carFormData;
    dispatch(getModel(brand, manufacturerYear,keyword));
  };

  return (
    <div>
      <div className="flex justify-center m-auto w-80  mb-3 text-center">
        <div className="">
          <input
            type="text"
            placeholder="Search here...."
            className="border px-2 py-1 m-2 w-full sm:m-0 border-gray-500"
            onChange={handleModelSearch}
          />
        </div>
        <button
          className="bg-primary-500 px-2 py-1 text-white font-medium m-2 sm:m-0"
          onClick={handleModelSearch}
        >
          SEARCH
        </button>
      </div>
      <div className="m-auto w-80 flex justify-center h-56">
        <div className="overflow-y-auto w-full flex flex-col">
          {models.map((model, index) => (
            <div
              key={index}
              className="w-full text-center shadow py-2 font-medium hover:cursor-pointer"
              onClick={() => {
                handleCarChange({
                  target: {
                    name: "model",
                    value: model._id,
                  },
                });
                toggleComponent("Variant");
              }}
            >
              {model.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarInfoModel;
