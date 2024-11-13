import React from "react";

const CarItems2 = ({ car }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {car.map((car) => (
        <div key={car.id} className="max-w-xs rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src={car.image} alt={car.model} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{car.model}</div>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Transmission:</span> {car.transmission}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Fuel:</span> {car.fuel}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Price:</span> {car.price}
            </p>
          </div>
          <div className="flex justify-center pb-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold mx-2">Delete</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold mx-2">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarItems2;
