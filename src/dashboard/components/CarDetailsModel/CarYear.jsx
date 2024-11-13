import React, { useState } from "react";
const years = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
  1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
  1985, 1984, 1983, 1982, 1981, 1980,
];

const CarYear = ({ setVisited, setActiveComponent, handleCarChange }) => {
  const [filterYear, setFilterYear] = useState(years);

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Year");
  };

  const handleYearSearch = (e) => {
    const searchTerm = e.target.value;
    const filteredYears = years.filter((year) =>
      year.toString().includes(searchTerm)
    );
    setFilterYear(filteredYears);
  };

  return (
    <div>
      <div className="flex justify-center m-auto w-80  mb-3 text-center">
        <div className="">
          <input
            type="text"
            placeholder="Search here...."
            className="border px-2 py-1 m-2 w-full sm:m-0 border-gray-500"
            onChange={handleYearSearch}
          />
        </div>
        <button
          className="bg-primary-500 px-2 py-1 text-white font-medium m-2 sm:m-0"
          onClick={handleYearSearch}
        >
          SEARCH
        </button>
      </div>
      <div className="m-auto w-80 flex justify-center h-56">
  <div className="overflow-y-auto w-full flex flex-wrap justify-center">
    {filterYear.map((year, index) => (
      <div
        key={index}
        className="w-full text-center shadow py-2 font-medium hover:cursor-pointer"
        onClick={() => {
          handleCarChange({
            target:{
              name:"manufacturerYear",
              value: year
            }
          });
          toggleComponent("Model");
        }}
      >
        {year}
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default CarYear;
