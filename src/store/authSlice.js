import { startLoading, stopLoading } from "./loadingSlice";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../components/Mode";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: {},
    allUsers: [],
    signup: {},
  },
  reducers: {
    signup: (state, action) => {
      state.signup = action.payload.data;
    },
    loginWithFacebook: (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload._id);
    },
    register: (state, action) => {
      const { user, tokenId } = action.payload;

      state.users = user;
      localStorage.setItem("token", JSON.stringify(tokenId));
      localStorage.setItem("user", JSON.stringify(user));

      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      cookies.set("auth-token", tokenId, { path: "/", expires });
    },

    users: (state, action) => {
      state.users = action.payload;
    },
    allUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    deleteUser: (state, action) => {
      const data = action.payload.data;
      state.allUsers = state.allUsers.filter((user) => user._id !== data._id);
    },
    newUser: (state, action) => {
      const data = action.payload.data;
      state.allUsers = [...state.allUsers, data];
    },
    logout: (state) => {
      state.users = {};
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      cookies.remove("auth-token", { path: "/" });
    },
  },
});

export const register = (authData, setIsOtpModal) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/register`;
    const { data } = await axios.post(link, authData);
    dispatch(authSlice.actions.signup(data));
    toast.success(data?.message, { autoClose: 5000 });
    setIsOtpModal(true);
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.log(err);
  }
};

export const verifyMobileOtp = (otpData, closeModal) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/verifyMobileOtp`;
    const { data } = await axios.post(link, otpData);
    dispatch(authSlice.actions.register(data));
    toast.success("Welcome! Your registration was successful!", {
      autoClose: 5000,
    });
    closeModal();
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.log(err);
  }
};

export const resendOtp = (resendData) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/resendOtp`;
    const { data } = await axios.post(link, resendData);
    toast.success(data?.message, { autoClose: 5000 });
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.log(err);
  }
};

export const login = (authData, closeModal) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/login`;
    const { data } = await axios.post(link, authData);
    dispatch(authSlice.actions.register(data));
    toast.success("User login successfully.", { autoClose: 5000 });
    closeModal();
  } catch (err) {
    toast.error(err?.response?.data?.message, { autoClose: 5000 });
    console.log(err);
  }
};

export const loginWithGoogle = (tokenId, closeModal) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/googleLogin`;

    const { data } = await axios.post(link, {
      tokenId: tokenId,
    });
    dispatch(authSlice.actions.register(data));
    toast.success("User register/login successfully.", { autoClose: 5000 });
    closeModal();
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.error("Error fetching data:", error);
  }
};
export const LoginWithFacebook = (token, closeModal) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/facebookLogin?access_token=${token}`;
    const { data } = await axios.post(link);
    dispatch(authSlice.actions.register(data));
    toast.success("User register/login successfully.", { autoClose: 5000 });
    closeModal();
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.error("Error fetching data:", error);
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let link = `${base_url()}/api/auth/profile`;
    const { data } = await axios.get(link, {});
    await dispatch(authSlice.actions.users(data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};

export const getAllUserByAdmin =
  (userType = "") =>
  async (dispatch) => {
    try {
      let link = `${base_url()}/api/account/getAllUser?userType=${userType}`;
      const { data } = await axios.get(link);
      await dispatch(authSlice.actions.allUsers(data));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUserByAdmin = (user) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/account/user/${user._id}`;
    const { data } = await axios.delete(link);
    await dispatch(authSlice.actions.deleteUser(data));
    toast.success(data.message, { autoClose: 5000 });
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.log(error);
  }
};

export const createUserByAdmin =
  (userData, setIsAddNewUserFormOpen) => async (dispatch) => {
    try {
      let link = `${base_url()}/api/account/user/new`;
      const { data } = await axios.post(link, userData);
      await dispatch(authSlice.actions.newUser(data));
      toast.success(data.message, { autoClose: 5000 });
      setIsAddNewUserFormOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.log(error);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    let link = `${base_url()}/api/auth/logout`;
    await axios.post(link);

    dispatch(authSlice.actions.logout());
    toast.success("User logged out successfully.", { autoClose: 5000 });
  } catch (error) {
    toast.error("Error logging out. Please try again.", { autoClose: 5000 });
    console.log(error);
  }
};

export default authSlice.reducer;
