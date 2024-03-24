import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import api from "../../api/api";
import axios from "axios";
import { base_url } from "../../utils/config";

export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/admin/orders/?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { parPage, page, searchValue, sellerId },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/seller/orders/${sellerId}?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_order = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/admin/order/${orderId}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_order = createAsyncThunk(
  "order/get_seller_order",
  async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/seller/order/${orderId}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update",
  async (
    { orderId, info },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/admin/order-status/update/${orderId}`,
        info,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_order_status_update = createAsyncThunk(
  "order/seller_order_status_update",
  async (
    { orderId, info },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/seller/order-status/update/${orderId}`,
        info,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(get_admin_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(get_seller_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
