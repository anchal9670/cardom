import React, { useState, useEffect } from "react";

const CarKM = ({
  setVisited,
  setActiveComponent,
  handleNestedCarChange,
  carFormData,
  handleCarChange,
}) => {
  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Kms Driven");
  };

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = () => {
    if (carFormData.specifications.kmDriven === "") {
      setAlert("Kindly provide the number of kilometers driven.");
      return;
    }
    if (carFormData.price === "") {
      setAlert("Please enter the price.");
      return;
    }
    toggleComponent("Location");
  };

  return (
    <div className="mb-6 w-80">
      {alert && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Danger alert!</span> {alert}
          </div>
        </div>
      )}
      <label className="block mb-2 text-xl font-medium text-gray-900">
        Kilometers Driven:
      </label>
      <input
        type="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        name="kmDriven"
        value={carFormData.specifications.kmDriven}
        placeholder="Kilometers Driven"
        onChange={(e) => handleNestedCarChange(e, "specifications", "kmDriven")}
        required
      />
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={carFormData.price}
          onChange={handleCarChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Condition:
        </label>
        <select
          name="condition"
          value={carFormData.condition}
          onChange={handleCarChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
          <option value="">Select Condition</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Ownership:
        </label>
        <select
          name="ownership"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={carFormData.specifications.ownership}
          onChange={(e) =>
            handleNestedCarChange(e, "specifications", "ownership")
          }
          required
        >
          <option value="">Select Ownership</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
          <option value="More than Four">More than Four</option>
        </select>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CarKM;
