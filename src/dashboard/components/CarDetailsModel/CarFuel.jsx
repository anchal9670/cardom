import React, { useState } from "react";

const CarFuel = (props) => {
  const cities = ['Petrol','diesel','Electric','Hybrid'];
  const [activeComponent, setActiveComponent] = useState('Fuel');
 

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
   
    
  };

  return (
    <div>
      {activeComponent === 'Fuel' && (
        <div>
          <div className="flex justify-center mb-3">
            <div>
              <input type="text" placeholder="Search here...." className="border-2 px-2 py-1 w-full m-2 sm:m-0 border-gray-500" />
            </div>
            <button className="bg-orange-500 px-2 py-1 text-white font-medium m-2 sm:m-0">SEARCH</button>
          </div>
          <div className="m-auto w-full flex justify-center h-56 mb-20">
            <ul className="overflow-y-auto w-full flex flex-wrap justify-center">
              {cities.map((city, index) => (
                <li key={index} className="border-2 border-orange-500 w-1/2 border-b-4 m-2 shadow-2xl flex justify-center rounded-md font-medium hover:cursor-pointer items-center" onClick={() => toggleComponent('Fuel')}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center text-2xl font-bold">
            Choose <span className="text-orange-500"> Brand</span>
          </div>
          <div className="w-full sm:w-1/2 h-auto flex flex-wrap justify-center m-auto mb-3">
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
            <div className="border-2 p-5 m-2">logo</div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CarFuel;