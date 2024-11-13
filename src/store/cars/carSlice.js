import { startLoading, stopLoading } from "../loadingSlice";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../components/Mode";
import axios from "axios";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    singleCar: {},
    sellerCar: [],
  },
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload.data;
    },
    addCar: (state, action) => {
      state.cars.push(action.payload.data);
    },
    updateCar: (state, action) => {
      const updatedCar = action.payload;
      const index = state.cars.findIndex((car) => car._id === updatedCar._id);
      if (index !== -1) {
        state.cars[index] = updatedCar;
      }
    },
    removeCar: (state, action) => {
      const carId = action.payload;
      state.cars = state.cars.filter((car) => car._id !== carId);
    },
    setSingleCar: (state, action) => {
      state.singleCar = action.payload.data;
      // console.log(action.payload);
    },
    setSellerCar: (state, action) => {
      state.sellerCar = action.payload.data;
    },
  },
});

export const fetchCars = (query) => async (dispatch) => {
  try {
    const link = `${base_url()}/api/cars?${query}`;
    const { data } = await axios.get(link);
    dispatch(carsSlice.actions.setCars(data));
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.error(err);
  }
};

export const createCar =
  (files, carFormData, setCarFormData, initialState, navigate) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const imageKeys = await uploadMultipleImages(files);

      if (imageKeys.length <= 0) {
        return toast.error("Image upload failed.", {
          autoClose: 5000,
        });
      }

      const carData = { ...carFormData, images: imageKeys };

      const link = `${base_url()}/api/cars`;
      const { data } = await axios.post(link, carData);
      dispatch(carsSlice.actions.addCar(data));
      toast.success(data?.message ?? "Car successfully created.", {
        autoClose: 5000,
      });
      setCarFormData(initialState);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }
  };

export const updateCarData = (carData, setIsEditForm) => async (dispatch) => {
  try {
    const link = `${base_url()}/api/carModel/${carData._id}`;
    const { data } = await axios.put(link, carData);
    dispatch(carsSlice.actions.updateCar(data));
    toast.success(data.message, { autoClose: 5000 });
    setIsEditForm(false);
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.error(error);
  }
};

export const deleteCar = (carId) => async (dispatch) => {
  try {
    const link = `${base_url()}/api/carModel/${carId}`;
    const { data } = await axios.delete(link);
    dispatch(carsSlice.actions.removeCar(carId));
    toast.success(data.message, { autoClose: 5000 });
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.error(error);
  }
};

export const fetchSingleCars = (carId) => async (dispatch) => {
  try {
    const link = `${base_url()}/api/cars/${carId}`;
    const { data } = await axios.get(link);
    dispatch(carsSlice.actions.setSingleCar(data));
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.error(err);
  }
};

export const fetchSellerCars = (query) => async (dispatch) => {
  try {
    const link = `${base_url()}/api/cars/seller`;
    const { data } = await axios.get(link);
    dispatch(carsSlice.actions.setSellerCar(data));
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.error(err);
  }
};

const uploadMultipleImages = async (files) => {
  const imageKeys = [];
  for (const file of files) {
    const result = await uploadImage(file[0]);
    if (result.success) {
      imageKeys.push({ key: result.data.key });
    } else {
      console.error("Image upload failed:", result.message);
    }
  }
  return imageKeys;
};

const uploadImage = async (image) => {
  try {
    const link = `${base_url()}/api/storage/getUrl?type=cars`;
    const { data } = await axios.post(link);

    if (data.success) {
      const uploadUrl = data.uploadUrl;
      const config = {
        headers: { "Content-Type": "image/jpeg" },
        withCredentials: false,
      };
      const response = await axios.put(uploadUrl, image, config);

      if (response.status === 200) {
        return { success: true, data };
      } else {
        throw new Error("Failed to upload image");
      }
    } else {
      throw new Error(data.message || "Failed to get upload URL");
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export default carsSlice.reducer;
