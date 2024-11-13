import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../components/Mode";
import axios from "axios";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brand: [],
  },
  reducers: {
    brand: (state, action) => {
      state.brand = action.payload.data;
    },
    updateBrand: (state, action) => {
        const updatedBrand = action.payload.data;
        const index = state.brand.findIndex((b) => b._id === updatedBrand._id);
        if (index !== -1) {
          state.brand[index] = updatedBrand;
        }
    },
    newBrand: (state, action) => {
      state.brand = [...state.brand, action.payload];
    },
    deleteBrand: (state, action) => {
      const brand = action.payload.data;
      state.brand = state.brand.filter((b) => b._id !== brand._id);
    },
  },
});

export const getBrand =
  (keyword = "") =>
  async (dispatch) => {
    try {
      let link = `${base_url()}/api/carbrand?keyword=${keyword}`;
      const { data } = await axios.get(link);
      dispatch(brandSlice.actions.brand(data));
    } catch (err) {
      toast.error(err?.response?.data?.message, { autoClose: 5000 });
      console.log(err);
    }
  };

export const updateBrand =
  (brandData, logo, setIsBrandEditFrom) => async (dispatch) => {
    try {
      let uploadUrlResponse;
      if (logo) {
        uploadUrlResponse = await getUploadUrl();

        if (!uploadUrlResponse.success) {
          toast.error(uploadUrlResponse.message, { autoClose: 5000 });
          return;
        }

        const uploadResult = await uploadLogo(
          uploadUrlResponse.uploadUrl,
          logo
        );

        if (!uploadResult.success) {
          toast.error(uploadResult.message, { autoClose: 5000 });
          return;
        }
      }
      let logoKey;
      if (uploadUrlResponse) {
        logoKey = uploadUrlResponse.key;
      }
      
      let link = `${base_url()}/api/carbrand/${brandData._id}`;
      const { data } = await axios.put(link, { ...brandData, logoKey });
      dispatch(brandSlice.actions.updateBrand(data));
      toast.success(data.message, { autoClose: 5000 });
      setIsBrandEditFrom(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 5000 });
      console.log(error);
    }
  };

export const deleteBrand = (brandData, logo) => async (dispatch) => {
  try {
    let link = `${base_url()}/api/carbrand/${brandData._id}`;
    const { data } = await axios.delete(link);
    dispatch(brandSlice.actions.deleteBrand(data));
    toast.success(data.message, { autoClose: 5000 });
  } catch (error) {
    toast.error(error?.response?.data?.message, { autoClose: 5000 });
    console.log(error);
  }
};

export const createBrand =
  (brandData, logo, setIsBrandNewModelOpen) => async (dispatch) => {
    try {
      const uploadUrlResponse = await getUploadUrl();

      if (!uploadUrlResponse.success) {
        toast.error(uploadUrlResponse.message, { autoClose: 5000 });
        return;
      }

      const uploadResult = await uploadLogo(uploadUrlResponse.uploadUrl, logo);

      if (!uploadResult.success) {
        toast.error(uploadResult.message, { autoClose: 5000 });
        return;
      }

      const logoKey = uploadUrlResponse.key;
      const brandCreationResponse = await createBrandData({
        ...brandData,
        logoKey,
      });
      if (brandCreationResponse.success) {
        dispatch(brandSlice.actions.newBrand(brandCreationResponse.data));
        toast.success(brandCreationResponse.message, { autoClose: 5000 });
        setIsBrandNewModelOpen(false);
      } else {
        toast.error(brandCreationResponse.message, { autoClose: 5000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
      console.error(error);
    }
  };

const getUploadUrl = async () => {
  try {
    const link = `${base_url()}/api/storage/getUrl?type=logo`;
    const response = await axios.post(link);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to get upload URL");
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const uploadLogo = async (uploadUrl, logo) => {
  try {
    const config = {
      headers: {
        "Content-Type": "image/jpeg",
      },
      withCredentials: false,
    };

    const response = await axios.put(uploadUrl, logo, config);

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error("Failed to upload logo");
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const createBrandData = async (brandData) => {
  try {
    const link = `${base_url()}/api/carbrand`;
    const { data } = await axios.post(link, brandData);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to create brand");
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default brandSlice.reducer;
