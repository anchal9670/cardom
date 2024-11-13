import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../components/Mode";
import axios from "axios";

const stateSlice = createSlice({
  name: "state",
  initialState: {
    states: [],
    rto: [],
  },
  reducers: {
    state: (state, action) => {
      state.states = action.payload.data;
    },
    rto: (state, action) => {
      state.rto = action.payload.data;
    },
    newRto: (state, action) => {
      if (state.rto.length > 0) {
        const data = action.payload.data;
        if (data.state !== state.rto[0].state) return;
        state.rto.push(data);
      }
    },
    updateRto: (state, action) => {
      const editState = action.payload.data;
      const indexToUpdate = state.rto.findIndex((r) => r._id === editState._id);

      if (indexToUpdate === -1) {
        return state;
      }

      const updatedRtoArray = [
        ...state.rto.slice(0, indexToUpdate),
        { ...state.rto[indexToUpdate], ...editState },
        ...state.rto.slice(indexToUpdate + 1),
      ];

      return { ...state, rto: updatedRtoArray };
    },
    deleteRto: (state, action) => {
      const deleteState = action.payload.data;
      state.rto = state.rto.filter((r) => r._id !== deleteState._id);
    },
  },
});

export const getState =
  (keyword = "") =>
  async (dispatch) => {
    try {
      let link = `${base_url()}/api/carstate?keyword=${keyword}`;
      const { data } = await axios.get(link);
      dispatch(stateSlice.actions.state(data));
    } catch (err) {
      toast.error(err?.response?.data?.message, { autoClose: 5000 });
      console.log(err);
    }
  };

export const createRTO =
  (rtoData, setEditValue, setIsRtoModelOpen) => async (dispatch) => {
    try {
      let link = `${base_url()}/api/RTO`;
      const { data } = await axios.post(link, rtoData);
      dispatch(stateSlice.actions.newRto(data));
      toast.success(data.message, { autoClose: 5000 });
      setEditValue({ state: "", city: "", code: "" });
      setIsRtoModelOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.log(error);
    }
  };

export const updateRTO = (rtoData, setIsRtoModelOpen) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/RTO/${rtoData._id}`;
    const { data } = await axios.put(link, {
      state: rtoData.state,
      code: rtoData.code,
      city: rtoData.city,
    });
    dispatch(stateSlice.actions.updateRto(data));
    toast.success(data.message, { autoClose: 5000 });
    setIsRtoModelOpen(false);
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.log(error);
  }
};

export const deleteRTO = (rtoData) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/RTO/${rtoData._id}`;
    const { data } = await axios.delete(link);
    dispatch(stateSlice.actions.deleteRto(data));
    toast.success(data.message, { autoClose: 5000 });
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.log(error);
  }
};

export const getRtoData =
  (state, keyword = "") =>
  async (dispatch) => {
    try {
      let link = `${base_url()}/api/RTO?state=${state}&keyword=${keyword}`;
      const { data } = await axios.get(link);
      dispatch(stateSlice.actions.rto(data));
      toast.success(data.message, { autoClose: 5000 });
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.log(error);
    }
  };

export default stateSlice.reducer;
