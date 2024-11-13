import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../components/Mode";
import axios from "axios";

const modelSlice = createSlice({
  name: "variant",
  initialState: {
    variant: [],
  },
  reducers: {
    variant: (state, action) => {
      state.variant = action.payload.data;
    },
    updateVariant: (state, action) => {
      const updatedVariant = action.payload.data;
      const index = state.variant.findIndex(
        (b) => b._id === updatedVariant._id
      );
      if (index !== -1) {
        state.variant[index] = updatedVariant;
      }
    },
    newVariant: (state, action) => {
      const data = action.payload.data;
      if (state.variant.length > 0) {
        if (data.carBrand !== state.variant[0].carBrand) return;
        state.variant.push(data);
      }
    },
    deleteVariant: (state, action) => {
      const variant = action.payload.data;
      state.variant = state.variant.filter((m) => m._id !== variant._id);
    },
  },
});

export const getVariant =
  (brand = "", model = "", fuelType = "", keyword = "", transmission = "") =>
  async (dispatch) => {
    try {
      let link = `${base_url()}/api/carVariant?brand=${brand}&fuelType=${fuelType}&model=${model}&transmission=${transmission}&keyword=${keyword}`;
      const { data } = await axios.get(link);
      dispatch(modelSlice.actions.variant(data));
    } catch (err) {
      toast.error(err?.response?.data?.message, { autoClose: 5000 });
      console.log(err);
    }
  };

export const updateVariant =
  (modelData, setIsVariantEditFrom) => async (dispatch) => {
    try {
      let link = `${base_url()}/api/carVariant/${modelData._id}`;
      const { data } = await axios.put(link, modelData);
      dispatch(modelSlice.actions.updateVariant(data));
      toast.success(data.message, { autoClose: 5000 });
      setIsVariantEditFrom(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.log(error);
    }
  };

export const deleteVariant = (modelData) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/carVariant/${modelData._id}`;
    const { data } = await axios.delete(link);
    dispatch(modelSlice.actions.deleteVariant(data));
    toast.success(data.message, { autoClose: 5000 });
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.log(error);
  }
};

export const createVariant =
  (modelData, setIsVariantNewModelOpen) => async (dispatch) => {
    try {
      let link = `${base_url()}/api/carVariant`;
      const { data } = await axios.post(link, modelData);
      dispatch(modelSlice.actions.newVariant(data));
      toast.success(data?.message ?? "Variant successfully created.", {
        autoClose: 5000,
      });
      setIsVariantNewModelOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.error(error);
    }
  };

export default modelSlice.reducer;
