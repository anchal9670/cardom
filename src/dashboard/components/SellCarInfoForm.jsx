import React, { useState } from "react";
import CarInfoModel from "./CarDetailsModel/CarInfoModel";
import CarYear from "./CarDetailsModel/CarYear";
import CarLocation from "./CarDetailsModel/CarLocation";
import CarKM from "./CarDetailsModel/CarKM";
import CarFuel from "./CarDetailsModel/CarFuel";
import CarBrand from "./CarDetailsModel/CarBrand";
import CarState from "./CarDetailsModel/CarState";
import CarVariant from "./CarDetailsModel/CarVariant";
import Specifications from "./CarDetailsModel/Specifications";
import CarImages from "./CarDetailsModel/CarImages";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCar } from "../../store/cars/carSlice";

const Button = ({ onClick, active, children, visited }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={`w-32 hover:bg-primary-600 hover:text-white h-7 cursor-pointer max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out font-medium text-white ${
        active
          ? "bg-primary-500 text-white"
          : visited
          ? "bg-green-500 text-white"
          : "bg-primary-500 text-gray-800"
      }`}
      disabled={!visited}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const initialState = {
  brand: "",
  model: "",
  variant: "",
  manufacturerYear: "",
  condition: "good",
  location: {
    street: "",
    city: "",
    state: "",
    postal_code: "",
  },
  fuelType: "",
  transmission: "",
  status: "used",
  state: "",
  rto: "",
  price: "",
  description: "",
  specifications: {
    regNumber: "",
    engineCapacity: "",
    insurance: {
      type: "",
      validTill: new Date(),
    },
    spareKey: false,
    kmDriven: "",
    ownership: "First",
  },
  history: [],
};

const componentOrder = [
  "Brand",
  "Year",
  "Model",
  "Variant",
  "Reg. states",
  "Kms Driven",
  "Location",
  "Specifications",
  "Images",
];

const SellCarInfoForm = () => {
  const [activeComponent, setActiveComponent] = useState("Brand");
  const [visitedComponents, setVisitedComponents] = useState({});

  const [carFormData, setCarFormData] = useState(initialState);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCarChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  };

  const handleNestedCarChange = (e, field, nestedField) => {
    const {  value } = e.target;
    setCarFormData({
      ...carFormData,
      [field]: {
        ...carFormData[field],
        [nestedField]: value,
      },
    });
  };

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const setComponentVisited = (componentName) => {
    setVisitedComponents((prevState) => ({
      ...prevState,
      [componentName]: true,
    }));
  };

  const handleCarSubmitted = async (e) => {
    e.preventDefault();
    dispatch(
      createCar(files, carFormData, setCarFormData, initialState, navigate)
    );
  };

  return (
    <div className="container">
      <div className="flex flex-col w-full p-auto md:w-4/5 lg:w-1/2 border-2  mt-12 shadow-2xl m-auto h-screen">
        <h1 className="flex py-10 mx-5 font-bold text-2xl text-gray-800 justify-center">
          <span className="text-primary-500">Sell Your Car</span>
        </h1>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
            {componentOrder.map((component, index) => (
              <div className="inline-block px-3" key={index}>
                <Button
                  onClick={() => {
                    toggleComponent(component);
                  }}
                  active={activeComponent === component}
                  visited={visitedComponents[component]}
                >
                  {component}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          {activeComponent === "Brand" && (
            <CarBrand
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
              handleCarChange={handleCarChange}
            />
          )}
          {activeComponent === "Model" && (
            <CarInfoModel
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
              carFormData={carFormData}
              handleCarChange={handleCarChange}
            />
          )}
          {activeComponent === "Year" && (
            <CarYear
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
              handleCarChange={handleCarChange}
            />
          )}
          {activeComponent === "Location" && (
            <CarLocation
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              handleNestedCarChange={handleNestedCarChange}
              carFormData={carFormData}
            />
          )}
          {activeComponent === "Kms Driven" && (
            <CarKM
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              handleNestedCarChange={handleNestedCarChange}
              carFormData={carFormData}
              handleCarChange={handleCarChange}
            />
          )}
          {activeComponent === "Car Fuel" && (
            <CarFuel
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          )}
          {activeComponent === "Reg. states" && (
            <CarState
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              handleCarChange={handleCarChange}
            />
          )}
          {activeComponent === "Variant" && (
            <CarVariant
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              carFormData={carFormData}
              handleCarChange={handleCarChange}
            />
          )}
          {activeComponent === "Specifications" && (
            <Specifications
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              carFormData={carFormData}
              handleCarChange={handleCarChange}
              handleNestedCarChange={handleNestedCarChange}
              setCarFormData={setCarFormData}
            />
          )}
          {activeComponent === "Images" && (
            <CarImages
              setVisited={setComponentVisited}
              setActiveComponent={setActiveComponent}
              carFormData={carFormData}
              handleCarSubmitted={handleCarSubmitted}
              handleNestedCarChange={handleNestedCarChange}
              setCarFormData={setCarFormData}
              setFiles={setFiles}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SellCarInfoForm;
