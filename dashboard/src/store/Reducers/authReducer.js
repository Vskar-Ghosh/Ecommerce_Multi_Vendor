import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode as jwt } from "jwt-decode";

// import api from "../../api/api";
import axios from "axios";
import { base_url } from "../../utils/config";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${base_url}/api/admin-login`, info);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${base_url}/api/seller-login`, info);
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get("/logout");
      localStorage.removeItem("accessToken");
      if (role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/login");
      }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/seller-register`,
        info
      );
      localStorage.setItem("accessToken", data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async (image, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/profile-image-upload`,
        image,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const profile_info_add = createAsyncThunk(
  "auth/profile_info_add",
  async (image, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/profile-info-add`,
        image,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`${base_url}/api/get-user`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_seller_pass = createAsyncThunk(
  "seller/update_seller_pass",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/seller-update-pass`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwt(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_login.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_register.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })
      .addCase(profile_image_upload.pending, (state) => {
        state.loader = true;
      })
      .addCase(profile_image_upload.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(profile_info_add.pending, (state) => {
        state.loader = true;
      })
      .addCase(profile_info_add.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(update_seller_pass.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(update_seller_pass.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      });
  },
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
