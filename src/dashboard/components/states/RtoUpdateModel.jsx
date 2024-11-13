import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { updateRTO } from "../../../store/stateSlice";
import { getStateRTOCode } from "../../common";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const RtoUpdateModel = ({ isRtoModelOpen, setIsRtoModelOpen, editData }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state.states);
  const [stateNameCode, setStateNameCode] = useState("");
  const [editValue, setEditValue] = useState({
    ...editData,
    code: editData.code.replace(/^[a-zA-Z]+-/g, ""),
  });

  useEffect(() => {
    const { state: editState } = editValue;
    const stateObject = state.find((s) => s._id === editState);
    const stateName = stateObject?.state;

    if (stateName) {
      setStateNameCode(getStateRTOCode(stateName));
    }
  }, [editValue, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const rtoData = {
      ...editValue,
      code: stateNameCode + editValue.code,
    };

    dispatch(updateRTO(rtoData, setIsRtoModelOpen));
  };
  return (
    <Modal
      isOpen={isRtoModelOpen}
      style={customStyles}
      contentLabel="Rto Update Modal"
    >
      <div className="flex justify-between w-80 mb-3">
        <div className="text-xl font-bold">UPDATE RTO</div>
        <IoIosCloseCircleOutline
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => setIsRtoModelOpen(!isRtoModelOpen)}
        />
      </div>
      <div className="mx-auto max-w-xs w-80">
        <div className="ml-1">
          <select
            id="default"
            name="state"
            onChange={handleChange}
            disabled
            defaultValue={editValue.state}
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {state.map((s) => {
              return (
                <option
                  key={s._id}
                  value={s._id}
                  selected={s._id === editValue.state}
                >
                  {s.state}
                </option>
              );
            })}
          </select>
        </div>
        <input
          className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="City name"
          defaultValue={editValue.city}
          name="city"
          onChange={handleChange}
        />
        <div className="flex items-center mt-5">
          <div className="z-50  font-bold w-12 text-right pr-2">
            {stateNameCode}
          </div>
          <input
            className="w-full pl-11 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white -ml-12"
            type="number"
            placeholder="RTO code"
            defaultValue={editValue.code}
            name="code"
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border border-primary-500 hover:bg-primary-500 hover:text-white px-6  text-primary-500"
          onClick={submitHandler}
        >
          <span className="ml-3">Submit</span>
        </button>
      </div>
    </Modal>
  );
};

export default RtoUpdateModel;
