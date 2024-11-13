import React, { useState } from "react";

const CarInfoBrand = (props) => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "Ahmedabad",
    "hhhhh",
  ];
  const [activeComponent, setActiveComponent] = useState("Brand");

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div>
      {activeComponent === "Brand" && (
        <div>
          <div className="flex justify-center m-auto w-80  mb-3 text-center">
            <div className="">
              <input
                type="text"
                placeholder="Search here...."
                className="border-2 px-2 py-1 m-2 sm:m-0 border-gray-500"
              />
            </div>
            <button className="bg-orange-500 px-2 py-1 text-white font-medium m-2 sm:m-0">
              SEARCH
            </button>
          </div>
          <div className="m-auto w-80 flex justify-center h-56">
            <div className="overflow-y-auto w-full flex flex-wrap justify-center">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="w-full text-center shadow py-2 font-medium hover:cursor-pointer"
                  onClick={() => toggleComponent("Model")}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarInfoBrand;
