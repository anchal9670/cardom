import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../components/Mode";
import axios from "axios";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    model: [],
  },
  reducers: {
    model: (state, action) => {
       state.model = action.payload.data;
    },
    updateModel: (state, action) => {
      const updatedModel = action.payload.data;
      const index = state.model.findIndex((b) => b._id === updatedModel._id);
      if (index !== -1) {
        state.model[index] = updatedModel;
      }
    },
    newModel: (state, action) => {
        const data = action.payload.data;
      if (state.model.length > 0) {
        if (data.carBrand !== state.model[0].carBrand) return;
        state.model.push(data);
      } 
    },
    deleteModel: (state, action) => {
      const model = action.payload.data;
      state.model = state.model.filter((m) => m._id !== model._id);
    },
  },
});

export const getModel =
  (brandId, year = "", keyword = "") =>
  async (dispatch) => {
    try {
      let link = `${base_url()}/api/carModel?brand=${brandId}&year=${year}&keyword=${keyword}`;
      const { data } = await axios.get(link);
      dispatch(modelSlice.actions.model(data));
    } catch (err) {
      toast.error(err?.response?.data?.message, { autoClose: 5000 });
      console.log(err);
    }
  };

export const updateModel =
  (modelData, setIsModelEditFrom) => async (dispatch) => {
    console.log(modelData)
    try {
      let link = `${base_url()}/api/carModel/${modelData._id}`;
      const { data } = await axios.put(link, modelData);
      dispatch(modelSlice.actions.updateModel(data));
      toast.success(data.message, { autoClose: 5000 });
      setIsModelEditFrom(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.log(error);
    }
  };

export const deleteModel = (modelData) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/carModel/${modelData._id}`;
    const { data } = await axios.delete(link);
    dispatch(modelSlice.actions.deleteModel(data));
    toast.success(data.message, { autoClose: 5000 });
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.log(error);
  }
};

export const createModel =
  (modelData, setIsModelNewModelOpen) => async (dispatch) => {
    try {
      let link = `${base_url()}/api/carModel`;
      const { data } = await axios.post(link, modelData);
      dispatch(modelSlice.actions.newModel(data));
      console.log(data);
      toast.success(data?.message ?? "Model successfully created.", { autoClose: 5000 });
      setIsModelNewModelOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.error(error);
    }
  };

export default modelSlice.reducer;
