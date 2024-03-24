import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { jwtDecode as jwt } from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/config";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/customer/customer-register`,
        info
      );
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/customer/customer-login`,
        info
      );
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_pass = createAsyncThunk(
  "auth/update_pass",
  async (info, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/customer/password-update`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    const expireTime = new Date(userInfo.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("customerToken");
      return "";
    } else {
      return userInfo;
    }
  } else {
    return "";
  }
};

export const customerAuthReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
    token: localStorage.getItem("customerToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        const userInfo = decodeToken(payload.token);
        state.userInfo = userInfo;
        state.token = payload.token;
      })
      .addCase(customer_login.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        const userInfo = decodeToken(payload.token);
        state.userInfo = userInfo;
        state.token = payload.token;
      })
      .addCase(update_pass.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(update_pass.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear, user_reset } = customerAuthReducer.actions;
export default customerAuthReducer.reducer;
