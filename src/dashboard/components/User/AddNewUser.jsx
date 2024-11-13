import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createUserByAdmin } from "../.././../store/authSlice"; // Make sure this action exists

const AddNewUser = ({ isAddNewUserFormOpen, setIsAddNewUserFormOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "User",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(createUserByAdmin(formData, setIsAddNewUserFormOpen));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-6">
        <div className="text-xl font-bold uppercase">Add New User</div>
        <IoIosCloseCircleOutline
          className="text-2xl cursor-pointer"
          onClick={() => setIsAddNewUserFormOpen(!isAddNewUserFormOpen)}
        />
      </div>

      <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Name"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Username"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Email"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Password"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Phone Number"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewUser;
