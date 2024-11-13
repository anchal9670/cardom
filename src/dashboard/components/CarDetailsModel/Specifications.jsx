import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const Specifications = ({
  setVisited,
  setActiveComponent,
  handleNestedCarChange,
  carFormData,
  setCarFormData,
}) => {
  const [validTill, setValidTill] = useState(
    new Date(carFormData.specifications.insurance.validTill)
  );

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Specifications");
  };

  const handleSubmit = () => {
    toggleComponent("Images");
  };

  const handleDateChange = (date) => {
    setValidTill(date);
    setCarFormData((prevState) => ({
      ...prevState,
      specifications: {
        ...prevState.specifications,
        insurance: {
          ...prevState.specifications.insurance,
          validTill: date,
        },
      },
    }));
  };

  return (
    <div className="w-80">
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Reg. Number:
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="regNumber"
          value={carFormData.specifications.regNumber}
          onChange={(e) =>
            handleNestedCarChange(e, "specifications", "regNumber")
          }
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Engine Capacity:
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="engineCapacity"
          value={carFormData.specifications.engineCapacity}
          onChange={(e) =>
            handleNestedCarChange(e, "specifications", "engineCapacity")
          }
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Insurance Type:
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="insurance.type"
          value={carFormData.specifications.insurance.type}
          onChange={(e) =>
            setCarFormData((prevState) => ({
              ...prevState,
              specifications: {
                ...prevState.specifications,
                insurance: {
                  ...prevState.specifications.insurance,
                  type: e.target.value,
                },
              },
            }))
          }
        />
      </div>
      <div>
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Insurance Valid Till:
        </label>
        <DatePicker
          className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm"
          value={validTill}
          onChange={handleDateChange}
          calendarClassName="react-calendar"
          format="y-MM-dd"
          clearIcon={null}
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

export default Specifications;
