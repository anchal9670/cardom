import React, { useEffect } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchSellerCars } from "../store/cars/carSlice";

const CarTable = () => {
  const dispatch = useDispatch();
  const soldCars = useSelector((state) => state.cars.cars.sellerCar);

  useEffect(() => {
    dispatch(fetchSellerCars());
  }, [dispatch]);


  const deleteCar = (id) => {
    // Placeholder implementation, replace with actual delete logic
    console.log(`Deleting car with ID: ${id}`);
    // dispatch(deleteCarAction(id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-primary-500 p-5 mb-5">{/* Profile Section */}</div>
      {/* Navigation Buttons */}
      {/* Car Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table Headers */}
          <thead className="bg-primary-500 text-white">
            <tr>
              <th className="px-3 py-2 uppercase font-semibold text-sm">CarID</th>
              <th className="px-3 py-2 uppercase font-semibold text-sm">CarName</th>
              <th className="px-3 py-2 uppercase font-semibold text-sm">FuelType</th>
              <th className="px-3 py-2 uppercase font-semibold text-sm">Transmission</th>
              <th className="px-3 py-2 uppercase font-semibold text-sm">Price</th>
              <th className="px-3 py-2 uppercase font-semibold text-sm">Image</th>
              <th className="px-3 py-2 uppercase font-semibold text-sm">Options</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {soldCars?.map((car, index) => {
              return (
                <tr key={car._id}>
                  <td className="px-3 py-3 text-center">{index + 1}</td>
                  <td className="px-3 py-3 text-center">{car?.brand?.name ?? ""}</td>
                  <td className="px-3 py-3 text-center">{car?.fuelType ?? ""}</td>
                  <td className="px-3 py-3 text-center">{car?.transmission ?? ""}</td>
                  <td className="px-3 py-3 text-center">{car?.price ?? ""}</td>
                  <td className="px-3 py-3 text-center">
                    <img src={car?.images[0]?.url} className="w-24 mx-auto" alt="" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="px-2 py-1 ml-1 rounded-md bg-green-600 font-semibold text-white" onClick={() => deleteCar(car?._id)}>
                      <MdEditSquare />
                    </button>
                    <button className="px-2 py-1 ml-1 rounded-md bg-red-600 font-semibold text-white" onClick={() => deleteCar(car?._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarTable;
