import React from "react"

const CarfilterItems = ({data}) => {
  return (
    <div className="  lg:w-96 m-5 sm:w-full bg-white">
        <div className=" border-2 shadow-2xl flex sm:flex-row md:flex-col lg:flex-col h-44 items-center rounded-md">
          <div className="p-3 m-auto font-medium text-2xl">
            {data.title}.
          </div>
          <div className="p-3">{data.description}   </div>
        </div>
    </div>
  )
};

export default CarfilterItems;
