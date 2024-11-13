import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVariant } from "../../../store/cars/variantSlice";

const CarVariant = ({
  setVisited,
  setActiveComponent,
  carFormData,
  handleCarChange,
}) => {
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [selectedTransType, setSelectedTransType] = useState(null);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [transOptions, setTransOptions] = useState([]);

  const dispatch = useDispatch();

  const models = useSelector((state) => state.cars.model.model);
  const variants = useSelector((state) => state.cars.variant.variant);

  useEffect(() => {
    const selectedModel = models.find((m) => m._id === carFormData.model);
    if (selectedModel) {
      setFuelOptions(selectedModel.fuelType ?? []);
      setTransOptions(selectedModel.transmission ?? []);
    } else {
      setFuelOptions([]);
      setTransOptions([]);
    }
    // eslint-disable-next-line
  }, [models, carFormData.model]);

  useEffect(() => {
    if (selectedFuelType && selectedTransType) {
      dispatch(
        getVariant(
          carFormData.brand,
          carFormData.model,
          selectedFuelType,
          "",
          selectedTransType
        )
      );
    }
  }, [
    carFormData.model,
    carFormData.brand,
    selectedFuelType,
    selectedTransType,
    dispatch,
  ]);

  const handleSelectFuel = (fuel) => {
    handleCarChange({
      target: {
        name: "fuelType",
        value: fuel,
      },
    });
    setSelectedFuelType(fuel === selectedFuelType ? null : fuel);
  };

  const handleSelectTrans = (trans) => {
    handleCarChange({
      target: {
        name: "transmission",
        value: trans,
      },
    });
    setSelectedTransType(trans === selectedTransType ? null : trans);
  };

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Variant");
  };

  const handleVariantSearch = (e) => {
    const keyword = e.target.value;
    if (selectedFuelType && selectedTransType) {
      dispatch(
        getVariant(
          carFormData.brand,
          carFormData.model,
          selectedFuelType,
          keyword,
          selectedTransType
        )
      );
    }
  };

  const handleSearchClick = () => {
    if (selectedFuelType && selectedTransType) {
      dispatch(
        getVariant(carFormData.brand, carFormData.model, selectedFuelType)
      );
    }
    console.log("Search button clicked");
  };

  return (
    <div>
      <div className="flex justify-center m-auto w-80  mb-3 text-center">
        <div className="">
          <input
            type="text"
            placeholder="Search here...."
            className="border px-2 py-1 m-2 w-full sm:m-0 border-gray-500"
            onChange={handleVariantSearch}
          />
        </div>
        <button
          className="bg-primary-500 px-2 py-1 text-white font-medium m-2 sm:m-0"
          onClick={handleSearchClick}
        >
          SEARCH
        </button>
      </div>
      <div className="m-auto w-80  h-56">
        {fuelOptions.length > 0 && (
          <OptionsSelector
            title="Select fuel type"
            options={fuelOptions}
            selectedOption={selectedFuelType}
            onSelect={handleSelectFuel}
          />
        )}
        {transOptions.length > 0 && (
          <OptionsSelector
            title="Select transmission type"
            options={transOptions}
            selectedOption={selectedTransType}
            onSelect={handleSelectTrans}
          />
        )}
      </div>
      <div className="m-auto w-80 flex h-56">
        <div className="overflow-y-auto w-full flex flex-col">
          {" "}
          {/* max-h-56 sets maximum height */}
          {variants?.map((variant, index) => (
            <div
              key={index}
              className="w-full text-center shadow py-2 font-medium hover:cursor-pointer"
              onClick={() => {
                handleCarChange({
                  target: {
                    name: "variant",
                    value: variant._id,
                  },
                });
                toggleComponent("Reg. states");
              }}
            >
              {variant.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarVariant;

const OptionsSelector = ({ title, options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-col p-1 xl:p-2">
      <h1 className="text-xl">{title}</h1>
      <div className="text-center">
        <div className="flex flex-wrap justify-center">
          {options.map((option) => (
            <div
              key={option}
              className={`px-3 py-1 ${
                selectedOption === option
                  ? "bg-blue-500 text-white"
                  : "border-2"
              } uppercase rounded-full m-1 cursor-pointer`}
              onClick={() => onSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
