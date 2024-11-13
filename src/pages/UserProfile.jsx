import React, { useEffect, useState } from "react";
import {
  FaRegUserCircle,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/authSlice";
import EditUser from "../components/EditUser";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileVisible(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileVisible(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row p-4 bg-gray-100 min-h-screen">
        <div className="sm:w-1/4 w-full sm:mx-3 mb-5">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
            <FaRegUserCircle className="text-primary-500" size={90} />
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              className="mt-4 py-2 px-4 bg-primary-500 text-white rounded-lg w-full"
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </button>
            <div className="flex justify-around w-full mt-4 text-gray-600">
              <FaTwitter size={20} />
              <FaFacebook size={20} />
              <FaInstagram size={20} />
            </div>
          </div>
        </div>

        <div className="sm:w-3/4 w-full p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Profile Information</h3>
          <div className="border-l-4 border-primary-500 pl-4 mb-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Necessitatibus soluta nihil aliquid iusto consequuntur unde enim
              asperiores quas numquam autem voluptas ducimus distinctio, quae
              consequatur quibusdam perferendis amet rerum dolores?
            </p>
          </div>
          <h3 className="text-xl font-semibold mb-2">BIO</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-lg">
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone_number}
              </p>
              {/* <p><strong>Country:</strong> {user.country}</p> */}
            </div>
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              {/* <p><strong>City:</strong> {user.city}</p>
                            <p><strong>Street:</strong> {user.street}</p> */}
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Link
              to="/sold"
              className="block border-2 p-4 text-center rounded-lg shadow-lg hover:bg-gray-50"
            >
              View Sales History
            </Link>
            <Link
              to="/dashboard"
              className="block border-2 p-4 text-center rounded-lg shadow-lg hover:bg-gray-50"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/purchases"
              className="block border-2 p-4 text-center rounded-lg shadow-lg hover:bg-gray-50"
            >
              View Purchase History
            </Link>
            <Link
              to="/help"
              className="block border-2 p-4 text-center rounded-lg shadow-lg hover:bg-gray-50"
            >
              Help & Support
            </Link>
          </div>
        </div>
      </div>

      {isEditProfileVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full sm:w-2/4 max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={handleCloseEditProfile}
            >
              <IoIosCloseCircle size={24} />
            </button>
            <h2 className="text-xl font-semibold border-l-4 border-primary-500 pl-4 mb-4">
              Edit Profile
            </h2>
            <EditUser />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
