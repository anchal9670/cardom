import React, { useState } from "react";
import Modal from "react-modal";
import { createTestDrive } from "../store/testDriveSlice";
import { useDispatch } from "react-redux";

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

const TestDriveForm = ({ isTestDriveOpen, setIsTestDriveOpen, carId }) => {
  const [formData, setFormData] = useState({
    car: carId,
    appointmentDate: "",
    appointmentTime: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createTestDrive(formData));
  };

  return (
    <Modal
      isOpen={isTestDriveOpen}
      onRequestClose={() => setIsTestDriveOpen(false)}
      contentLabel="Test drive Modal"
      style={customStyles}
    >
      <div className="p-4 w-80">
        <h2 className="text-2xl mb-4">Book a Test Drive</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Time</label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsTestDriveOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TestDriveForm;
