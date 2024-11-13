import React, { useEffect, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteTestDrive, fetchTestDrives } from "../store/testDriveSlice";
import { formatTime, formatDate } from "../utils/common";
import { Link } from "react-router-dom";
import EditTestDriveForm from "../modals/EditTestDriveForm";

const Appointment = () => {
  const dispatch = useDispatch();
  const { testDrives } = useSelector((state) => state.testDrive);

  const [isEditTestDriveOpen, setEditIsTestDriveOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    dispatch(fetchTestDrives());
  }, [dispatch]);

  const deleteCar = (id) => {
   dispatch(deleteTestDrive(id));
  };

  return (
    <>
      {isEditTestDriveOpen && (
        <EditTestDriveForm
          isEditTestDriveOpen={isEditTestDriveOpen}
          setEditIsTestDriveOpen={setEditIsTestDriveOpen}
          data={editData}
        />
      )}
      <div className="bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="bg-primary-500 p-5 mb-5">{/* Profile Section */}</div>
        {/* Navigation Buttons */}
        <h1 className="text-2xl mb-3 ml-3"> Appointment</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            {/* Table Headers */}
            <thead className="bg-primary-500 text-white">
              <tr>
                <th className="px-3 py-2 uppercase font-semibold text-sm">
                  ID
                </th>
                <th className="px-3 py-2 uppercase font-semibold text-sm">
                  CarName
                </th>
                <th className="px-3 py-2 uppercase font-semibold text-sm">
                  Date
                </th>
                <th className="px-3 py-2 uppercase font-semibold text-sm">
                  Time
                </th>
                <th className="px-3 py-2 uppercase font-semibold text-sm">
                  Status
                </th>
                <th className="px-3 py-2 uppercase font-semibold text-sm">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {testDrives?.map((test, index) => {
                return (
                  <tr key={test._id}>
                    <td className="px-3 py-3 text-center">{index + 1}</td>
                    <td className="px-3 py-3 text-center">
                      <Link to={`/car-details/${test?.car?._id}`}>
                        {`${test?.car?.brand?.name ?? ""} ${
                          test?.car?.model?.name ?? ""
                        }`}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-center">
                      {formatDate(test?.appointmentDate) ?? ""}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {formatTime(test?.appointmentTime) ?? ""}
                    </td>

                    <td className="px-3 py-3 text-center">
                      {test?.status ?? ""}
                    </td>

                    <td className="px-3 py-3 text-center">
                      <button
                        className="px-2 py-1 ml-1 rounded-md bg-green-600 font-semibold text-white"
                        onClick={() => {
                          setEditData(test);
                          setEditIsTestDriveOpen(true);
                        }}
                        disabled={
                          test?.status === "Completed" ||
                          test?.status === "Confirmed"
                        }
                      >
                        <MdEditSquare />
                      </button>
                      <button
                        className="px-2 py-1 ml-1 rounded-md bg-red-600 font-semibold text-white"
                        onClick={() => deleteCar(test?._id)}
                        disabled={
                          test?.status === "Completed" ||
                          test?.status === "Confirmed"
                        }
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Appointment;
