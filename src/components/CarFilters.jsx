import React from 'react';

const CarFilters = ({
  brands,
  filters,
  onFilterChange,
}) => {

  const handleCheckboxChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handleInputChange = (filterType, e) => {
    onFilterChange(filterType, e.target.value);
  };

  return (
    <div className="w-full p-10 mt-4 sm:mt-16 sm:w-1/4 shadow-xl">
      <div className="border-b-2 pb-2">
        <div className="text-2xl mb-2">BRAND AND MODEL</div>
        <div className="flex flex-col lg:flex-row">
          <div>
            <input
              type="text"
              placeholder="Search by brands"
              className="border-2 w-full py-2 px-1"
              onChange={(e) => handleInputChange("searchTerm", e)}
            />
          </div>
          <div className="bg-primary-500 px-4 py-2 text-white cursor-pointer">
            SEARCH
          </div>
        </div>
      </div>

      <div className="mt-5 mb-2 border-b-2 pb-2">
        <div className="text-2xl mb-2">POPULAR BRANDS</div>
        <div className="flex gap-5 flex-wrap justify-center max-h-72 overflow-y-scroll">
          {brands?.map((brand) => (
            <div
              className={`border-2 w-14 h-14 cursor-pointer ${
                filters.selectedBrands.includes(brand._id) ? "border-blue-500" : ""
              }`}
              key={brand._id}
              onClick={() => handleCheckboxChange("selectedBrands", brand._id)}
            >
              <img
                src={brand?.logo?.url ?? ""}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border-b-2 pb-2">
        <div className="text-2xl mb-2">FUEL</div>
        {["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "Other"].map((fuelType) => (
          <div className="flex items-center gap-2" key={fuelType}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("selectedFuelTypes", fuelType)}
              checked={filters.selectedFuelTypes.includes(fuelType)}
            />
            <span className="ml-2">{fuelType}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-b-2 pb-2">
        <div className="text-2xl mb-2">TRANSMISSION</div>
        {["Manual", "Automatic"].map((transmission) => (
          <div className="flex items-center gap-2" key={transmission}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("selectedTransmissions", transmission)}
              checked={filters.selectedTransmissions.includes(transmission)}
            />
            <span className="ml-2">{transmission}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-b-2 pb-2">
        <div className="text-2xl mb-2">PRICE</div>
        <input
          type="text"
          placeholder="Min Price"
          className="border-2 w-full py-2 px-1 mb-2"
          onChange={(e) => handleInputChange("minPrice", e)}
        />
        <input
          type="text"
          placeholder="Max Price"
          className="border-2 w-full py-2 px-1"
          onChange={(e) => handleInputChange("maxPrice", e)}
        />
      </div>

      <div className="mt-5 border-b-2 pb-2">
        <div className="text-2xl mb-2">KM DRIVEN</div>
        <input
          type="text"
          placeholder="Min KM Driven"
          className="border-2 w-full py-2 px-1 mb-2"
          onChange={(e) => handleInputChange("minKmDriven", e)}
        />
        <input
          type="text"
          placeholder="Max KM Driven"
          className="border-2 w-full py-2 px-1"
          onChange={(e) => handleInputChange("maxKmDriven", e)}
        />
      </div>
    </div>
  );
};

export default CarFilters;
