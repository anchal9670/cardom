import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../components/Mode";

const initialState = {
  testDrives: [],
};

const testDriveSlice = createSlice({
  name: "testDrive",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.testDrives = action.payload;
    },
    createTestDriveSuccess: (state, action) => {
      state.testDrives.push(action.payload);
    },
    updateTestDriveSuccess: (state, action) => {
      const index = state.testDrives.findIndex(
        (td) => td._id === action.payload._id
      );
      if (index !== -1) {
        state.testDrives[index] = {
          ...state.testDrives[index],
          appointmentDate: action.payload.appointmentDate,
          appointmentTime: action.payload.appointmentTime,
        };
      }
    },
    deleteTestDriveSuccess: (state, action) => {
      state.testDrives = state.testDrives.filter(
        (td) => td._id !== action.payload
      );
    },
  },
});

export const {
  fetchSuccess,
  createTestDriveSuccess,
  updateTestDriveSuccess,
  deleteTestDriveSuccess,
} = testDriveSlice.actions;

export const fetchTestDrives =
  (keyword = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${base_url()}/api/testDrive?keyword=${keyword}`
      );
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        autoClose: 5000,
      });
    }
  };

export const fetchAllTestDrivesByAdmin = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${base_url()}/api/testDrive/admin`);
    dispatch(fetchSuccess(data.data));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message, {
      autoClose: 5000,
    });
  }
};

export const createTestDrive = (testDriveData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${base_url()}/api/testDrive`,
      testDriveData
    );
    dispatch(createTestDriveSuccess(data.data));
    toast.success("Test drive created successfully", { autoClose: 5000 });
  } catch (error) {
    toast.error(error.response?.data?.message || error.message, {
      autoClose: 5000,
    });
  }
};

export const updateTestDrive = (updatedData,closeModel) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${base_url()}/api/testDrive/${updatedData.id}`,
      updatedData
    );
    dispatch(updateTestDriveSuccess(data));
    toast.success("Test drive updated successfully", { autoClose: 5000 });
    closeModel(false)
  } catch (error) {
    toast.error(error.response?.data?.message || error.message, {
      autoClose: 5000,
    });
  }
};

export const deleteTestDrive = (id) => async (dispatch) => {
  try {
    await axios.delete(`${base_url()}/api/testDrive/${id}`);
    dispatch(deleteTestDriveSuccess(id));
    toast.success("Test drive deleted successfully", { autoClose: 5000 });
  } catch (error) {
    toast.error(error.response?.data?.message || error.message, {
      autoClose: 5000,
    });
  }
};

export default testDriveSlice.reducer;
