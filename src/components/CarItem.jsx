import React from "react";
import { Link } from "react-router-dom";

const placeholderImage = "https://images.unsplash.com/photo-1575090536203-2a6193126514?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDN8fGh5dW5kYWl8ZW58MHx8fHwxNjMxNjk3ODI1&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=450&fit=crop";

const CarItem = ({ car }) => {
  const {
    _id,
    images,
    brand,
    model,
    manufacturerYear,
    specifications,
    fuelType,
    transmission,
    price,
  } = car || {};

  const { url: carImageUrl } = images?.[0] || {};
  const { name: brandName } = brand || {};
  const { name: modelName } = model || {};
  const { kmDriven } = specifications || {};

  return (
    <div className="p-3 w-full md:w-6/12 lg:w-4/12">
      <div className="bg-white border shadow-md text-gray-500">
        <Link to={`/car-details/${_id}`}>
          <img
            src={carImageUrl || placeholderImage}
            className="w-full h-64 object-cover"
            alt={`${brandName} ${modelName}`}
            width={600}
            height={450}
          />
        </Link>
        <div className="p-6">
          <h4 className="font-bold mb-2 text-gray-900 text-xl">
            <Link to={`/car-details/${_id}`} className="hover:text-gray-500">
              {brandName} {modelName} {manufacturerYear}
            </Link>
          </h4>
          <p className="mb-2 text-sm">
            {kmDriven}KM - {fuelType} - {transmission}
          </p>
          <hr className="border-gray-200 my-4" />
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center py-1 space-x-1">
              <span>4.7</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="1.125em"
                height="1.125em"
                className="text-primary-500"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" />
                </g>
              </svg>
              <span>(245 reviews)</span>
            </div>
            <p className="font-bold text-gray-900">₹ {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
