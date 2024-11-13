import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../../store/cars/brandSlice";

const CarBrand = ({ setVisited, setActiveComponent, handleCarChange }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.cars.brand.brand);
  const user = useSelector((state) => state.auth.users);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleToggle = () => {
    setActiveComponent("Year");
    setVisited("Brand");
  };

  const handleBrandSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    dispatch(getBrand(keyword));
  };

  const handleBrandClick = (brandId) => {
    handleCarChange({
      target: {
        name: "brand",
        value: brandId,
      },
    });
    handleToggle();
  };

  if (Object.keys(user).length <= 0) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <div className="flex justify-center m-auto w-80 mb-3 text-center">
        <input
          type="text"
          value={search}
          placeholder="Search here...."
          className="border px-2 py-1 m-2 w-full sm:m-0 border-gray-500"
          onChange={handleBrandSearch}
        />
        <button
          className="bg-primary-500 px-2 py-1 text-white font-medium m-2 sm:m-0"
          onClick={() => dispatch(getBrand(search))}
        >
          SEARCH
        </button>
      </div>

      <div className="flex gap-5 w-80 flex-wrap justify-center max-h-56 overflow-y-auto">
        {brands?.length > 0 ? (
          brands.map((brand) => (
            <div
              className="border-2 w-12 h-12 shadow cursor-pointer"
              onClick={() => handleBrandClick(brand._id)}
              key={brand._id}
            >
              <img
                src={brand?.logo?.url ?? ""}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div>No brands found</div>
        )}
      </div>
    </div>
  );
};

export default CarBrand;
