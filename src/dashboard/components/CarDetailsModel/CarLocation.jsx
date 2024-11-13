import React, { useState, useEffect } from "react";

const CarLocation = ({
  setVisited,
  setActiveComponent,
  handleNestedCarChange,
  carFormData,
}) => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000); // Alert will disappear after 5 seconds

      // Cleanup the timer if the component is unmounted or alert changes
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Location");
  };

  const handleSubmit = () => {
    const { street, city, state, postal_code } = carFormData.location;

    if (!street || !city || !state || !postal_code) {
      setAlert("Please fill in all location fields.");
      return;
    }

    setAlert(null);
    toggleComponent("Specifications"); // Replace with the actual next component name
  };

  return (
    <div className="w-80">
      {alert && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-medium">Alert:</span> {alert}
          </div>
        </div>
      )}
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Street:
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="street"
          value={carFormData.location.street}
          onChange={(e) => handleNestedCarChange(e, "location", "street")}
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          City:
        </label>
        <input
          type="text"
          name="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={carFormData.location.city}
          onChange={(e) => handleNestedCarChange(e, "location", "city")}
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          State:
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="state"
          value={carFormData.location.state}
          onChange={(e) => handleNestedCarChange(e, "location", "state")}
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Postal Code:
        </label>
        <input
          type="text"
          name="postal_code"
          value={carFormData.location.postal_code}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => handleNestedCarChange(e, "location", "postal_code")}
        />
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

export default CarLocation;
