import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRtoData, getState } from "../../../store/stateSlice";
import { CiEdit } from "react-icons/ci";

const CarState = ({ setVisited, setActiveComponent, handleCarChange }) => {
  const dispatch = useDispatch();

  const states = useSelector((state) => state.state.states);
  const rtoCodes = useSelector((state) => state.state.rto) || [];

  const [selectedState, setSelectedState] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [stateId, setStateId] = useState("");

  useEffect(() => {
    dispatch(getState());
  }, [dispatch]);

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
    setVisited("Reg. states");
  };

  const handleStateSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.value;
    dispatch(getState(keyword));
  };

  const handleRtoSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.value;
    dispatch(getRtoData(stateId, keyword));
  };

  const handleStateChange = (state) => {
    setSelectedState(state.state);
    setStateId(state._id);
    handleCarChange({
      target: {
        name: "state",
        value: state._id,
      },
    });
    dispatch(getRtoData(state._id, ""));
  };
  return (
    <div>
      {!isSelected ? (
        <div className="flex justify-center m-auto w-80  mb-3 text-center">
          <div className="">
            <input
              type="text"
              name="state"
              placeholder="Search here...."
              className="border px-2 py-1 m-2 w-full sm:m-0 border-gray-500"
              onChange={handleStateSearch}
            />
          </div>
          <button
            className="bg-primary-500 px-2 py-1 text-white font-medium m-2 sm:m-0"
            onClick={handleStateSearch}
          >
            SEARCH
          </button>
        </div>
      ) : (
        <div className="flex justify-center m-auto w-80  mb-3 text-center">
          <div className="">
            <input
              type="text"
              name="rto"
              placeholder="Search here...."
              className="border px-2 py-1 m-2 w-full sm:m-0 border-gray-500"
              onChange={handleRtoSearch}
            />
          </div>
          <button
            className="bg-primary-500 px-2 py-1 text-white font-medium m-2 sm:m-0"
            onClick={handleRtoSearch}
          >
            SEARCH
          </button>
        </div>
      )}
      {isSelected && (
        <>
          <div className="flex  justify-center">
            <div
              className={`px-3 py-1 flex justify-center items-center bg-blue-500 text-white uppercase rounded-full m-1`}
            >
              {selectedState}{" "}
              <CiEdit
                className="ml-3 cursor-pointer"
                onClick={() => setIsSelected(!isSelected)}
              />
            </div>
          </div>
          <div className="m-auto w-80 flex justify-center h-56">
            <div className="overflow-y-auto w-full flex flex-col">
              {rtoCodes.map((rto, index) => (
                <div
                  key={index}
                  className="w-full text-center shadow py-2 font-medium hover:cursor-pointer"
                  onClick={() => {
                    handleCarChange({
                      target: {
                        name: "rto",
                        value: rto._id,
                      },
                    });
                    toggleComponent("Kms Driven");
                  }}
                >
                  {rto.code}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {!isSelected && (
        <div>
          <div className="m-auto w-80 flex justify-center h-56">
            <div className="overflow-y-auto w-full flex flex-col">
              {states.map((state, index) => (
                <div
                  key={index}
                  className="w-full text-center shadow py-2 font-medium hover:cursor-pointer"
                  onClick={() => {
                    handleStateChange(state);
                    setIsSelected(!isSelected);
                  }}
                >
                  {state.state}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarState;
