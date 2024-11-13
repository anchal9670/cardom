import React, { useEffect, useState, useCallback } from "react";
import CarItem from "../components/CarItem";
import Faq from "../components/Faq";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../store/cars/carSlice";
import { getBrand } from "../store/cars/brandSlice";
// import debounce from "lodash.debounce";
import CarFilters from "../components/CarFilters";
import ReactPaginate from "react-paginate";

const CarListingPage = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedBrands: [],
    selectedFuelTypes: [],
    selectedTransmissions: [],
    minPrice: "",
    maxPrice: "",
    minKmDriven: "",
    maxKmDriven: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9; // Adjust as needed
  const [totalPages, setTotalPages] = useState(0);

  const { cars, totalLength } = useSelector((state) => state.cars.cars.cars);
  const brands = useSelector((state) => state.cars.brand.brand);

  useEffect(() => {
    dispatch(getBrand(""));
  }, [dispatch]);

  
    const updateFilters = useCallback(
      (updatedFilters, page = currentPage, limit = itemsPerPage) => {
        const queryParams = {
          searchTerm: updatedFilters.searchTerm,
          brands: updatedFilters.selectedBrands.join(","),
          fuelTypes: updatedFilters.selectedFuelTypes.join(","),
          transmissions: updatedFilters.selectedTransmissions.join(","),
          price: `${updatedFilters.minPrice}-${updatedFilters.maxPrice}`,
          kmDriven: `${updatedFilters.minKmDriven}-${updatedFilters.maxKmDriven}`,
          page,
          limit,
        };
  
        const queryString = Object.entries(queryParams)
          .filter(([key, value]) => value) // Filter out keys with falsy values
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
  
        dispatch(fetchCars(queryString));
      },
      [currentPage, itemsPerPage, dispatch] // Dependencies of useCallback
    );
  
    useEffect(() => {
      updateFilters(filters);
    }, [filters, currentPage, itemsPerPage, updateFilters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };

      if (
        [
          "searchTerm",
          "minPrice",
          "maxPrice",
          "minKmDriven",
          "maxKmDriven",
        ].includes(filterType)
      ) {
        updatedFilters[filterType] = value;
      } else {
        const filterList = updatedFilters[filterType];
        updatedFilters[filterType] = filterList.includes(value)
          ? filterList.filter((item) => item !== value)
          : [...filterList, value];
      }

      updateFilters(updatedFilters);
      return updatedFilters;
    });
  };

  // const debouncedSearch = useCallback(
  //   debounce((value) => handleFilterChange("searchTerm", value), 300),
  //   []
  // );

  // const handleSearchChange = (e) => {
  //   debouncedSearch(e.target.value);
  // };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totalLength / itemsPerPage));
  }, [totalLength, itemsPerPage]);

  return (
    <div className="flex flex-col sm:flex-row">
      <CarFilters
        brands={brands}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="w-full sm:w-3/4">
        <div className="flex flex-wrap p-3 m-3">
          {cars?.map((car) => (
            <CarItem car={car} key={car._id} />
          ))}
        </div>
        <div className="flex justify-center m-5 p-5">
          <ReactPaginate
            breakLabel={<span className="mx-2">...</span>}
            nextLabel={<span className="mx-2">&gt;</span>}
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            pageCount={totalPages}
            previousLabel={<span className="mx-2">&lt;</span>}
            renderOnZeroPageCount={null}
            activeClassName={"border border-blue-500 rounded-full"}
            containerClassName="flex justify-center text-white items-center my-5 bg-blue-400 p-3 rounded-lg"
            pageClassName="mx-1 w-10 h-10 flex justify-center items-center"
            previousClassName="mx-1"
            nextClassName="mx-1"
          />
        </div>
        <Faq />
      </div>
    </div>
  );
};

export default CarListingPage;
