import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import api from "../../api/api";
import axios from "axios";
import { base_url } from "../../utils/config";

export const add_banner = createAsyncThunk(
  "banner/add_banner",
  async (info, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/banner/add`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_banner = createAsyncThunk(
  "banner/get_banner",
  async (productId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/banner/get/${productId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_banner = createAsyncThunk(
  "banner/update_banner",
  async (
    { bannerId, info },
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/banner/update/${bannerId}`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bannerReducer = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
    banner: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_banner.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(add_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })
      .addCase(get_banner.fulfilled, (state, { payload }) => {
        state.banner = payload.banner;
      })
      .addCase(update_banner.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(update_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      });
  },
});
export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
